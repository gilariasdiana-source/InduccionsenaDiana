/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  BookOpen, 
  ShieldCheck, 
  Briefcase, 
  Users, 
  Code, 
  Sparkles, 
  Search, 
  CheckCircle, 
  AlertTriangle, 
  Award, 
  FileText, 
  Download, 
  Copy, 
  Send, 
  UserCheck, 
  GraduationCap,
  ChevronRight,
  Info,
  Check,
  XCircle,
  HelpCircle,
  Flame,
  RotateCcw,
  BookMarked,
  Lightbulb,
  FileCode,
  Layers,
  HeartPulse,
  Laptop,
  Clock,
  IdCard,
  Smile,
  Hammer,
  AlertOctagon,
  Scale,
  Compass,
  Database,
  Printer,
  Edit3
} from 'lucide-react';

import acuerdoData from './data/acuerdo0009_2024.json';
import RegistroAprendiz from './components/RegistroAprendiz';
import RepositorioEvaluaciones from './components/RepositorioEvaluaciones';
import PanelAdministrador from './components/PanelAdministrador';
import CertificadoModal from './components/CertificadoModal';
import { AprendizPerfil, EvaluacionRegistro } from './types/evaluacion';

export default function App() {
  const [activeTab, setActiveTab] = useState<
    'razonamiento' | 'modulo_interactivo' | 'quiz' | 'repositorio' | 'panel_admin' | 'reglamento_json' | 'etapa' | 'caracterizacion' | 'script' | 'asistente'
  >('modulo_interactivo');
  
  // State for Learner Profile & Registration
  const [aprendizPerfil, setAprendizPerfil] = useState<AprendizPerfil | null>(() => {
    const saved = localStorage.getItem('sena_aprendiz_activo');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return null;
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [quizStartTime, setQuizStartTime] = useState<number>(0);
  const [lastSavedEvaluation, setLastSavedEvaluation] = useState<EvaluacionRegistro | null>(null);
  const [isSavingEvaluation, setIsSavingEvaluation] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  
  // Helper to shuffle array (Fisher-Yates)
  const shuffleArray = <T,>(array: T[]): T[] => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // Function to generate a new randomized quiz (shuffles questions & options)
  const generateRandomizedQuiz = (total = 5) => {
    const shuffledBank = shuffleArray(acuerdoData.bancoPreguntasEvaluacion);
    const chosenQuestions = shuffledBank.slice(0, Math.min(total, shuffledBank.length));
    const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

    return chosenQuestions.map((q) => {
      const shuffledOptions = shuffleArray(q.opciones);
      const relabeledOptions = shuffledOptions.map((opt, idx) => ({
        ...opt,
        id: letters[idx] || String(idx + 1)
      }));

      return {
        ...q,
        opciones: relabeledOptions
      };
    });
  };

  // State for Interactive Module (Derechos / Deberes)
  const [interactiveMode, setInteractiveMode] = useState<'derechos' | 'deberes' | 'prohibiciones' | 'debido_proceso'>('derechos');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [activeDetailItem, setActiveDetailItem] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // State for Knowledge Quiz & Pedagogical Reinforcement
  const [activeQuizQuestions, setActiveQuizQuestions] = useState(() => generateRandomizedQuiz(5));
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isCurrentAnswerCorrect, setIsCurrentAnswerCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [answersHistory, setAnswersHistory] = useState<Array<{
    questionId: string;
    selectedId: string;
    isCorrect: boolean;
  }>>([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [visualEffectTrigger, setVisualEffectTrigger] = useState<'none' | 'success' | 'error'>('none');

  // State for JSON Viewer
  const [jsonCopied, setJsonCopied] = useState(false);
  const [jsonViewMode, setJsonViewMode] = useState<'formatted' | 'raw'>('formatted');

  // State for script code view copy
  const [copied, setCopied] = useState(false);

  // State for AI Assistant chat
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'assistant'; text: string }>>([
    { sender: 'assistant', text: '¡Hola, futuro aprendiz o compañero instructor! Soy tu Asistente Experto SENA. Pregúntame sobre el Reglamento del Aprendiz (Acuerdo 0009 de 2024), derechos y deberes, etapa productiva, debido proceso o estrategias de inducción.' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  // State for Characterization & Homologation Simulator
  const [selectedProfile, setSelectedProfile] = useState<'nuevo' | 'titulada_previa' | 'experiencia_laboral'>('titulada_previa');

  // The exact JavaScript script requested by the user
  const senaScriptContent = `// <razonamiento>
/**
 * ANÁLISIS PEDAGÓGICO Y NORMATIVO - INDUCCIÓN A LA FORMACIÓN TITULADA SENA
 * Instructor Experto SENA - Acompañamiento Integral al Aprendiz
 * Normatividad de Referencia: Acuerdo No. 0009 de 2024 (Reglamento del Aprendiz SENA)
 * 
 * 1. Análisis del Reglamento del Aprendiz SENA Vigente:
 *    - Derechos: Formación profesional integral de calidad, uso de ambientes tecnológicos, estímulos e incentivos (monitorías, menciones de honor, semilleros), debido proceso ante cualquier reporte ante el Comité de Evaluación y Seguimiento.
 *    - Deberes: Asistencia puntual, cumplimiento con las evidencias en el LMS (Zajuna/Sofia Plus), uso correcto del carné y Elementos de Protección Personal (EPP), respeto a la comunidad y honestidad académica (cero plagio).
 *    - Faltas: Académicas y disciplinarias clasificadas en Leves, Graves y Gravísimas, que derivan en llamados de atención, planes de mejoramiento, condicionamiento o cancelación de matrícula.
 *    - Estímulos: Monitorías académicas, representación en WorldSkills, proyectos SENNOVA y condecoraciones.
 * 
 * 2. Proceso y Procedimiento de Etapa Productiva:
 *    - Definición: Aplicación práctica de competencias en situaciones reales de trabajo.
 *    - Alternativas formales: Contrato de Aprendizaje, Pasantía, Proyecto Productivo (Fondo Emprender/SENNOVA), Monitoría y Vínculo Laboral.
 *    - Seguimiento: Registro y concertación con bitácoras periódicas evaluadas por el instructor asignado.
 * 
 * 3. Impacto de la Caracterización del Aprendiz:
 *    - Homologación de Competencias: Reconocimiento de Aprendizajes Previos (RAP) y tablas de equivalencia para técnicos que ascienden a tecnólogos.
 *    - Inclusión y Enfoque Diferencial: Atención a necesidades socioemocionales, conectividad y adaptaciones pedagógicas territoriales.
 */
// </razonamiento>

/**
 * @file InduccionFormacionTituladaSENA.js
 * @description Estructura oficial, plan de sesión y base normativa para la Inducción a la Formación Titulada SENA.
 */

const InduccionSENAData = {
  version: "2026.1",
  normaReferencia: "Acuerdo No. 0009 de 2024 SENA",
  institucion: "Servicio Nacional de Aprendizaje - SENA",
  programaInduccion: {
    objetivoGeneral: "Facilitar la integración del nuevo aprendiz a la cultura institucional SENA, fomentando el desarrollo humano integral, el conocimiento del Reglamento y la apropiación de la metodología por proyectos.",
    fases: [
      {
        id: 1,
        nombre: "Bienvenida e Identidad Institucional",
        duracionHoras: 8,
        tematicas: ["Historia y misión del SENA", "Símbolos institucionales", "Himno y escudo", "Estructura organizacional"]
      },
      {
        id: 2,
        nombre: "Formación Profesional Integral y Metodología por Proyectos",
        duracionHoras: 12,
        tematicas: ["Modelo pedagógico institucional", "Evaluación basada en evidencias", "Plataforma LMS / Sofia Plus", "Ambientes de aprendizaje"]
      },
      {
        id: 3,
        nombre: "Reglamento del Aprendiz y Convivencia",
        duracionHoras: 10,
        tematicas: ["Derechos y deberes", "Faltas académicas y disciplinarias", "Debido proceso y comités", "Estímulos e incentivos"]
      },
      {
        id: 4,
        nombre: "Etapa Productiva y Empleabilidad",
        duracionHoras: 10,
        tematicas: ["Alternativas de etapa productiva", "Contrato de aprendizaje", "Agencia Pública de Empleo", "Emprendimiento Fondo Emprender"]
      }
    ]
  },
  derechosPrincipales: [
    "Recibir formación profesional integral de calidad según el diseño curricular.",
    "Hacer uso adecuado de los ambientes, laboratorios, biblioteca y tecnologías institucionales.",
    "Garantía estricta de Debido Proceso y derecho a la defensa en Comités de Evaluación.",
    "Acceder a programas de Bienestar al Aprendiz, salud, deporte, cultura y apoyos socioeconómicos.",
    "Elegir y ser elegido vocero de ficha o representante de aprendices de centro."
  ],
  deberesPrincipales: [
    "Asistir puntualmente a las sesiones y entregar oportunamente las evidencias formativas.",
    "Mantener un trato respetuoso, pacífico e incluyente con toda la comunidad educativa.",
    "Portar en lugar visible el carné institucional y los EPP obligatorios en ambientes de taller.",
    "Cuidar las instalaciones, maquinaria y recursos físicos y ambientales del centro.",
    "Preservar la honestidad académica y evitar cualquier conducta de plagio o fraude."
  ],
  etapaProductivaAlternativas: [
    { modalidad: "Contrato de Aprendizaje", descripcion: "Patrocinio empresarial formal conforme a Ley 789 de 2002 con afiliación a EPS y ARL." },
    { modalidad: "Pasantía", descripcion: "Práctica institucional o de apoyo comunitario en empresas y organizaciones afines." },
    { modalidad: "Proyecto Productivo", descripcion: "Desarrollo de proyecto de innovación, SENNOVA o creación de empresa en Fondo Emprender." },
    { modalidad: "Monitoría", descripcion: "Apoyo técnico y pedagógico en laboratorios del Centro de Formación." },
    { modalidad: "Vínculo Laboral", descripcion: "Validación de funciones en contrato laboral vigente acordes al perfil de egreso." }
  ]
};

console.log("Estructura de Inducción SENA cargada con éxito:", InduccionSENAData.version);
module.exports = InduccionSENAData;
`;

  // JSON String representation for preview and download
  const jsonStringData = JSON.stringify(acuerdoData, null, 2);

  const handleCopyJson = () => {
    navigator.clipboard.writeText(jsonStringData);
    setJsonCopied(true);
    setTimeout(() => setJsonCopied(false), 2500);
  };

  const handleDownloadJson = () => {
    const element = document.createElement('a');
    const file = new Blob([jsonStringData], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = 'acuerdo_0009_2024_sena.json';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleCopyScript = () => {
    navigator.clipboard.writeText(senaScriptContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadScript = () => {
    const element = document.createElement('a');
    const file = new Blob([senaScriptContent], { type: 'text/javascript' });
    element.href = URL.createObjectURL(file);
    element.download = 'InduccionFormacionTituladaSENA.js';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const userText = (textToSend || inputMessage).trim();
    if (!userText || isChatLoading) return;

    setInputMessage('');
    setChatMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setIsChatLoading(true);

    try {
      const res = await fetch('/api/ask-instructor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userText, context: 'Acuerdo 0009 de 2024 - Reglamento del Aprendiz SENA' })
      });
      const data = await res.json();
      if (data.error) {
        setChatMessages(prev => [...prev, { sender: 'assistant', text: `Error: ${data.error}` }]);
      } else {
        setChatMessages(prev => [...prev, { sender: 'assistant', text: data.reply }]);
      }
    } catch (err: any) {
      setChatMessages(prev => [...prev, { sender: 'assistant', text: 'Lo siento, no pude conectar con el servidor de IA en este momento. Por favor verifica tu conexión o intenta nuevamente.' }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  const handleClearChat = () => {
    setChatMessages([
      { sender: 'assistant', text: '¡Hola! Soy tu Asistente Experto e Instructor Virtual SENA. ¿En qué temática del Acuerdo No. 0009 de 2024, derechos, deberes o etapa productiva puedo orientarte hoy?' }
    ]);
  };

  // Trigger celebration visual effects
  const firePositiveEffects = () => {
    setVisualEffectTrigger('success');
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#39a900', '#10b981', '#fbbf24', '#3b82f6']
    });
    setTimeout(() => setVisualEffectTrigger('none'), 1800);
  };

  // Trigger negative visual effects
  const fireNegativeEffects = () => {
    setVisualEffectTrigger('error');
    setTimeout(() => setVisualEffectTrigger('none'), 1800);
  };

  // Quiz Handling (Randomized)
  const currentQuestion = activeQuizQuestions[currentQuestionIndex] || activeQuizQuestions[0];

  const handleSelectOption = (optionId: string) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswerId(optionId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswerId || isAnswerSubmitted || !currentQuestion) return;

    const selectedOption = currentQuestion.opciones.find(opt => opt.id === selectedAnswerId);
    const isCorrect = selectedOption?.esCorrecta ?? false;

    setIsAnswerSubmitted(true);
    setIsCurrentAnswerCorrect(isCorrect);

    const pointsPerQuestion = Math.round(100 / activeQuizQuestions.length);

    if (isCorrect) {
      setScore(prev => prev + pointsPerQuestion);
      setStreak(prev => prev + 1);
      firePositiveEffects();
    } else {
      setStreak(0);
      fireNegativeEffects();
    }

    const updatedHistory = [
      ...answersHistory,
      {
        questionId: currentQuestion.id,
        selectedId: selectedAnswerId,
        isCorrect
      }
    ];
    setAnswersHistory(updatedHistory);
  };

  const saveEvaluationRecord = async (finalScore: number, history: typeof answersHistory) => {
    if (!aprendizPerfil) return;
    setIsSavingEvaluation(true);
    const durationSeconds = Math.max(10, Math.round((Date.now() - (quizStartTime || Date.now())) / 1000));
    const aciertosCount = history.filter(h => h.isCorrect).length;
    const totalCount = activeQuizQuestions.length;

    const detailedResponses = history.map((h) => {
      const q = activeQuizQuestions.find(item => item.id === h.questionId) || 
                acuerdoData.bancoPreguntasEvaluacion.find(item => item.id === h.questionId);
      const chosenOpt = q?.opciones.find(o => o.id === h.selectedId);
      return {
        preguntaId: h.questionId,
        categoria: q?.categoria || 'Normativa',
        competencia: q?.competencia || 'Reglamento',
        preguntaTexto: q?.caso || '',
        opcionSeleccionada: h.selectedId,
        esCorrecta: h.isCorrect,
        retroalimentacion: h.isCorrect 
          ? (chosenOpt?.explicacionExito || 'Respuesta correcta.') 
          : `${chosenOpt?.explicacionError || 'Opción incorrecta.'} Refuerzo: ${q?.refuerzoNormativo?.articulo || ''}`
      };
    });

    const payload = {
      aprendiz: aprendizPerfil,
      respuestas: detailedResponses,
      tiempoSegundos: durationSeconds,
      puntaje: finalScore,
      aciertos: aciertosCount,
      errores: totalCount - aciertosCount,
      totalPreguntas: totalCount
    };

    try {
      const res = await fetch('/api/evaluaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const data = await res.json();
        setLastSavedEvaluation(data.record);
      }
    } catch (e) {
      console.error('Error auto-saving evaluation:', e);
    } finally {
      setIsSavingEvaluation(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < activeQuizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswerId(null);
      setIsAnswerSubmitted(false);
      setIsCurrentAnswerCorrect(null);
    } else {
      setQuizFinished(true);
      saveEvaluationRecord(score, answersHistory);
      if (score >= 60) {
        confetti({
          particleCount: 150,
          spread: 90,
          origin: { y: 0.5 },
          colors: ['#39a900', '#059669', '#f59e0b']
        });
      }
    }
  };

  const handleRestartQuiz = () => {
    const freshRandomized = generateRandomizedQuiz(5);
    setActiveQuizQuestions(freshRandomized);
    setCurrentQuestionIndex(0);
    setSelectedAnswerId(null);
    setIsAnswerSubmitted(false);
    setIsCurrentAnswerCorrect(null);
    setScore(0);
    setStreak(0);
    setAnswersHistory([]);
    setQuizFinished(false);
    setQuizStarted(true);
    setQuizStartTime(Date.now());
  };

  // Filter interactive items
  const filteredDerechos = acuerdoData.derechos.filter(d => 
    (selectedCategory === 'todos' || d.categoria.toLowerCase().includes(selectedCategory.toLowerCase())) &&
    (d.titulo.toLowerCase().includes(searchTerm.toLowerCase()) || d.descripcion.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredDeberes = acuerdoData.deberes.filter(d => 
    (selectedCategory === 'todos' || d.categoria.toLowerCase().includes(selectedCategory.toLowerCase())) &&
    (d.titulo.toLowerCase().includes(searchTerm.toLowerCase()) || d.descripcion.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Top Bar Navigation */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200 sticky top-0 z-50 shadow-xs">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <img 
            src="data:image/svg+xml,%3c?xml%20version=%271.0%27%20encoding=%27utf-8%27?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2026.0.1,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3csvg%20version=%271.1%27%20id=%27Capa_1%27%20xmlns=%27http://www.w3.org/2000/svg%27%20xmlns:xlink=%27http://www.w3.org/1999/xlink%27%20x=%270px%27%20y=%270px%27%20viewBox=%270%200%201000%201000%27%20style=%27enable-background:new%200%200%201000%201000;%27%20xml:space=%27preserve%27%3e%3cstyle%20type=%27text/css%27%3e%20.st0{fill:%2339a900;}%20%3c/style%3e%3cpath%20id=%27path47-5%27%20class=%27st0%27%20d=%27M504.2,20.5c-58.3,0.1-105.6,47.4-105.5,105.8c0.1,58.3,47.4,105.6,105.7,105.6%20c58.3,0,105.6-47.3,105.6-105.7V126C609.9,67.6,562.6,20.4,504.2,20.5z%20M155.6,264.6c-18.6,0.1-37.5,1.1-55.2,5.6%20c-11.7,3-23,7.8-30.3,15.4c-9.2,9.5-10.4,22.3-5.9,33.3c4,9.7,14.8,16.9,26.8,21.1c25.9,8.9,54.6,10.7,81.8,16.3%20c5,1.2,10.6,2.6,13.7,6c3.2,4.1,1.3,9.7-4,12.2c-8.8,4.5-20.1,4.5-30.4,4.4c-9.4-0.4-19.7-1.2-27.2-5.9c-5.5-3.4-6.5-9.1-5.2-14.1%20l-60.6,0c-0.2,9.2,1.6,18.9,8.4,26.8c5.6,6.8,14.8,11.5,24.6,14.4c15.7,4.6,32.7,6,49.4,6.4c22.7,0.4,45.8-0.3,67.6-5.4%20c13-3.2,25.8-8.3,34.1-16.6c14.8-14.8,11.3-38.3-8.3-49.8c-9.8-5.7-21.5-9.2-33.4-11.5c-17.5-3.6-35.3-6.3-52.9-9.2%20c-6.2-1.2-12.8-2.3-18-5.2c-5.5-2.9-5.9-9.8-0.3-12.9c7.2-4.1,16.8-4,25.4-4c9.1,0.2,19,0.7,26.5,5c4.2,2.3,5.9,6.3,5.9,10.1%20l57.6-0.1c-0.2-7.3-1.6-14.9-6.9-21.2c-6.2-7.8-17.1-12.7-28.3-15.5C192.8,265.6,174.1,264.7,155.6,264.6L155.6,264.6z%20M280.6,268.9%20l0,137.7l168.1,0l0-30H342.3v-26.7h94.9v-29.3h-94.9l0-21.9l102.6,0l-0.1-29.7L280.6,268.9z%20M557.5,269c0,0-51.9,0-77.9,0l0,137.7%20l59,0l0-92.7l80.8,92.6l81,0.1l0-137.7l-59.1,0l0.1,92L557.5,269z%20M805.6,269.2c0,0-63.6,91.9-95.6,137.7l61.9,0l14.9-24.8h95.7%20l13.9,24.9l68.8,0L874,269.2L805.6,269.2z%20M836.6,302.1l29.4,49.9l-60.7,0.1L836.6,302.1z%20M10.6,445.6l0.5,75l280.1-1%20c14.3,3.1,22.6,12.4,19.7,33.5L138.6,854.7l56.1,52.5l266.9-461.6L10.6,445.6z%20M545.2,446.2l262.4,459.6l58-52.1L691.3,552.9%20c-2.9-21.2,5.4-30.6,19.7-33.7l280.2,1l-0.1-73.7L545.2,446.2z%20M500.9,522.3L254.8,944.7l65.4,31.9L484.4,699%20c5.7-4.6,11.4-7.1,17.1-7.3c6-0.2,12.2,2,18.3,6.8l163.8,278.4l67.4-35.2L500.9,522.3z%27/%3e%3cg%20id=%27_x23_000000ff-2%27%20transform=%27matrix(0.31570611,0,0,0.23560774,-391.49698,-10.601126)%27%3e%3c/g%3e%3c/svg%3e" 
            alt="Logo SENA" 
            className="w-9 h-9 object-contain"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-bold tracking-tight text-slate-900 font-display">
                Portal SENA
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                Acuerdo 0009
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">Inducción a la Formación Titulada</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden xl:flex items-center gap-4 text-xs font-semibold text-slate-600">
          <button 
            onClick={() => setActiveTab('modulo_interactivo')}
            className={`transition-colors hover:text-emerald-700 py-1 ${activeTab === 'modulo_interactivo' ? 'text-emerald-700 border-b-2 border-emerald-600 font-bold' : ''}`}
          >
            Módulo Derechos & Deberes
          </button>
          <button 
            onClick={() => setActiveTab('quiz')}
            className={`transition-colors hover:text-emerald-700 py-1 flex items-center gap-1 ${activeTab === 'quiz' ? 'text-emerald-700 border-b-2 border-emerald-600 font-bold' : ''}`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Evaluación del Aprendiz
          </button>
          <button 
            onClick={() => setActiveTab('panel_admin')}
            className={`transition-colors hover:text-emerald-700 py-1 flex items-center gap-1.5 ${activeTab === 'panel_admin' || activeTab === 'repositorio' ? 'text-emerald-700 border-b-2 border-emerald-600 font-bold' : ''}`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Panel Administrador & Analítica
          </button>
          <button 
            onClick={() => setActiveTab('reglamento_json')}
            className={`transition-colors hover:text-emerald-700 py-1 flex items-center gap-1 ${activeTab === 'reglamento_json' ? 'text-emerald-700 border-b-2 border-emerald-600 font-bold' : ''}`}
          >
            <FileCode className="w-3.5 h-3.5 text-emerald-600" />
            Archivo JSON
          </button>
          <button 
            onClick={() => setActiveTab('etapa')}
            className={`transition-colors hover:text-emerald-700 py-1 ${activeTab === 'etapa' ? 'text-emerald-700 border-b-2 border-emerald-600 font-bold' : ''}`}
          >
            Etapa Productiva
          </button>
          <button 
            onClick={() => setActiveTab('caracterizacion')}
            className={`transition-colors hover:text-emerald-700 py-1 ${activeTab === 'caracterizacion' ? 'text-emerald-700 border-b-2 border-emerald-600 font-bold' : ''}`}
          >
            Homologación
          </button>
          <button 
            onClick={() => setActiveTab('razonamiento')}
            className={`transition-colors hover:text-emerald-700 py-1 ${activeTab === 'razonamiento' ? 'text-emerald-700 border-b-2 border-emerald-600 font-bold' : ''}`}
          >
            Razonamiento CoT
          </button>
        </nav>

        {/* Primary Action Button */}
        <div className="flex items-center gap-2.5">
          {/* Top Button to Access Admin Panel & Analytics */}
          <button 
            onClick={() => setActiveTab('panel_admin')}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer ${
              activeTab === 'panel_admin' || activeTab === 'repositorio'
                ? 'bg-slate-950 text-emerald-400 ring-2 ring-emerald-500 shadow-md'
                : 'bg-slate-900 hover:bg-slate-800 text-white'
            }`}
            title="Acceder al Panel de Administrador y Analítica de Respuestas"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Panel Administrador</span>
            <span className="hidden sm:inline-block px-1.5 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] rounded font-semibold border border-emerald-500/30">
              Analítica
            </span>
          </button>

          <button 
            onClick={() => setActiveTab('asistente')}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl transition-all shadow-sm cursor-pointer ${
              activeTab === 'asistente'
                ? 'bg-emerald-700 text-white ring-2 ring-emerald-400 shadow-md font-bold'
                : 'text-white bg-emerald-600 hover:bg-emerald-700'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Asistente IA</span>
          </button>
        </div>
      </header>

      {/* Mobile Sub-Navigation */}
      <div className="flex xl:hidden overflow-x-auto bg-white border-b border-slate-200 px-4 py-2 gap-1 text-xs font-medium shrink-0">
        <button onClick={() => setActiveTab('asistente')} className={`px-2.5 py-1.5 rounded-md whitespace-nowrap flex items-center gap-1 font-bold ${activeTab === 'asistente' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-800'}`}>
          <Sparkles className="w-3.5 h-3.5" />
          Asistente IA
        </button>
        <button onClick={() => setActiveTab('panel_admin')} className={`px-2.5 py-1.5 rounded-md whitespace-nowrap flex items-center gap-1 font-bold ${activeTab === 'panel_admin' || activeTab === 'repositorio' ? 'bg-slate-900 text-emerald-400' : 'bg-slate-100 text-slate-800'}`}>
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          Panel Admin
        </button>
        <button onClick={() => setActiveTab('modulo_interactivo')} className={`px-2.5 py-1.5 rounded-md whitespace-nowrap ${activeTab === 'modulo_interactivo' ? 'bg-emerald-50 text-emerald-700 font-bold' : 'text-slate-600'}`}>Derechos & Deberes</button>
        <button onClick={() => setActiveTab('quiz')} className={`px-2.5 py-1.5 rounded-md whitespace-nowrap ${activeTab === 'quiz' ? 'bg-emerald-50 text-emerald-700 font-bold' : 'text-slate-600'}`}>Evaluación</button>
        <button onClick={() => setActiveTab('reglamento_json')} className={`px-2.5 py-1.5 rounded-md whitespace-nowrap ${activeTab === 'reglamento_json' ? 'bg-emerald-50 text-emerald-700 font-bold' : 'text-slate-600'}`}>Formato JSON</button>
        <button onClick={() => setActiveTab('etapa')} className={`px-2.5 py-1.5 rounded-md whitespace-nowrap ${activeTab === 'etapa' ? 'bg-emerald-50 text-emerald-700 font-bold' : 'text-slate-600'}`}>Etapa Productiva</button>
        <button onClick={() => setActiveTab('caracterizacion')} className={`px-2.5 py-1.5 rounded-md whitespace-nowrap ${activeTab === 'caracterizacion' ? 'bg-emerald-50 text-emerald-700 font-bold' : 'text-slate-600'}`}>Homologación</button>
        <button onClick={() => setActiveTab('script')} className={`px-2.5 py-1.5 rounded-md whitespace-nowrap ${activeTab === 'script' ? 'bg-emerald-50 text-emerald-700 font-bold' : 'text-slate-600'}`}>Script JS</button>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 lg:p-10">
        
        {/* ========================================================================= */}
        {/* TAB: MÓDULO INTERACTIVO DE DERECHOS Y DEBERES                             */}
        {/* ========================================================================= */}
        {activeTab === 'modulo_interactivo' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 rounded-3xl p-6 md:p-8 text-white shadow-md relative overflow-hidden">
              <div className="relative z-10 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-400/30 text-emerald-200 text-xs font-semibold uppercase tracking-wider mb-3">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                  Acuerdo No. 0009 de 2024 · SENA
                </div>
                <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight font-display text-white">
                  Módulo Interactivo de Derechos y Deberes
                </h1>
                <p className="mt-3 text-emerald-100 text-sm md:text-base leading-relaxed">
                  Explora las garantías formativas, compromisos éticos y directrices de convivencia del aprendiz SENA. Cada derecho conlleva una responsabilidad mutua para la excelencia formativa.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button 
                    onClick={() => setActiveTab('quiz')}
                    className="px-4 py-2.5 bg-white text-emerald-900 font-bold text-xs rounded-xl shadow-md hover:bg-emerald-50 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    Poner a prueba mis conocimientos
                  </button>
                  <button 
                    onClick={() => setActiveTab('reglamento_json')}
                    className="px-4 py-2.5 bg-emerald-900/50 hover:bg-emerald-900/80 text-white font-semibold text-xs rounded-xl border border-emerald-400/30 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <FileCode className="w-4 h-4 text-emerald-300" />
                    Ver estructura en JSON
                  </button>
                </div>
              </div>
            </div>

            {/* Mode Selector Tabs */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl w-full md:w-auto overflow-x-auto">
                <button
                  onClick={() => { setInteractiveMode('derechos'); setActiveDetailItem(null); }}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${interactiveMode === 'derechos' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  <Award className="w-3.5 h-3.5 text-emerald-600" />
                  Derechos ({acuerdoData.derechos.length})
                </button>
                <button
                  onClick={() => { setInteractiveMode('deberes'); setActiveDetailItem(null); }}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${interactiveMode === 'deberes' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  Deberes ({acuerdoData.deberes.length})
                </button>
                <button
                  onClick={() => { setInteractiveMode('prohibiciones'); setActiveDetailItem(null); }}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${interactiveMode === 'prohibiciones' ? 'bg-white text-rose-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />
                  Prohibiciones & Faltas
                </button>
                <button
                  onClick={() => { setInteractiveMode('debido_proceso'); setActiveDetailItem(null); }}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${interactiveMode === 'debido_proceso' ? 'bg-white text-blue-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  <Scale className="w-3.5 h-3.5 text-blue-600" />
                  Debido Proceso (Comités)
                </button>
              </div>

              {/* Search Bar */}
              {(interactiveMode === 'derechos' || interactiveMode === 'deberes') && (
                <div className="relative w-full md:w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Buscar por palabra clave..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                  />
                </div>
              )}
            </div>

            {/* DERECHOS VIEW */}
            {interactiveMode === 'derechos' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDerechos.map((derecho) => (
                  <div 
                    key={derecho.id} 
                    className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                          {derecho.categoria}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {derecho.id}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mb-2">
                        {derecho.titulo}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed mb-4">
                        {derecho.descripcion}
                      </p>

                      <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-3 text-xs text-emerald-900 mb-4">
                        <div className="flex items-center gap-1.5 font-bold text-[11px] text-emerald-800 mb-1">
                          <Lightbulb className="w-3.5 h-3.5 text-emerald-600" />
                          Ejemplo en el ambiente:
                        </div>
                        <p className="text-[11px] text-emerald-950/80 leading-normal">
                          {derecho.ejemploPractico}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span className="font-medium text-slate-400">{derecho.articulo}</span>
                      <span className="flex items-center gap-1 text-emerald-700 font-semibold text-[11px]">
                        <ShieldCheck className="w-3.5 h-3.5" /> Garantía Oficial
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* DEBERES VIEW */}
            {interactiveMode === 'deberes' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDeberes.map((deber) => (
                  <div 
                    key={deber.id} 
                    className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-100">
                          {deber.categoria}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {deber.id}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors mb-2">
                        {deber.titulo}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed mb-4">
                        {deber.descripcion}
                      </p>

                      <div className="bg-teal-50/70 border border-teal-100 rounded-xl p-3 text-xs text-teal-900 mb-4">
                        <div className="flex items-center gap-1.5 font-bold text-[11px] text-teal-800 mb-1">
                          <CheckCircle className="w-3.5 h-3.5 text-teal-600" />
                          Cómo cumplirlo día a día:
                        </div>
                        <p className="text-[11px] text-teal-950/80 leading-normal">
                          {deber.ejemploPractico}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span className="font-medium text-slate-400">{deber.articulo}</span>
                      <span className="flex items-center gap-1 text-teal-700 font-semibold text-[11px]">
                        <Check className="w-3.5 h-3.5" /> Deber Aprendiz
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* PROHIBICIONES & FALTAS VIEW */}
            {interactiveMode === 'prohibiciones' && (
              <div className="space-y-6">
                <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 text-rose-950">
                  <div className="flex items-center gap-2 mb-2 font-bold text-base text-rose-900">
                    <AlertOctagon className="w-5 h-5 text-rose-600" />
                    Prohibiciones Expresas del Aprendiz SENA
                  </div>
                  <p className="text-xs text-rose-800 leading-relaxed">
                    Las conductas descritas a continuación constituyen infracciones directas al Reglamento del Aprendiz y dan origen a investigaciones ante el Comité de Evaluación y Seguimiento.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {acuerdoData.prohibiciones.map((prohibicion) => (
                    <div key={prohibicion.id} className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        <XCircle className="w-4 h-4" />
                      </div>
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold text-slate-400">{prohibicion.id}</span>
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-rose-100 text-rose-800 rounded-full">
                            {prohibicion.gravedad}
                          </span>
                        </div>
                        <p className="text-xs text-slate-700 font-medium leading-relaxed">
                          {prohibicion.descripcion}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Clasificación de Faltas */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs mt-6">
                  <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-emerald-600" />
                    Gradación de Faltas y Medidas Formativas
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {acuerdoData.clasificacionFaltas.criteriosCalificacion.map((criterio, idx) => (
                      <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
                        <div>
                          <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md inline-block mb-2 ${
                            criterio.grado === 'Leve' ? 'bg-amber-100 text-amber-900' :
                            criterio.grado === 'Grave' ? 'bg-orange-100 text-orange-900' :
                            'bg-red-100 text-red-900'
                          }`}>
                            Falta {criterio.grado}
                          </span>
                          <p className="text-xs text-slate-600 mb-3">{criterio.criterio}</p>
                        </div>
                        <div className="pt-2 border-t border-slate-200 text-[11px] font-semibold text-slate-800">
                          📌 Medida: {criterio.medida}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* DEBIDO PROCESO VIEW */}
            {interactiveMode === 'debido_proceso' && (
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-blue-950">
                  <div className="flex items-center gap-2 mb-2 font-bold text-base text-blue-900">
                    <Scale className="w-5 h-5 text-blue-600" />
                    Ruta del Debido Proceso y Comités de Evaluación
                  </div>
                  <p className="text-xs text-blue-800 leading-relaxed">
                    El SENA garantiza el respeto estricto al Debido Proceso consagrado en el Artículo 29 de la Constitución Política y el Capítulo VI del Acuerdo 0009 de 2024. Ningún aprendiz puede ser sancionado sin haber sido escuchado ni sin el cumplimiento de las siguientes etapas formales:
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {acuerdoData.debidoProceso.fases.map((fase) => (
                    <div key={fase.paso} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between relative group hover:border-blue-400 transition-all">
                      <div>
                        <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs mb-3 shadow-xs">
                          {fase.paso}
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 mb-2">
                          {fase.nombre}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {fase.detalle}
                        </p>
                      </div>
                      <div className="mt-4 pt-2 border-t border-slate-100 text-[10px] text-blue-600 font-bold uppercase tracking-wider">
                        Paso {fase.paso} de 5
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB: PRUEBA DE CONOCIMIENTOS CON REFUERZO PEDAGÓGICO                      */}
        {/* ========================================================================= */}
        {activeTab === 'quiz' && (
          <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
            {/* Header */}
            <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">
                  <span>Evaluación Interactiva</span>
                  <span>·</span>
                  <span>Simulador de Casos Reales SENA</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 font-display">
                  Evaluación y Refuerzo Pedagógico del Aprendiz
                </h1>
                <p className="mt-1 text-xs md:text-sm text-slate-600">
                  Apropiación de derechos, deberes, debido proceso y etapa productiva conforme al Acuerdo No. 0009 de 2024.
                </p>
              </div>

              {quizStarted && !quizFinished && (
                <div className="flex items-center gap-3 bg-white p-2.5 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-800 rounded-xl border border-amber-200 text-xs font-bold">
                    <Flame className="w-4 h-4 text-amber-500" />
                    <span>Racha: {streak}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 text-xs font-bold">
                    <Award className="w-4 h-4 text-emerald-600" />
                    <span>Puntaje: {score} pts</span>
                  </div>
                </div>
              )}
            </div>

            {/* SCREEN 1: Pre-Registration / Learner Characterization Form */}
            {(!aprendizPerfil || isEditingProfile) && !quizStarted && (
              <RegistroAprendiz
                initialData={aprendizPerfil || undefined}
                onStartEvaluation={(perfil) => {
                  setAprendizPerfil(perfil);
                  setIsEditingProfile(false);
                  const freshQuestions = generateRandomizedQuiz(5);
                  setActiveQuizQuestions(freshQuestions);
                  setCurrentQuestionIndex(0);
                  setSelectedAnswerId(null);
                  setIsAnswerSubmitted(false);
                  setIsCurrentAnswerCorrect(null);
                  setScore(0);
                  setStreak(0);
                  setAnswersHistory([]);
                  setQuizFinished(false);
                  setQuizStarted(true);
                  setQuizStartTime(Date.now());
                }}
              />
            )}

            {/* SCREEN 2: Ready to Start (when profile exists) */}
            {aprendizPerfil && !isEditingProfile && !quizStarted && !quizFinished && (
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
                <div className="p-5 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                      <UserCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-emerald-200 text-emerald-900 rounded-full">
                        Aprendiz Caracterizado
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 font-display mt-0.5">
                        {aprendizPerfil.nombres} {aprendizPerfil.apellidos}
                      </h3>
                      <p className="text-xs text-slate-600">
                        {aprendizPerfil.tipoDocumento} {aprendizPerfil.numeroDocumento} · Ficha <span className="font-bold text-emerald-800">{aprendizPerfil.numeroFicha}</span> ({aprendizPerfil.programa})
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="shrink-0 px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Modificar Datos</span>
                  </button>
                </div>

                <div className="text-center max-w-xl mx-auto space-y-2 pt-2">
                  <h2 className="text-2xl font-bold text-slate-900">
                    ¿Listo para presentar tu evaluación de inducción?
                  </h2>
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                    Esta prueba selecciona <strong>5 casos prácticos situacionales en orden aleatorio</strong> del banco oficial. Cada acierto suma 20 puntos y las respuestas erróneas contarán con un <strong>refuerzo pedagógico</strong> inmediato del instructor.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto text-left">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
                    <span className="font-bold text-slate-900 block mb-1">🎲 Preguntas Aleatorias</span>
                    Casos y opciones barajadas dinámicamente en cada intento.
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
                    <span className="font-bold text-slate-900 block mb-1">💡 Refuerzo Pedagógico</span>
                    Explicación de errores con cita del Acuerdo 0009 de 2024.
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
                    <span className="font-bold text-slate-900 block mb-1">📁 Repositorio & Acta</span>
                    Generación de constancia oficial de inducción en PDF.
                  </div>
                </div>

                <div className="text-center pt-2">
                  <button
                    onClick={() => {
                      const freshQuestions = generateRandomizedQuiz(5);
                      setActiveQuizQuestions(freshQuestions);
                      setCurrentQuestionIndex(0);
                      setSelectedAnswerId(null);
                      setIsAnswerSubmitted(false);
                      setIsCurrentAnswerCorrect(null);
                      setScore(0);
                      setStreak(0);
                      setAnswersHistory([]);
                      setQuizFinished(false);
                      setQuizStarted(true);
                      setQuizStartTime(Date.now());
                    }}
                    className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer inline-flex items-center gap-2 hover:shadow-lg"
                  >
                    <Sparkles className="w-4 h-4" />
                    Iniciar Prueba de Conocimientos
                  </button>
                </div>
              </div>
            )}

            {/* State: In Progress */}
            {quizStarted && !quizFinished && (
              <div className={`space-y-6 transition-all duration-300 ${
                visualEffectTrigger === 'error' ? 'animate-shake animate-glow-red' : ''
              } ${visualEffectTrigger === 'success' ? 'animate-glow-green' : ''}`}>
                
                {/* Active Learner Top Info */}
                {aprendizPerfil && (
                  <div className="flex items-center justify-between text-xs px-4 py-2 bg-slate-100 rounded-xl text-slate-600">
                    <div className="flex items-center gap-2 truncate">
                      <span className="font-bold text-slate-800">{aprendizPerfil.nombres} {aprendizPerfil.apellidos}</span>
                      <span>·</span>
                      <span>Ficha {aprendizPerfil.numeroFicha}</span>
                      <span className="hidden sm:inline">({aprendizPerfil.regional})</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-amber-100 text-amber-800 rounded-md">
                        🎲 Aleatorio
                      </span>
                      <span className="text-[11px] font-mono text-emerald-800 font-bold">Acuerdo 0009</span>
                    </div>
                  </div>
                )}

                {/* Progress bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-slate-600">
                    <span>Pregunta {currentQuestionIndex + 1} de {activeQuizQuestions.length}</span>
                    <span className="text-emerald-700">{currentQuestion.categoria} · {currentQuestion.competencia}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-600 transition-all duration-500 rounded-full"
                      style={{ width: `${((currentQuestionIndex + 1) / activeQuizQuestions.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Question Card */}
                <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
                  {/* Case Description */}
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-bold">
                      <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
                      Caso Situacional:
                    </div>
                    <p className="text-base md:text-lg font-medium text-slate-900 leading-relaxed">
                      {currentQuestion.caso}
                    </p>
                  </div>

                  {/* Options List */}
                  <div className="space-y-3">
                    {currentQuestion.opciones.map((option) => {
                      const isSelected = selectedAnswerId === option.id;
                      let optionClasses = "p-4 rounded-2xl border text-xs md:text-sm font-medium transition-all flex items-start gap-3 text-left cursor-pointer ";
                      
                      if (!isAnswerSubmitted) {
                        optionClasses += isSelected 
                          ? "bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500/20 shadow-xs" 
                          : "bg-white border-slate-200 text-slate-800 hover:border-emerald-300 hover:bg-slate-50";
                      } else {
                        if (option.esCorrecta) {
                          optionClasses += "bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-500/30";
                        } else if (isSelected && !option.esCorrecta) {
                          optionClasses += "bg-rose-50 border-rose-500 text-rose-950 font-bold ring-2 ring-rose-500/30";
                        } else {
                          optionClasses += "bg-slate-50/50 border-slate-200 text-slate-400 opacity-60";
                        }
                      }

                      return (
                        <button
                          key={option.id}
                          disabled={isAnswerSubmitted}
                          onClick={() => handleSelectOption(option.id)}
                          className={optionClasses}
                        >
                          <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                            isSelected && !isAnswerSubmitted ? 'bg-emerald-600 text-white' :
                            isAnswerSubmitted && option.esCorrecta ? 'bg-emerald-600 text-white' :
                            isAnswerSubmitted && isSelected && !option.esCorrecta ? 'bg-rose-600 text-white' :
                            'bg-slate-100 text-slate-700'
                          }`}>
                            {option.id}
                          </span>
                          <span className="flex-1 leading-relaxed">
                            {option.texto}
                          </span>
                          {isAnswerSubmitted && option.esCorrecta && (
                            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                          )}
                          {isAnswerSubmitted && isSelected && !option.esCorrecta && (
                            <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Actions / Submit */}
                  {!isAnswerSubmitted ? (
                    <div className="pt-4 flex justify-end">
                      <button
                        onClick={handleSubmitAnswer}
                        disabled={!selectedAnswerId}
                        className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs md:text-sm rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-sm flex items-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        Confirmar Respuesta
                      </button>
                    </div>
                  ) : null}

                  {/* FEEDBACK & REFUERZO PEDAGÓGICO CARD */}
                  {isAnswerSubmitted && (
                    <div className="space-y-4 pt-4 border-t border-slate-200 animate-fadeIn">
                      {isCurrentAnswerCorrect ? (
                        <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-5 text-emerald-950 space-y-2">
                          <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                            <CheckCircle className="w-5 h-5 text-emerald-600" />
                            ¡Respuesta Correcta! (+20 puntos)
                          </div>
                          <p className="text-xs text-emerald-900 leading-relaxed">
                            {currentQuestion.opciones.find(opt => opt.id === selectedAnswerId)?.explicacionExito}
                          </p>
                        </div>
                      ) : (
                        <div className="bg-rose-50/90 border-2 border-rose-300 rounded-2xl p-5 md:p-6 text-rose-950 space-y-4 shadow-sm">
                          <div className="flex items-center gap-2 text-rose-900 font-extrabold text-sm md:text-base">
                            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
                            Refuerzo Pedagógico del Instructor SENA
                          </div>

                          <div className="bg-white/80 rounded-xl p-3.5 border border-rose-200 text-xs text-rose-950 space-y-1">
                            <span className="font-bold text-rose-900 block">❌ ¿Por qué es incorrecta tu opción?</span>
                            <p className="leading-relaxed">
                              {currentQuestion.opciones.find(opt => opt.id === selectedAnswerId)?.explicacionError}
                            </p>
                          </div>

                          <div className="bg-white/80 rounded-xl p-3.5 border border-rose-200 text-xs text-slate-800 space-y-1">
                            <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                              <BookOpen className="w-4 h-4 text-emerald-700" />
                              Fundamento Normativo Oficial:
                            </div>
                            <p className="font-semibold text-emerald-950">
                              {currentQuestion.refuerzoNormativo.articulo}
                            </p>
                            <p className="text-slate-600 text-[11px]">
                              {currentQuestion.refuerzoNormativo.conceptoClave}
                            </p>
                          </div>

                          <div className="bg-emerald-50 rounded-xl p-3.5 border border-emerald-200 text-xs text-emerald-950 space-y-1">
                            <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                              <Lightbulb className="w-4 h-4 text-emerald-700" />
                              Consejo para tu vida en el SENA:
                            </div>
                            <p className="leading-relaxed">
                              {currentQuestion.refuerzoNormativo.consejoPedagogico}
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="flex justify-end pt-2">
                        <button
                          onClick={handleNextQuestion}
                          className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs md:text-sm rounded-xl transition-all cursor-pointer shadow-md flex items-center gap-2"
                        >
                          {currentQuestionIndex < acuerdoData.bancoPreguntasEvaluacion.length - 1 ? (
                            <>
                              Siguiente Caso <ChevronRight className="w-4 h-4" />
                            </>
                          ) : (
                            <>
                              Ver Resultados Finales <Award className="w-4 h-4 text-amber-400" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* State: Quiz Finished */}
            {quizFinished && (
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md text-center space-y-6 max-w-2xl mx-auto">
                <div className={`w-20 h-20 rounded-3xl mx-auto flex items-center justify-center font-extrabold text-3xl shadow-inner ${
                  score >= 80 ? 'bg-emerald-100 text-emerald-700' :
                  score >= 60 ? 'bg-amber-100 text-amber-700' :
                  'bg-rose-100 text-rose-700'
                }`}>
                  {score >= 80 ? <Award className="w-10 h-10 text-emerald-600" /> : <RotateCcw className="w-10 h-10 text-amber-600" />}
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Resultado de la Evaluación
                  </span>
                  <h2 className="text-3xl font-extrabold text-slate-900 font-display">
                    {score} / 100 Puntos
                  </h2>
                  <p className="text-sm font-semibold text-emerald-700">
                    {score >= 80 ? '🌟 ¡Excelente! Conoces a profundidad tus derechos, deberes y normatividad SENA.' :
                     score >= 60 ? '👍 Buen desempeño. Has aprobado con conocimientos sólidos del Reglamento.' :
                     '📚 Se recomienda repasar los módulos de derechos y deberes con el refuerzo pedagógico.'}
                  </p>
                </div>

                {/* Auto-save status in repository */}
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-left text-xs text-emerald-950 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="font-bold block">
                      {isSavingEvaluation ? 'Guardando en el Repositorio...' : '✅ Respuestas y Calificación Almacenadas en el Repositorio'}
                    </span>
                    <p className="text-emerald-800 text-[11px] mt-0.5">
                      Aprendiz: <strong>{aprendizPerfil?.nombres} {aprendizPerfil?.apellidos}</strong> · Documento: {aprendizPerfil?.tipoDocumento} {aprendizPerfil?.numeroDocumento} · Ficha: {aprendizPerfil?.numeroFicha}
                    </p>
                    {lastSavedEvaluation && (
                      <p className="text-[10px] text-emerald-700 font-mono mt-1">
                        Código de Registro: {lastSavedEvaluation.id}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-left">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <span className="text-xs text-slate-500 block">Aciertos</span>
                    <span className="text-xl font-bold text-emerald-600">
                      {answersHistory.filter(a => a.isCorrect).length} de 5
                    </span>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <span className="text-xs text-slate-500 block">Norma Evaluada</span>
                    <span className="text-xs font-bold text-slate-800">
                      Acuerdo 0009 de 2024
                    </span>
                  </div>
                </div>

                {/* Actions: Certificate, Repositorio, Repeat */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                  {lastSavedEvaluation && (
                    <button
                      onClick={() => setShowCertificateModal(true)}
                      className="w-full sm:w-auto px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Award className="w-4 h-4 text-amber-300" />
                      Descargar Constancia Oficial
                    </button>
                  )}
                  <button
                    onClick={() => setActiveTab('panel_admin')}
                    className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Ver en Panel Administrador
                  </button>
                  <button
                    onClick={handleRestartQuiz}
                    className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Repetir Prueba
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB: PANEL DE ADMINISTRADOR & ANALÍTICA DE RESPUESTAS                     */}
        {/* ========================================================================= */}
        {(activeTab === 'panel_admin' || activeTab === 'repositorio') && (
          <PanelAdministrador
            onStartNewEvaluation={() => {
              setActiveTab('quiz');
              setIsEditingProfile(true);
              setQuizStarted(false);
              setQuizFinished(false);
            }}
          />
        )}

        {/* ========================================================================= */}
        {/* TAB: VISOR Y DESCARGA DEL ARCHIVO JSON                                    */}
        {/* ========================================================================= */}
        {activeTab === 'reglamento_json' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">
                  <span>Estructura Oficial de Datos</span>
                  <span>·</span>
                  <span>Formato JSON Estandarizado</span>
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 font-display">
                  acuerdo_0009_2024_sena.json
                </h1>
                <p className="mt-2 text-slate-600 text-base max-w-2xl">
                  Conversión íntegra y jerárquica del Acuerdo 0009 de 2024 (Reglamento del Aprendiz SENA) con metadatos, principios, derechos, deberes, faltas, debido proceso y casos evaluativos.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={handleCopyJson}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
                >
                  {jsonCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  {jsonCopied ? '¡JSON Copiado!' : 'Copiar JSON'}
                </button>
                <button 
                  onClick={handleDownloadJson}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors shadow-xs cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  Descargar .json
                </button>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
              <div className="bg-white p-4 rounded-xl border border-slate-200 text-center shadow-xs">
                <span className="text-xs text-slate-500 block">Derechos</span>
                <span className="text-lg font-extrabold text-emerald-700">{acuerdoData.derechos.length}</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 text-center shadow-xs">
                <span className="text-xs text-slate-500 block">Deberes</span>
                <span className="text-lg font-extrabold text-teal-700">{acuerdoData.deberes.length}</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 text-center shadow-xs">
                <span className="text-xs text-slate-500 block">Prohibiciones</span>
                <span className="text-lg font-extrabold text-rose-700">{acuerdoData.prohibiciones.length}</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 text-center shadow-xs">
                <span className="text-xs text-slate-500 block">Fases Proceso</span>
                <span className="text-lg font-extrabold text-blue-700">{acuerdoData.debidoProceso.fases.length}</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 text-center shadow-xs">
                <span className="text-xs text-slate-500 block">Etapa Productiva</span>
                <span className="text-lg font-extrabold text-amber-700">{acuerdoData.etapaProductiva.modalidades.length}</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 text-center shadow-xs">
                <span className="text-xs text-slate-500 block">Casos Quiz</span>
                <span className="text-lg font-extrabold text-purple-700">{acuerdoData.bancoPreguntasEvaluacion.length}</span>
              </div>
            </div>

            {/* JSON Code View Box */}
            <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 shadow-xl overflow-x-auto max-h-[600px] overflow-y-auto">
              <pre className="text-emerald-400 font-mono text-xs leading-relaxed">
                <code>{jsonStringData}</code>
              </pre>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB: RAZONAMIENTO CoT                                                     */}
        {/* ========================================================================= */}
        {activeTab === 'razonamiento' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="border-b border-slate-200 pb-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">
                <span>Metodología Pedagógica</span>
                <span>·</span>
                <span>Cadena de Pensamientos</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 font-display">
                Análisis y Razonamiento Institucional SENA
              </h1>
              <p className="mt-2 text-slate-600 text-base max-w-3xl">
                Fundamentación normativa, pedagógica y de acompañamiento integral desarrollada por el instructor experto para la sesión de inducción a la formación titulada.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold mb-4">
                    01
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Reglamento del Aprendiz (Acuerdo 0009)</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Análisis riguroso de derechos, deberes, clasificación de faltas (leves, graves, gravísimas) y el debido proceso institucional para garantizar un ambiente de convivencia y respeto.
                  </p>
                </div>
                <button 
                  onClick={() => setActiveTab('modulo_interactivo')}
                  className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 group cursor-pointer"
                >
                  Explorar módulo interactivo <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold mb-4">
                    02
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Etapa Productiva</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Desglose detallado de las 5 alternativas formales (Contrato de aprendizaje, pasantía, proyecto productivo, monitoría y vínculo laboral) y los procedimientos de seguimiento y evaluación.
                  </p>
                </div>
                <button 
                  onClick={() => setActiveTab('etapa')}
                  className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 group cursor-pointer"
                >
                  Ver alternativas <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold mb-4">
                    03
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Caracterización y Homologación</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Evaluación del impacto de la procedencia regional y formación titulada previa para diseñar estrategias de acogida, homologación de competencias (RAP) y nivelación.
                  </p>
                </div>
                <button 
                  onClick={() => setActiveTab('caracterizacion')}
                  className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 group cursor-pointer"
                >
                  Analizar perfiles <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Detailed CoT Box */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xs">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-600" />
                Bloque de Razonamiento Oficial (Chain of Thought)
              </h3>
              <div className="bg-slate-900 text-slate-100 p-6 rounded-xl font-mono text-xs leading-relaxed overflow-x-auto shadow-inner">
                <pre>{`// <razonamiento>
1. Análisis del Reglamento del Aprendiz SENA Vigente (Acuerdo No. 0009 de 2024):
   - Derechos: Acceso a formación integral de calidad, uso de ambientes tecnológicos, estímulos e incentivos (monitorías, menciones), y estricto respeto al debido proceso en comités de evaluación y seguimiento.
   - Deberes: Compromiso con las actividades de aprendizaje presenciales y virtuales, uso correcto de uniformes y EPP, respeto institucional y cuidado de los bienes de la entidad.
   - Faltas: Académicas y disciplinarias clasificadas en Leves, Graves y Gravísimas, asociadas a llamadas de atención, condicionamiento o cancelación de matrícula.
2. Proceso y Procedimiento de Etapa Productiva:
   - Definición: Fase donde el aprendiz aplica los saberes lectivos en entornos reales de trabajo.
   - Alternativas: Contrato de Aprendizaje, Pasantía, Proyecto Productivo, Monitoría y Vínculo Laboral, con seguimiento mediante bitácoras periódicas.
3. Impacto de la Caracterización del Aprendiz:
   - Homologación de competencias para aprendices con formación previa o validación de aprendizajes previos (RAP).
   - Adaptación pedagógica según contexto regional y necesidades socioemocionales.
// </razonamiento>`}</pre>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB: ETAPA PRODUCTIVA                                                     */}
        {/* ========================================================================= */}
        {activeTab === 'etapa' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="border-b border-slate-200 pb-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">
                <span>Ejecución de la Formación</span>
                <span>·</span>
                <span>Modalidades Oficiales</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 font-display">
                Proceso y Alternativas de Etapa Productiva
              </h1>
              <p className="mt-2 text-slate-600 text-base max-w-3xl">
                La etapa productiva es el período donde el aprendiz aplica los conocimientos adquiridos en la fase lectiva. Conoce las 5 alternativas formales aprobadas por el SENA.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {acuerdoData.etapaProductiva.modalidades.map((mod, idx) => (
                <div key={mod.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                        0{idx + 1}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-slate-900">{mod.nombre}</h3>
                        <span className="text-[11px] text-emerald-700 font-medium">{mod.id}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {mod.descripcion}
                    </p>
                  </div>
                  <div className="text-[11px] text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <strong>Característica:</strong> {mod.caracteristica}
                  </div>
                </div>
              ))}
            </div>

            {/* Instrumentos de Seguimiento */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                <FileCheckIcon className="w-5 h-5 text-emerald-600" />
                Instrumentos y Procedimiento de Seguimiento
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {acuerdoData.etapaProductiva.instrumentosSeguimiento.map((inst, i) => (
                  <div key={i} className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100 text-xs text-emerald-950 font-medium flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{inst}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB: CARACTERIZACIÓN Y HOMOLOGACIÓN                                       */}
        {/* ========================================================================= */}
        {activeTab === 'caracterizacion' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="border-b border-slate-200 pb-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">
                <span>Acompañamiento Integral</span>
                <span>·</span>
                <span>Caracterización y Homologación</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 font-display">
                Caracterización del Aprendiz y Estrategia de Homologación
              </h1>
              <p className="mt-2 text-slate-600 text-base max-w-3xl">
                La caracterización es el proceso mediante el cual el SENA identifica el perfil sociodemográfico, académico, tecnológico y de procedencia regional de los nuevos aprendices para diseñar rutas pedagógicas de acogida y homologación eficaces.
              </p>
            </div>

            {/* Interactive Profile Simulator */}
            <div className="bg-white rounded-2xl p-6 lg:p-8 border border-slate-200 shadow-xs space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Simulador de Perfil e Ingreso al SENA</h3>
                  <p className="text-xs text-slate-600 mt-1">Selecciona el perfil de ingreso del aprendiz para conocer la ruta pedagógica, plan de acogida y directrices de homologación recomendadas:</p>
                </div>

                <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
                  <button 
                    onClick={() => setSelectedProfile('nuevo')}
                    className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${selectedProfile === 'nuevo' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    Ingreso Nuevo
                  </button>
                  <button 
                    onClick={() => setSelectedProfile('titulada_previa')}
                    className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${selectedProfile === 'titulada_previa' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    Titulada Previa (SENA)
                  </button>
                  <button 
                    onClick={() => setSelectedProfile('experiencia_laboral')}
                    className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${selectedProfile === 'experiencia_laboral' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    Experiencia / RAP
                  </button>
                </div>
              </div>

              {/* Dynamic Profile Output Card */}
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-6">
                {selectedProfile === 'nuevo' && (
                  <>
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Perfil Seleccionado</span>
                      <h4 className="text-base font-bold text-slate-900">Aspirante sin formación titulada previa</h4>
                      <p className="text-xs text-slate-600">Aprendiz que ingresa por primera vez a un programa de formación titulada del SENA (Técnico o Tecnólogo).</p>
                    </div>
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Estrategia de Acogida</span>
                      <ul className="text-xs text-slate-600 space-y-1">
                        <li>• Inducción general y técnica completa (40h).</li>
                        <li>• Nivelación en competencias básicas y digitales.</li>
                        <li>• Apoyo socioemocional y orientación vocacional.</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Homologación</span>
                      <p className="text-xs text-slate-600">No aplica homologación curricular directa. Inicio desde la fase lectiva inicial con acompañamiento de tutor.</p>
                    </div>
                  </>
                )}

                {selectedProfile === 'titulada_previa' && (
                  <>
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Perfil Seleccionado</span>
                      <h4 className="text-base font-bold text-slate-900">Egresado Técnico SENA (Articulación)</h4>
                      <p className="text-xs text-slate-600">Aprendiz que cursó previamente un programa técnico afín y ahora ingresa a la tecnología correspondiente.</p>
                    </div>
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Estrategia de Acogida</span>
                      <ul className="text-xs text-slate-600 space-y-1">
                        <li>• Reconocimiento de competencias transversales.</li>
                        <li>• Integración acelerada a módulos técnicos avanzados.</li>
                        <li>• Enfoque en investigación aplicada y proyectos.</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Homologación</span>
                      <p className="text-xs text-slate-600">Aplicación de tabla de homologación institucional vigente en Sofia Plus para evitar duplicidad de resultados de aprendizaje.</p>
                    </div>
                  </>
                )}

                {selectedProfile === 'experiencia_laboral' && (
                  <>
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Perfil Seleccionado</span>
                      <h4 className="text-base font-bold text-slate-900">Trabajador con Experiencia (RAP)</h4>
                      <p className="text-xs text-slate-600">Aspirante con amplia experiencia laboral empírica o formal que busca certificar sus competencias por medio del SENA.</p>
                    </div>
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Estrategia de Acogida</span>
                      <ul className="text-xs text-slate-600 space-y-1">
                        <li>• Asignación de evaluador de competencias laborales.</li>
                        <li>• Inducción metodológica en evidencias y portafolio.</li>
                        <li>• Flexibilidad en horarios de presentación de pruebas.</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Homologación</span>
                      <p className="text-xs text-slate-600">Proceso de Reconocimiento de Aprendizajes Previos (RAP) mediante sustentación de evidencias de desempeño y producto.</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Grid of Characterization Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-emerald-600" />
                  Homologación y Reconocimiento de Aprendizajes (RAP)
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  El SENA reconoce formalmente los saberes adquiridos por el aprendiz a lo largo de su vida, ya sea por educación formal previa o por experiencia laboral certificada, optimizando los tiempos de formación sin perder rigor técnico.
                </p>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" /> Revisión curricular cruzada en Sofia Plus / Zajuna.
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" /> Emisión de resolución de homologación por comité académico.
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-emerald-600" />
                  Estrategia Pedagógica de Acogida e Inclusión
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  A partir de las respuestas de la encuesta de caracterización, Bienestar al Aprendiz y el equipo ejecutor despliegan planes de apoyo socioemocional, adaptaciones curriculares para población diferencial y refuerzos tecnológicos.
                </p>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" /> Identificación temprana de riesgos de deserción escolar.
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" /> Acceso a planes de conectividad y préstamos de equipos.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB: SCRIPT JS OFICIAL                                                    */}
        {/* ========================================================================= */}
        {activeTab === 'script' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">
                  <span>Entrega Oficial</span>
                  <span>·</span>
                  <span>Código JavaScript Documentado</span>
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 font-display">
                  InduccionFormacionTituladaSENA.js
                </h1>
                <p className="mt-2 text-slate-600 text-base max-w-2xl">
                  Script completo estructurado con la sección de razonamiento institucional y objetos/arreglos profesionales solicitados.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={handleCopyScript}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  {copied ? '¡Copiado!' : 'Copiar Código'}
                </button>
                <button 
                  onClick={handleDownloadScript}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors shadow-xs cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  Descargar .js
                </button>
              </div>
            </div>

            {/* Code View Box */}
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl overflow-x-auto">
              <pre className="text-slate-200 font-mono text-xs leading-relaxed">
                <code>{senaScriptContent}</code>
              </pre>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB: ASISTENTE IA INSTRUCTOR                                              */}
        {/* ========================================================================= */}
        {activeTab === 'asistente' && (
          <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto">
            <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    Inteligencia Artificial Institucional
                  </span>
                  <span>·</span>
                  <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full text-[10px] font-bold">
                    Gemini 3.8 Flash & Motor Normativo
                  </span>
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 font-display">
                  Asistente Experto SENA
                </h1>
                <p className="mt-2 text-slate-600 text-base max-w-2xl">
                  Orientación inmediata y experta sobre el Reglamento del Aprendiz (Acuerdo No. 0009 de 2024), etapa productiva, debido proceso y comités.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleClearChat}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
                  title="Reiniciar conversación"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reiniciar Chat
                </button>
              </div>
            </div>

            {/* Chat Container */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[520px]">
              <div className="flex-1 p-5 md:p-6 overflow-y-auto space-y-4">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] md:max-w-[78%] rounded-2xl p-4 text-xs md:text-sm leading-relaxed shadow-xs ${
                      msg.sender === 'user' 
                        ? 'bg-emerald-700 text-white rounded-br-xs' 
                        : 'bg-slate-50 text-slate-800 rounded-bl-xs border border-slate-200/80'
                    }`}>
                      {msg.sender === 'assistant' && (
                        <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-200/60 text-[11px] font-bold text-emerald-800">
                          <img 
                            src="data:image/svg+xml,%3c?xml%20version=%271.0%27%20encoding=%27utf-8%27?%3e%3csvg%20version=%271.1%27%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%201000%201000%27%3e%3cpath%20fill=%27%2339a900%27%20d=%27M504.2,20.5c-58.3,0.1-105.6,47.4-105.5,105.8c0.1,58.3,47.4,105.6,105.7,105.6c58.3,0,105.6-47.3,105.6-105.7V126C609.9,67.6,562.6,20.4,504.2,20.5z%27/%3e%3c/svg%3e" 
                            alt="SENA" 
                            className="w-4 h-4 object-contain"
                          />
                          <span>Instructor Experto SENA · Acuerdo 0009</span>
                        </div>
                      )}
                      <FormattedChatMessage text={msg.text} isUser={msg.sender === 'user'} />
                    </div>
                  </div>
                ))}
                {isChatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-emerald-50 text-emerald-900 rounded-2xl px-4 py-3 text-xs md:text-sm flex items-center gap-2 border border-emerald-200 animate-pulse">
                      <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" />
                      <span>El Instructor Virtual está analizando la normatividad institucional para redactar la respuesta...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleFormSubmit} className="p-4 border-t border-slate-200 flex gap-3 bg-slate-50 rounded-b-2xl">
                <input 
                  type="text" 
                  placeholder="Escribe tu consulta normativa (ej: ¿Cuáles son las faltas gravísimas o cómo legalizo contrato de aprendizaje?)..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="flex-1 px-4 py-2.5 text-xs md:text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                />
                <button 
                  type="submit" 
                  disabled={isChatLoading || !inputMessage.trim()}
                  className="px-5 py-2.5 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50 flex items-center gap-2 cursor-pointer shadow-xs text-xs md:text-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>Consultar</span>
                </button>
              </form>
            </div>
          </div>
        )}

      </main>

      {/* Official Certificate Modal */}
      {showCertificateModal && lastSavedEvaluation && (
        <CertificadoModal
          evaluacion={lastSavedEvaluation}
          onClose={() => setShowCertificateModal(false)}
        />
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 px-6 text-center text-xs text-slate-500">
        Portal de Inducción a la Formación Titulada SENA · Normatividad Oficial Acuerdo 0009 de 2024 · Acompañamiento Integral al Aprendiz
      </footer>
    </div>
  );
}

// Helper to format structured markdown responses
function FormattedChatMessage({ text, isUser }: { text: string; isUser: boolean }) {
  if (isUser) {
    return <span>{text}</span>;
  }

  const paragraphs = text.split(/\n\n+/);

  return (
    <div className="space-y-2.5 text-slate-800">
      {paragraphs.map((para, pIdx) => {
        const lines = para.split('\n').map(l => l.trim()).filter(Boolean);
        
        const isBulletList = lines.length > 0 && lines.every(line => line.startsWith('•') || line.startsWith('-') || line.startsWith('* '));
        const isNumberedList = lines.length > 0 && lines.every(line => /^\d+\.\s/.test(line));

        if (isBulletList) {
          return (
            <ul key={pIdx} className="space-y-1 my-1.5 list-disc pl-4">
              {lines.map((line, lIdx) => {
                const cleanLine = line.replace(/^[\s•\-\*]+/, '').trim();
                return <li key={lIdx}>{renderFormattedInline(cleanLine)}</li>;
              })}
            </ul>
          );
        }

        if (isNumberedList) {
          return (
            <ol key={pIdx} className="space-y-1.5 my-1.5 list-decimal pl-4">
              {lines.map((line, lIdx) => {
                const cleanLine = line.replace(/^\d+\.\s*/, '').trim();
                return <li key={lIdx}>{renderFormattedInline(cleanLine)}</li>;
              })}
            </ol>
          );
        }

        return (
          <p key={pIdx} className="leading-relaxed">
            {lines.map((line, lIdx) => (
              <React.Fragment key={lIdx}>
                {renderFormattedInline(line)}
                {lIdx < lines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}

function renderFormattedInline(text: string) {
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      return <strong key={index} className="font-bold text-slate-900">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*') && part.length >= 2) {
      return <em key={index} className="italic text-slate-700">{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

// Small helper icon component for clean code
function FileCheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="m9 15 2 2 4-4" />
    </svg>
  );
}
