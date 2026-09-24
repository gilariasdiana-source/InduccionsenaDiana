import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Search, 
  Filter, 
  Download, 
  FileSpreadsheet, 
  FileCode, 
  Trash2, 
  Eye, 
  Award, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  BarChart3, 
  Users, 
  Clock, 
  RefreshCw,
  Sparkles,
  BookOpen,
  ChevronRight,
  GraduationCap,
  ShieldCheck,
  Printer,
  PieChart,
  HelpCircle,
  Building2,
  Calendar,
  Layers,
  Check,
  TrendingUp,
  Activity,
  ArrowUpRight,
  SlidersHorizontal,
  Table,
  UserCheck
} from 'lucide-react';
import { EvaluacionRegistro, RepositoryStats } from '../types/evaluacion';
import CertificadoModal from './CertificadoModal';

interface PanelAdministradorProps {
  onStartNewEvaluation: () => void;
}

export default function PanelAdministrador({ onStartNewEvaluation }: PanelAdministradorProps) {
  const [activeSubTab, setActiveSubTab] = useState<'analytics' | 'aprendices' | 'preguntas' | 'exportar'>('analytics');
  
  const [evaluaciones, setEvaluaciones] = useState<EvaluacionRegistro[]>([]);
  const [stats, setStats] = useState<RepositoryStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFicha, setSelectedFicha] = useState('todas');
  const [selectedRegional, setSelectedRegional] = useState('todas');
  const [selectedEstado, setSelectedEstado] = useState('todos');
  
  // Selected evaluation for detail modal
  const [activeDetailEval, setActiveDetailEval] = useState<EvaluacionRegistro | null>(null);
  // Selected evaluation for certificate modal
  const [activeCertEval, setActiveCertEval] = useState<EvaluacionRegistro | null>(null);

  const fetchEvaluaciones = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (selectedFicha !== 'todas') params.append('ficha', selectedFicha);
      if (selectedRegional !== 'todas') params.append('regional', selectedRegional);
      if (selectedEstado !== 'todos') params.append('estado', selectedEstado);

      const res = await fetch(`/api/evaluaciones?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setEvaluaciones(data.evaluaciones || []);
      }
    } catch (e) {
      console.error('Error fetching repository evaluations:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/evaluaciones/stats/summary');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (e) {
      console.error('Error fetching stats:', e);
    }
  };

  useEffect(() => {
    fetchEvaluaciones();
    fetchStats();
  }, [searchTerm, selectedFicha, selectedRegional, selectedEstado]);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('¿Estás seguro de eliminar este registro del repositorio institucional?')) return;
    try {
      const res = await fetch(`/api/evaluaciones/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setEvaluaciones(prev => prev.filter(item => item.id !== id));
        fetchStats();
      }
    } catch (err) {
      console.error('Error deleting record:', err);
    }
  };

  const handleSeedData = async () => {
    try {
      const res = await fetch('/api/evaluaciones/seed', { method: 'POST' });
      if (res.ok) {
        fetchEvaluaciones();
        fetchStats();
      }
    } catch (err) {
      console.error('Error seeding data:', err);
    }
  };

  const handleExportJson = () => {
    const jsonBlob = new Blob([JSON.stringify(evaluaciones, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(jsonBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SENA_Repositorio_Evaluaciones_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const uniqueFichas = Array.from(new Set(evaluaciones.map(e => e.aprendiz.numeroFicha).filter(Boolean)));
  const uniqueRegionales = Array.from(new Set(evaluaciones.map(e => e.aprendiz.regional).filter(Boolean)));

  // Analytics Computations
  const totalEvaluados = evaluaciones.length;
  const sobresalientes = evaluaciones.filter(e => e.porcentaje >= 90).length;
  const aprobadosNormales = evaluaciones.filter(e => e.porcentaje >= 70 && e.porcentaje < 90).length;
  const reprobados = evaluaciones.filter(e => e.porcentaje < 70).length;

  const conFormacionPrevia = evaluaciones.filter(e => e.aprendiz.tieneFormacionPrevia);
  const sinFormacionPrevia = evaluaciones.filter(e => !e.aprendiz.tieneFormacionPrevia);

  const avgConPrevia = conFormacionPrevia.length > 0 
    ? Math.round(conFormacionPrevia.reduce((acc, curr) => acc + curr.puntaje, 0) / conFormacionPrevia.length)
    : 0;
  
  const avgSinPrevia = sinFormacionPrevia.length > 0
    ? Math.round(sinFormacionPrevia.reduce((acc, curr) => acc + curr.puntaje, 0) / sinFormacionPrevia.length)
    : 0;

  // Aggregate questions and options analysis across all evaluations
  const questionAnalysisMap: Record<string, {
    preguntaId: string;
    preguntaTexto: string;
    categoria: string;
    competencia: string;
    totalRespuestas: number;
    aciertos: number;
    errores: number;
    opcionesSeleccionadas: Record<string, number>;
  }> = {};

  evaluaciones.forEach(ev => {
    ev.respuestas?.forEach(resp => {
      const pId = resp.preguntaId || 'Gen';
      if (!questionAnalysisMap[pId]) {
        questionAnalysisMap[pId] = {
          preguntaId: pId,
          preguntaTexto: resp.preguntaTexto,
          categoria: resp.categoria,
          competencia: resp.competencia,
          totalRespuestas: 0,
          aciertos: 0,
          errores: 0,
          opcionesSeleccionadas: {}
        };
      }
      questionAnalysisMap[pId].totalRespuestas += 1;
      if (resp.esCorrecta) {
        questionAnalysisMap[pId].aciertos += 1;
      } else {
        questionAnalysisMap[pId].errores += 1;
      }
      const opt = resp.opcionSeleccionada || 'N/A';
      questionAnalysisMap[pId].opcionesSeleccionadas[opt] = (questionAnalysisMap[pId].opcionesSeleccionadas[opt] || 0) + 1;
    });
  });

  const questionAnalysisList = Object.values(questionAnalysisMap);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden border border-slate-800">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/70 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Panel de Administrador & Analítica Institucional
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold font-display text-white tracking-tight">
              Control, Respuestas y Analítica de Inducción
            </h1>
            <p className="mt-2 text-slate-300 text-xs md:text-sm leading-relaxed">
              Supervisa en tiempo real el progreso de los aprendices, analiza los índices de acierto en el <strong>Acuerdo No. 0009 de 2024</strong>, audita respuestas individuales y exporta los informes para la coordinación académica.
            </p>
          </div>

          {/* Quick Action Tools */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onStartNewEvaluation}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Evaluar Aprendiz</span>
            </button>
            <a
              href="/api/evaluaciones/export/csv"
              download="SENA_Informe_Induccion.csv"
              className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl border border-slate-700 transition-all flex items-center gap-2 cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>Exportar CSV</span>
            </a>
            <button
              onClick={handleExportJson}
              className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl border border-slate-700 transition-all flex items-center gap-2 cursor-pointer"
            >
              <FileCode className="w-4 h-4 text-emerald-400" />
              <span>JSON</span>
            </button>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="mt-8 pt-4 border-t border-slate-800/80 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveSubTab('analytics')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'analytics'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>1. Tablero Analítico & KPIs</span>
          </button>
          <button
            onClick={() => setActiveSubTab('aprendices')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'aprendices'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>2. Respuestas por Aprendiz ({totalEvaluados})</span>
          </button>
          <button
            onClick={() => setActiveSubTab('preguntas')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'preguntas'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>3. Análisis de Preguntas & Distractores</span>
          </button>
          <button
            onClick={() => setActiveSubTab('exportar')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'exportar'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>4. Informes & Exportación</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SUB-TAB 1: TABLERO ANALÍTICO & KPIS                                      */}
      {/* ========================================================================= */}
      {activeSubTab === 'analytics' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Executive KPI Cards */}
          {stats && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Evaluados</span>
                  <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-3xl font-black text-slate-900 font-display">{stats.total}</span>
                  <span className="text-xs text-emerald-700 font-semibold ml-2">aprendices</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Registrados en base de datos</p>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tasa de Aprobación</span>
                  <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-3xl font-black text-slate-900 font-display">{stats.tasaAprobacion}%</span>
                  <span className="text-xs text-slate-500 font-medium ml-2">({stats.aprobados} de {stats.total})</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Meta institucional: ≥ 85%</p>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Puntaje Promedio</span>
                  <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
                    <Award className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-3xl font-black text-slate-900 font-display">{stats.promedioPuntaje}</span>
                  <span className="text-xs text-amber-800 font-semibold ml-2">/ 100 pts</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Media de calificación global</p>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tiempo Promedio</span>
                  <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-3xl font-black text-slate-900 font-display">{Math.round(stats.promedioTiempo / 60)}</span>
                  <span className="text-xs text-blue-800 font-semibold ml-2">min {stats.promedioTiempo % 60} seg</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Dedicación por evaluación</p>
              </div>
            </div>
          )}

          {/* Performance Distribution & Characterization Impact */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Distribution Graph */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <PieChart className="w-4 h-4 text-emerald-600" />
                    Distribución de Calificaciones del Aprendiz
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Clasificación de rendimiento según escalas reglamentarias SENA.
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                {/* Sobresaliente */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-emerald-800 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                      Sobresaliente (90 - 100 pts)
                    </span>
                    <span className="font-bold text-slate-900">{sobresalientes} aprendices ({totalEvaluados > 0 ? Math.round((sobresalientes / totalEvaluados) * 100) : 0}%)</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                      style={{ width: `${totalEvaluados > 0 ? (sobresalientes / totalEvaluados) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>

                {/* Aprobado */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-teal-800 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span>
                      Aprobado (70 - 89 pts)
                    </span>
                    <span className="font-bold text-slate-900">{aprobadosNormales} aprendices ({totalEvaluados > 0 ? Math.round((aprobadosNormales / totalEvaluados) * 100) : 0}%)</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-teal-500 rounded-full transition-all duration-500"
                      style={{ width: `${totalEvaluados > 0 ? (aprobadosNormales / totalEvaluados) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>

                {/* Requiere Refuerzo */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-rose-800 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                      Por Mejorar / Requiere Refuerzo (&lt; 70 pts)
                    </span>
                    <span className="font-bold text-slate-900">{reprobados} aprendices ({totalEvaluados > 0 ? Math.round((reprobados / totalEvaluados) * 100) : 0}%)</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-rose-500 rounded-full transition-all duration-500"
                      style={{ width: `${totalEvaluados > 0 ? (reprobados / totalEvaluados) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Characterization Analysis */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-blue-600" />
                      Impacto de la Caracterización (Formación Previa SENA)
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Comparativa entre aprendices con experiencia previa en el SENA y aprendices nuevos.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                    <span className="text-[11px] font-bold text-emerald-800 uppercase block mb-1">Con Formación Previa</span>
                    <span className="text-2xl font-black text-emerald-950 font-display">{avgConPrevia} pts</span>
                    <p className="text-[11px] text-emerald-700 mt-1">{conFormacionPrevia.length} aprendices caracterizados</p>
                    <div className="mt-2 text-[10px] text-emerald-800 font-semibold">
                      💡 Mayor apropiación del Debido Proceso y Etapa Productiva.
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <span className="text-[11px] font-bold text-slate-700 uppercase block mb-1">Nuevos Aprendices</span>
                    <span className="text-2xl font-black text-slate-900 font-display">{avgSinPrevia} pts</span>
                    <p className="text-[11px] text-slate-500 mt-1">{sinFormacionPrevia.length} aprendices</p>
                    <div className="mt-2 text-[10px] text-slate-600 font-semibold">
                      💡 Requieren mayor acompañamiento en trámites y novedades.
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Total fichas representadas: <strong>{uniqueFichas.length}</strong></span>
                <span>Regionales activas: <strong>{uniqueRegionales.length}</strong></span>
              </div>
            </div>
          </div>

          {/* Diagnostic by Topics & Regulation Competencies */}
          {stats && stats.diagnosticoTematico && stats.diagnosticoTematico.length > 0 && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-emerald-600" />
                    Mapa de Refuerzo Normativo en Aula (Acuerdo No. 0009 de 2024)
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Permite al instructor identificar qué capítulos del Reglamento requieren mayor socialización en sesión presencial/virtual.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {stats.diagnosticoTematico.map((diag) => (
                  <div key={diag.preguntaId} className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <div className="flex items-center justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-800 truncate pr-2 font-bold">{diag.competencia}</span>
                      <span className={`font-black ${diag.porcentajeAcierto >= 80 ? 'text-emerald-700' : 'text-amber-700'}`}>
                        {diag.porcentajeAcierto}%
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden mb-2">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          diag.porcentajeAcierto >= 80 ? 'bg-emerald-600' : diag.porcentajeAcierto >= 60 ? 'bg-amber-500' : 'bg-rose-500'
                        }`}
                        style={{ width: `${diag.porcentajeAcierto}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>{diag.categoria}</span>
                      {diag.necesitaRefuerzoEnAula ? (
                        <span className="text-amber-800 font-bold flex items-center gap-1 bg-amber-100 px-2 py-0.5 rounded">
                          <AlertTriangle className="w-3 h-3 text-amber-600" /> Reforzar en clase
                        </span>
                      ) : (
                        <span className="text-emerald-700 font-semibold flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> Dominado
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 2: RESPUESTAS DETALLADAS POR APRENDIZ                             */}
      {/* ========================================================================= */}
      {activeSubTab === 'aprendices' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Filters Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar aprendiz, cédula o ficha..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {/* Ficha Filter */}
              <select
                value={selectedFicha}
                onChange={(e) => setSelectedFicha(e.target.value)}
                className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
              >
                <option value="todas">Todas las Fichas</option>
                {uniqueFichas.map(f => <option key={f} value={f}>Ficha {f}</option>)}
              </select>

              {/* Regional Filter */}
              <select
                value={selectedRegional}
                onChange={(e) => setSelectedRegional(e.target.value)}
                className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
              >
                <option value="todas">Todas las Regionales</option>
                {uniqueRegionales.map(r => <option key={r} value={r}>Regional {r}</option>)}
              </select>

              {/* Estado Filter */}
              <select
                value={selectedEstado}
                onChange={(e) => setSelectedEstado(e.target.value)}
                className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
              >
                <option value="todos">Todos los Estados</option>
                <option value="aprobado">Solo Aprobados</option>
                <option value="reprobado">Por Mejorar</option>
              </select>

              <button
                onClick={handleSeedData}
                title="Restaurar datos demo iniciales"
                className="p-2 text-slate-500 hover:text-emerald-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Evaluations Table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                    <th className="py-3.5 px-4">Aprendiz</th>
                    <th className="py-3.5 px-4">Documento</th>
                    <th className="py-3.5 px-4">Ficha & Programa</th>
                    <th className="py-3.5 px-4">Regional & Sede</th>
                    <th className="py-3.5 px-4 text-center">Calificación</th>
                    <th className="py-3.5 px-4 text-center">Estado</th>
                    <th className="py-3.5 px-4 text-center">Fecha / Hora</th>
                    <th className="py-3.5 px-4 text-right">Ver Respuestas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {isLoading ? (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-slate-500">
                        <RefreshCw className="w-6 h-6 animate-spin mx-auto text-emerald-600 mb-2" />
                        Cargando respuestas de los aprendices...
                      </td>
                    </tr>
                  ) : evaluaciones.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-slate-500">
                        <BookOpen className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                        No se encontraron registros con los filtros seleccionados.
                      </td>
                    </tr>
                  ) : (
                    evaluaciones.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900">{item.aprendiz.nombres} {item.aprendiz.apellidos}</div>
                          <div className="text-[11px] text-slate-400">{item.aprendiz.correo}</div>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-slate-700">
                          <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 rounded text-slate-600 mr-1 font-sans font-bold">{item.aprendiz.tipoDocumento}</span>
                          {item.aprendiz.numeroDocumento}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-emerald-800">Ficha {item.aprendiz.numeroFicha}</div>
                          <div className="text-[11px] text-slate-500 truncate max-w-xs">{item.aprendiz.programa}</div>
                        </td>
                        <td className="py-3.5 px-4 text-slate-600">
                          <div className="font-medium text-slate-800">{item.aprendiz.regional}</div>
                          <div className="text-[10px] text-slate-400 truncate max-w-xs">{item.aprendiz.centroFormacion}</div>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className="font-black text-sm text-slate-900">{item.puntaje}</span>
                          <span className="text-[10px] text-slate-400">/100</span>
                          <div className="text-[10px] text-slate-500 font-semibold">{item.aciertos}/{item.totalPreguntas} aciertos</div>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            item.porcentaje >= 90
                              ? 'bg-emerald-100 text-emerald-800'
                              : item.porcentaje >= 70
                              ? 'bg-teal-100 text-teal-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}>
                            {item.estado}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center text-slate-500 text-[11px]">
                          {new Date(item.fecha).toLocaleDateString('es-CO')}
                          <div className="text-[10px] text-slate-400">{new Date(item.fecha).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}</div>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setActiveDetailEval(item)}
                              title="Auditar respuestas y refuerzo pedagógico"
                              className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl transition-colors font-bold text-xs flex items-center gap-1 cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Respuestas</span>
                            </button>
                            <button
                              onClick={() => setActiveCertEval(item)}
                              title="Ver Constancia Oficial"
                              className="p-1.5 text-slate-500 hover:text-amber-700 hover:bg-amber-50 rounded-xl transition-colors cursor-pointer"
                            >
                              <Award className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => handleDelete(item.id, e)}
                              title="Eliminar del repositorio"
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 3: ANÁLISIS DE PREGUNTAS & DISTRACTORES                            */}
      {/* ========================================================================= */}
      {activeSubTab === 'preguntas' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-1">
              <SlidersHorizontal className="w-5 h-5 text-emerald-600" />
              Auditoría de Casos y Análisis de Distractores
            </h3>
            <p className="text-xs text-slate-600 mb-6">
              Evalúa la efectividad psicométrica de cada pregunta situacional y qué opciones incorrectas son más elegidas por los aprendices.
            </p>

            <div className="space-y-4">
              {questionAnalysisList.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-500">
                  No hay suficientes datos de respuestas para generar el análisis de distractores.
                </div>
              ) : (
                questionAnalysisList.map((item, idx) => {
                  const accuracyPct = Math.round((item.aciertos / item.totalRespuestas) * 100);
                  return (
                    <div key={item.preguntaId} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold">
                            {idx + 1}
                          </span>
                          <span className="font-bold text-sm text-slate-900">{item.competencia}</span>
                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-slate-200 text-slate-700 rounded-md">
                            {item.categoria}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-slate-500 font-medium">Evaluada: <strong>{item.totalRespuestas}</strong> veces</span>
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                            accuracyPct >= 80 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {accuracyPct}% Acierto
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-700 italic bg-white p-3 rounded-xl border border-slate-200">
                        "{item.preguntaTexto}"
                      </p>

                      {/* Options frequency breakdown */}
                      <div>
                        <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-2">
                          Distribución de Elecciones por Opción:
                        </span>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {['A', 'B', 'C', 'D'].map(optKey => {
                            const count = item.opcionesSeleccionadas[optKey] || 0;
                            const pct = item.totalRespuestas > 0 ? Math.round((count / item.totalRespuestas) * 100) : 0;
                            return (
                              <div key={optKey} className="p-2.5 bg-white rounded-xl border border-slate-200 text-xs flex items-center justify-between">
                                <span className="font-bold font-mono">Opción {optKey}</span>
                                <span className="text-slate-600 font-semibold">{count} ({pct}%)</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 4: INFORMES & EXPORTACIÓN                                         */}
      {/* ========================================================================= */}
      {activeSubTab === 'exportar' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                  <FileSpreadsheet className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Informe en Hoja de Cálculo (CSV)</h3>
                <p className="text-xs text-slate-600 mt-1">
                  Exporta la planilla con documento, ficha, puntajes, fecha y estado de aprobación de todos los aprendices.
                </p>
              </div>
              <a
                href="/api/evaluaciones/export/csv"
                download="SENA_Informe_Induccion.csv"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Descargar Archivo CSV</span>
              </a>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center mb-3">
                  <FileCode className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Base de Datos Estructurada (JSON)</h3>
                <p className="text-xs text-slate-600 mt-1">
                  Copia de seguridad con el desglose íntegro de respuestas, preguntas situacionales y tiempos de ejecución.
                </p>
              </div>
              <button
                onClick={handleExportJson}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Descargar Base JSON</span>
              </button>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-800 flex items-center justify-center mb-3">
                  <RefreshCw className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Datos Demo & Restauración</h3>
                <p className="text-xs text-slate-600 mt-1">
                  Restaura los registros base de muestra o genera nuevas simulaciones para capacitación de instructores.
                </p>
              </div>
              <button
                onClick={handleSeedData}
                className="w-full py-3 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Restaurar Registros Demo</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DETAIL MODAL: AUDITORÍA DE RESPUESTAS DEL APRENDIZ                        */}
      {/* ========================================================================= */}
      {activeDetailEval && (
        <div className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden relative my-8 max-h-[90vh] flex flex-col">
            <div className="p-5 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-emerald-400 font-mono">{activeDetailEval.id}</span>
                  <h3 className="text-base font-bold font-display">
                    Auditoría de Respuestas · {activeDetailEval.aprendiz.nombres} {activeDetailEval.aprendiz.apellidos}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setActiveDetailEval(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              {/* Profile summary card */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Documento</span>
                  <p className="font-semibold text-slate-800">{activeDetailEval.aprendiz.tipoDocumento} {activeDetailEval.aprendiz.numeroDocumento}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Ficha</span>
                  <p className="font-bold text-emerald-800">{activeDetailEval.aprendiz.numeroFicha}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Calificación</span>
                  <p className="font-black text-slate-900">{activeDetailEval.puntaje}/100 ({activeDetailEval.estado})</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Tiempo</span>
                  <p className="font-semibold text-slate-700">{Math.round(activeDetailEval.tiempoSegundos / 60)}m {activeDetailEval.tiempoSegundos % 60}s</p>
                </div>
                <div className="col-span-2">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Programa</span>
                  <p className="font-semibold text-slate-700">{activeDetailEval.aprendiz.programa}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Regional / Centro</span>
                  <p className="font-semibold text-slate-700">{activeDetailEval.aprendiz.regional} · {activeDetailEval.aprendiz.centroFormacion}</p>
                </div>
              </div>

              <h4 className="font-bold text-slate-900 pt-2 border-t border-slate-100 flex items-center justify-between">
                <span>Desglose de Casos Evaluados ({activeDetailEval.respuestas?.length || 0})</span>
                <span className="text-[11px] font-semibold text-emerald-700">
                  {activeDetailEval.aciertos} aciertos · {activeDetailEval.errores} errores
                </span>
              </h4>

              {activeDetailEval.respuestas?.map((resp, idx) => (
                <div 
                  key={idx} 
                  className={`p-4 rounded-2xl border ${
                    resp.esCorrecta ? 'bg-emerald-50/60 border-emerald-300' : 'bg-rose-50/70 border-rose-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-slate-900 flex items-center gap-2">
                      {resp.esCorrecta ? (
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      )}
                      Caso #{idx + 1} · {resp.competencia}
                    </span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700">
                      {resp.categoria}
                    </span>
                  </div>

                  <p className="text-slate-800 mb-2 italic bg-white/70 p-2.5 rounded-xl border border-slate-200">
                    "{resp.preguntaTexto}"
                  </p>
                  
                  <div className="text-[11px] space-y-1.5 pt-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-700">Opción Marcada:</span>
                      <span className={`font-mono font-bold px-2 py-0.5 rounded ${
                        resp.esCorrecta ? 'bg-emerald-200 text-emerald-950' : 'bg-rose-200 text-rose-950'
                      }`}>
                        Opción {resp.opcionSeleccionada}
                      </span>
                      <span className={`text-[10px] font-bold uppercase ${resp.esCorrecta ? 'text-emerald-800' : 'text-rose-800'}`}>
                        {resp.esCorrecta ? '✔ Correcta' : '✖ Incorrecta'}
                      </span>
                    </div>
                    <div className="text-slate-700 bg-white/90 p-2.5 rounded-xl border border-slate-200">
                      <strong className="text-slate-900">Fundamento & Refuerzo Pedagógico:</strong> {resp.retroalimentacion}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-mono">{activeDetailEval.id}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const ev = activeDetailEval;
                    setActiveDetailEval(null);
                    setActiveCertEval(ev);
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer text-xs shadow-sm"
                >
                  <Award className="w-4 h-4 text-amber-300" />
                  <span>Ver Constancia Oficial</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CERTIFICATE MODAL */}
      {activeCertEval && (
        <CertificadoModal
          evaluacion={activeCertEval}
          onClose={() => setActiveCertEval(null)}
        />
      )}
    </div>
  );
}
