import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, 'data');
const REPO_FILE = path.resolve(DATA_DIR, 'evaluaciones.json');

// Ensure data directory and initial storage file exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Seed initial baseline records if repository file does not exist
const initialSeedEvaluaciones = [
  {
    id: "SENA-EVAL-2026-001",
    fecha: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
    aprendiz: {
      tipoDocumento: "CC",
      numeroDocumento: "1023456789",
      nombres: "Carlos Andrés",
      apellidos: "Mendoza Gómez",
      correo: "carlos.mendoza@soy.sena.edu.co",
      telefono: "3104567890",
      regional: "Distrito Capital",
      centroFormacion: "Centro de Electricidad, Electrónica y Telecomunicaciones (CEET)",
      programa: "Análisis y Desarrollo de Software (ADSO)",
      numeroFicha: "2874921",
      jornada: "Diurna",
      tieneFormacionPrevia: true,
      programaPrevio: "Técnico en Sistemas"
    },
    puntaje: 100,
    totalPreguntas: 5,
    aciertos: 5,
    errores: 0,
    porcentaje: 100,
    estado: "Aprobado (Sobresaliente)",
    tiempoSegundos: 145,
    respuestas: [
      {
        preguntaId: "Q-01",
        categoria: "Derechos del Aprendiz",
        competencia: "Derecho a la Formación Integral",
        preguntaTexto: "Durante la segunda semana de formación...",
        opcionSeleccionada: "B",
        esCorrecta: true,
        retroalimentacion: "El aprendiz tiene derecho inalienable a recibir la inducción completa..."
      },
      {
        preguntaId: "Q-02",
        categoria: "Deberes del Aprendiz",
        competencia: "Seguridad y Salud en el Trabajo",
        preguntaTexto: "En un taller de mantenimiento y redes...",
        opcionSeleccionada: "B",
        esCorrecta: true,
        retroalimentacion: "El porte de los Elementos de Protección Personal (EPP) es obligatorio."
      },
      {
        preguntaId: "Q-03",
        categoria: "Debido Proceso",
        competencia: "Garantías y Procedimiento en Comités",
        preguntaTexto: "Andrés fue citado al Comité de Evaluación...",
        opcionSeleccionada: "B",
        esCorrecta: true,
        retroalimentacion: "Citación con mínimo 3 días hábiles de anticipación."
      },
      {
        preguntaId: "Q-04",
        categoria: "Etapa Productiva",
        competencia: "Modalidades y Legalización",
        preguntaTexto: "Mariana culminó su etapa lectiva...",
        opcionSeleccionada: "B",
        esCorrecta: true,
        retroalimentacion: "Modalidad de Proyecto Productivo con Fondo Emprender."
      },
      {
        preguntaId: "Q-05",
        categoria: "Faltas y Sanciones",
        competencia: "Honestidad Académica y Sanciones",
        preguntaTexto: "Durante la entrega del proyecto final...",
        opcionSeleccionada: "B",
        esCorrecta: true,
        retroalimentacion: "Falta grave/gravísima por fraude o plagio académico."
      }
    ]
  },
  {
    id: "SENA-EVAL-2026-002",
    fecha: new Date(Date.now() - 3600000 * 20).toISOString(),
    aprendiz: {
      tipoDocumento: "TI",
      numeroDocumento: "1098765432",
      nombres: "Valentina",
      apellidos: "Ríos Salazar",
      correo: "valentina.rios@soy.sena.edu.co",
      telefono: "3158901234",
      regional: "Antioquia",
      centroFormacion: "Centro de Formación en Diseño, Confección y Moda",
      programa: "Gestión del Talento Humano",
      numeroFicha: "2874922",
      jornada: "Mixta",
      tieneFormacionPrevia: false,
      programaPrevio: ""
    },
    puntaje: 80,
    totalPreguntas: 5,
    aciertos: 4,
    errores: 1,
    porcentaje: 80,
    estado: "Aprobado",
    tiempoSegundos: 190,
    respuestas: [
      {
        preguntaId: "Q-01",
        categoria: "Derechos del Aprendiz",
        competencia: "Derecho a la Formación Integral",
        preguntaTexto: "Durante la segunda semana de formación...",
        opcionSeleccionada: "B",
        esCorrecta: true,
        retroalimentacion: "Correcto."
      },
      {
        preguntaId: "Q-02",
        categoria: "Deberes del Aprendiz",
        competencia: "Seguridad y Salud en el Trabajo",
        preguntaTexto: "En un taller de mantenimiento y redes...",
        opcionSeleccionada: "A",
        esCorrecta: false,
        retroalimentacion: "Refuerzo: Los EPP son obligatorios en todo momento según Art. 8."
      },
      {
        preguntaId: "Q-03",
        categoria: "Debido Proceso",
        competencia: "Garantías y Procedimiento en Comités",
        preguntaTexto: "Andrés fue citado al Comité de Evaluación...",
        opcionSeleccionada: "B",
        esCorrecta: true,
        retroalimentacion: "Correcto."
      },
      {
        preguntaId: "Q-04",
        categoria: "Etapa Productiva",
        competencia: "Modalidades y Legalización",
        preguntaTexto: "Mariana culminó su etapa lectiva...",
        opcionSeleccionada: "B",
        esCorrecta: true,
        retroalimentacion: "Correcto."
      },
      {
        preguntaId: "Q-05",
        categoria: "Faltas y Sanciones",
        competencia: "Honestidad Académica y Sanciones",
        preguntaTexto: "Durante la entrega del proyecto final...",
        opcionSeleccionada: "B",
        esCorrecta: true,
        retroalimentacion: "Correcto."
      }
    ]
  },
  {
    id: "SENA-EVAL-2026-003",
    fecha: new Date(Date.now() - 3600000 * 5).toISOString(),
    aprendiz: {
      tipoDocumento: "CC",
      numeroDocumento: "1019283746",
      nombres: "Diego Alejandro",
      apellidos: "Torres Morales",
      correo: "diego.torres@soy.sena.edu.co",
      telefono: "3201122334",
      regional: "Valle",
      centroFormacion: "Centro de Gestión Tecnológica de Servicios",
      programa: "Animación Digital 3D",
      numeroFicha: "2874923",
      jornada: "Nocturna",
      tieneFormacionPrevia: true,
      programaPrevio: "Técnico en Multimedia"
    },
    puntaje: 100,
    totalPreguntas: 5,
    aciertos: 5,
    errores: 0,
    porcentaje: 100,
    estado: "Aprobado (Sobresaliente)",
    tiempoSegundos: 120,
    respuestas: [
      {
        preguntaId: "Q-01",
        categoria: "Derechos del Aprendiz",
        competencia: "Derecho a la Formación Integral",
        preguntaTexto: "Durante la segunda semana de formación...",
        opcionSeleccionada: "B",
        esCorrecta: true,
        retroalimentacion: "Correcto."
      },
      {
        preguntaId: "Q-02",
        categoria: "Deberes del Aprendiz",
        competencia: "Seguridad y Salud en el Trabajo",
        preguntaTexto: "En un taller de mantenimiento y redes...",
        opcionSeleccionada: "B",
        esCorrecta: true,
        retroalimentacion: "Correcto."
      },
      {
        preguntaId: "Q-03",
        categoria: "Debido Proceso",
        competencia: "Garantías y Procedimiento en Comités",
        preguntaTexto: "Andrés fue citado al Comité de Evaluación...",
        opcionSeleccionada: "B",
        esCorrecta: true,
        retroalimentacion: "Correcto."
      },
      {
        preguntaId: "Q-04",
        categoria: "Etapa Productiva",
        competencia: "Modalidades y Legalización",
        preguntaTexto: "Mariana culminó su etapa lectiva...",
        opcionSeleccionada: "B",
        esCorrecta: true,
        retroalimentacion: "Correcto."
      },
      {
        preguntaId: "Q-05",
        categoria: "Faltas y Sanciones",
        competencia: "Honestidad Académica y Sanciones",
        preguntaTexto: "Durante la entrega del proyecto final...",
        opcionSeleccionada: "B",
        esCorrecta: true,
        retroalimentacion: "Correcto."
      }
    ]
  }
];

if (!fs.existsSync(REPO_FILE)) {
  fs.writeFileSync(REPO_FILE, JSON.stringify(initialSeedEvaluaciones, null, 2), 'utf-8');
}

function readEvaluaciones(): any[] {
  try {
    if (!fs.existsSync(REPO_FILE)) {
      return initialSeedEvaluaciones;
    }
    const raw = fs.readFileSync(REPO_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    console.error('Error reading evaluaciones repository:', error);
    return [];
  }
}

function writeEvaluaciones(data: any[]): boolean {
  try {
    fs.writeFileSync(REPO_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error writing evaluaciones repository:', error);
    return false;
  }
}

async function startServer() {
  const app = express();
  const port = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '10mb' }));

  // ==========================================
  // REPOSITORIO DE EVALUACIONES API ENDPOINTS
  // ==========================================

  // 1. GET /api/evaluaciones - List with filtering
  app.get('/api/evaluaciones', (req, res) => {
    try {
      const { search, ficha, regional, estado } = req.query;
      let records = readEvaluaciones();

      if (search && typeof search === 'string') {
        const q = search.toLowerCase();
        records = records.filter((item: any) =>
          item.aprendiz.nombres.toLowerCase().includes(q) ||
          item.aprendiz.apellidos.toLowerCase().includes(q) ||
          item.aprendiz.numeroDocumento.includes(q) ||
          item.aprendiz.correo.toLowerCase().includes(q) ||
          item.aprendiz.programa.toLowerCase().includes(q) ||
          item.id.toLowerCase().includes(q)
        );
      }

      if (ficha && typeof ficha === 'string' && ficha !== 'todas') {
        records = records.filter((item: any) => item.aprendiz.numeroFicha === ficha);
      }

      if (regional && typeof regional === 'string' && regional !== 'todas') {
        records = records.filter((item: any) => item.aprendiz.regional.toLowerCase() === regional.toLowerCase());
      }

      if (estado && typeof estado === 'string' && estado !== 'todos') {
        if (estado === 'aprobado') {
          records = records.filter((item: any) => item.porcentaje >= 70);
        } else if (estado === 'reprobado') {
          records = records.filter((item: any) => item.porcentaje < 70);
        }
      }

      // Sort newest first
      records.sort((a: any, b: any) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());

      res.json({
        total: records.length,
        evaluaciones: records
      });
    } catch (error: any) {
      console.error('Error in GET /api/evaluaciones:', error);
      res.status(500).json({ error: 'Error al consultar el repositorio de evaluaciones.' });
    }
  });

  // 2. GET /api/evaluaciones/stats/summary - Metrics and pedagogical diagnostic
  app.get('/api/evaluaciones/stats/summary', (req, res) => {
    try {
      const records = readEvaluaciones();
      const total = records.length;

      if (total === 0) {
        return res.json({
          total: 0,
          aprobados: 0,
          reprobados: 0,
          tasaAprobacion: 0,
          promedioPuntaje: 0,
          promedioTiempo: 0,
          distribucionFichas: {},
          distribucionRegionales: {},
          diagnosticoTematico: []
        });
      }

      const aprobados = records.filter((r: any) => r.porcentaje >= 70).length;
      const reprobados = total - aprobados;
      const tasaAprobacion = Math.round((aprobados / total) * 100);
      const totalPuntaje = records.reduce((acc: number, r: any) => acc + (r.puntaje || 0), 0);
      const promedioPuntaje = Math.round(totalPuntaje / total);
      const totalTiempo = records.reduce((acc: number, r: any) => acc + (r.tiempoSegundos || 0), 0);
      const promedioTiempo = Math.round(totalTiempo / total);

      // Fichas & Regionales Breakdown
      const distribucionFichas: Record<string, number> = {};
      const distribucionRegionales: Record<string, number> = {};
      const statsPorPregunta: Record<string, { total: number; aciertos: number; categoria: string; competencia: string }> = {};

      records.forEach((r: any) => {
        const ficha = r.aprendiz?.numeroFicha || 'Sin Ficha';
        distribucionFichas[ficha] = (distribucionFichas[ficha] || 0) + 1;

        const regional = r.aprendiz?.regional || 'Nacional';
        distribucionRegionales[regional] = (distribucionRegionales[regional] || 0) + 1;

        if (Array.isArray(r.respuestas)) {
          r.respuestas.forEach((resp: any) => {
            const pId = resp.preguntaId || 'General';
            if (!statsPorPregunta[pId]) {
              statsPorPregunta[pId] = {
                total: 0,
                aciertos: 0,
                categoria: resp.categoria || 'Normativa',
                competencia: resp.competencia || 'Reglamento'
              };
            }
            statsPorPregunta[pId].total += 1;
            if (resp.esCorrecta) {
              statsPorPregunta[pId].aciertos += 1;
            }
          });
        }
      });

      const diagnosticoTematico = Object.keys(statsPorPregunta).map(pId => {
        const item = statsPorPregunta[pId];
        const porcentajeAcierto = item.total > 0 ? Math.round((item.aciertos / item.total) * 100) : 0;
        return {
          preguntaId: pId,
          categoria: item.categoria,
          competencia: item.competencia,
          totalIntentos: item.total,
          aciertos: item.aciertos,
          porcentajeAcierto,
          necesitaRefuerzoEnAula: porcentajeAcierto < 80
        };
      });

      res.json({
        total,
        aprobados,
        reprobados,
        tasaAprobacion,
        promedioPuntaje,
        promedioTiempo,
        distribucionFichas,
        distribucionRegionales,
        diagnosticoTematico
      });
    } catch (error: any) {
      console.error('Error in GET /api/evaluaciones/stats/summary:', error);
      res.status(500).json({ error: 'Error al calcular estadísticas.' });
    }
  });

  // 3. GET /api/evaluaciones/:id - Single record detail
  app.get('/api/evaluaciones/:id', (req, res) => {
    try {
      const records = readEvaluaciones();
      const found = records.find((item: any) => item.id === req.params.id);
      if (!found) {
        return res.status(404).json({ error: 'Registro de evaluación no encontrado.' });
      }
      res.json(found);
    } catch (error: any) {
      res.status(500).json({ error: 'Error al buscar el registro.' });
    }
  });

  // 4. POST /api/evaluaciones - Save new evaluation
  app.post('/api/evaluaciones', (req, res) => {
    try {
      const { aprendiz, respuestas, tiempoSegundos, puntaje, aciertos, errores, totalPreguntas } = req.body;

      if (!aprendiz || !aprendiz.numeroDocumento || !aprendiz.nombres) {
        return res.status(400).json({ error: 'Los datos básicos del aprendiz son obligatorios.' });
      }

      const records = readEvaluaciones();
      const nextNum = records.length + 1;
      const formattedNum = String(nextNum).padStart(3, '0');
      const year = new Date().getFullYear();
      const id = `SENA-EVAL-${year}-${formattedNum}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

      const calculatedScore = puntaje !== undefined ? puntaje : (aciertos / (totalPreguntas || 5)) * 100;
      const porcentaje = Math.round(calculatedScore);
      let estado = 'Aprobado';
      if (porcentaje >= 90) estado = 'Aprobado (Sobresaliente)';
      else if (porcentaje >= 70) estado = 'Aprobado';
      else estado = 'Por Mejorar (Requiere Refuerzo)';

      const newRecord = {
        id,
        fecha: new Date().toISOString(),
        aprendiz: {
          tipoDocumento: aprendiz.tipoDocumento || 'CC',
          numeroDocumento: aprendiz.numeroDocumento.trim(),
          nombres: aprendiz.nombres.trim(),
          apellidos: (aprendiz.apellidos || '').trim(),
          correo: (aprendiz.correo || '').trim(),
          telefono: (aprendiz.telefono || '').trim(),
          regional: aprendiz.regional || 'Distrito Capital',
          centroFormacion: aprendiz.centroFormacion || 'Centro de Formación SENA',
          programa: aprendiz.programa || 'Formación Titulada SENA',
          numeroFicha: (aprendiz.numeroFicha || '2874900').trim(),
          jornada: aprendiz.jornada || 'Diurna',
          tieneFormacionPrevia: Boolean(aprendiz.tieneFormacionPrevia),
          programaPrevio: (aprendiz.programaPrevio || '').trim()
        },
        puntaje: calculatedScore,
        totalPreguntas: totalPreguntas || 5,
        aciertos: aciertos || 0,
        errores: errores || 0,
        porcentaje,
        estado,
        tiempoSegundos: tiempoSegundos || 0,
        respuestas: respuestas || []
      };

      records.unshift(newRecord);
      writeEvaluaciones(records);

      res.status(201).json({
        success: true,
        message: 'Evaluación registrada exitosamente en el Repositorio Institucional SENA.',
        record: newRecord
      });
    } catch (error: any) {
      console.error('Error in POST /api/evaluaciones:', error);
      res.status(500).json({ error: 'Error al registrar la evaluación en el servidor.' });
    }
  });

  // 5. DELETE /api/evaluaciones/:id - Delete single record
  app.delete('/api/evaluaciones/:id', (req, res) => {
    try {
      const records = readEvaluaciones();
      const filtered = records.filter((r: any) => r.id !== req.params.id);
      if (filtered.length === records.length) {
        return res.status(404).json({ error: 'Registro no encontrado.' });
      }
      writeEvaluaciones(filtered);
      res.json({ success: true, message: 'Registro eliminado del repositorio.' });
    } catch (error: any) {
      res.status(500).json({ error: 'Error al eliminar el registro.' });
    }
  });

  // 6. POST /api/evaluaciones/seed - Seed or reset baseline data
  app.post('/api/evaluaciones/seed', (req, res) => {
    try {
      writeEvaluaciones(initialSeedEvaluaciones);
      res.json({ success: true, message: 'Repositorio restaurado con datos base.', total: initialSeedEvaluaciones.length });
    } catch (error: any) {
      res.status(500).json({ error: 'Error al resetear datos.' });
    }
  });

  // 7. GET /api/evaluaciones/export-csv - Generate CSV for LMS / Sofia Plus
  app.get('/api/evaluaciones/export/csv', (req, res) => {
    try {
      const records = readEvaluaciones();
      const headers = [
        'ID_EVALUACION',
        'FECHA_HORA',
        'TIPO_DOC',
        'NUMERO_DOC',
        'NOMBRES',
        'APELLIDOS',
        'CORREO',
        'TELEFONO',
        'REGIONAL',
        'CENTRO_FORMACION',
        'FICHA',
        'PROGRAMA',
        'JORNADA',
        'FORMACION_PREVIA',
        'PUNTAJE_100',
        'ACIERTOS',
        'ERRORES',
        'ESTADO_APROBACION',
        'TIEMPO_SEGUNDOS'
      ];

      const rows = records.map((r: any) => [
        `"${r.id}"`,
        `"${r.fecha}"`,
        `"${r.aprendiz.tipoDocumento}"`,
        `"${r.aprendiz.numeroDocumento}"`,
        `"${r.aprendiz.nombres}"`,
        `"${r.aprendiz.apellidos}"`,
        `"${r.aprendiz.correo}"`,
        `"${r.aprendiz.telefono}"`,
        `"${r.aprendiz.regional}"`,
        `"${r.aprendiz.centroFormacion.replace(/"/g, '""')}"`,
        `"${r.aprendiz.numeroFicha}"`,
        `"${r.aprendiz.programa.replace(/"/g, '""')}"`,
        `"${r.aprendiz.jornada}"`,
        `"${r.aprendiz.tieneFormacionPrevia ? 'SI' : 'NO'}"`,
        r.puntaje,
        r.aciertos,
        r.errores,
        `"${r.estado}"`,
        r.tiempoSegundos
      ]);

      const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');

      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', 'attachment; filename="SENA_Repositorio_Evaluaciones_Induccion.csv"');
      res.send('\uFEFF' + csvContent);
    } catch (error: any) {
      console.error('Error generating CSV:', error);
      res.status(500).json({ error: 'Error al exportar archivo CSV.' });
    }
  });

  // ==========================================
  // GEMINI AI INSTRUCTOR ASSISTANT
  // ==========================================
  app.post('/api/ask-instructor', async (req, res) => {
    const { prompt, context } = req.body;

    if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
      return res.status(400).json({ error: 'La pregunta o consulta no puede estar vacía.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Helper to generate a contextual normative response when API key is unconfigured or encounters quota issues
    const generateNormativeFallback = (query: string): string => {
      const q = query.toLowerCase();

      if (q.includes('deber') || q.includes('deberes') || q.includes('obligacion')) {
        return `📋 **Deberes Principales del Aprendiz SENA (Acuerdo No. 0009 de 2024 - Capítulo III, Art. 8):**\n\n` +
          `1. **Compromiso Formativo:** Asistir puntualmente a todas las sesiones presenciales o virtuales y entregar oportunamente las evidencias en el LMS (Zajuna/Sofia Plus).\n` +
          `2. **Seguridad y Salud (SST):** Portar de manera obligatoria y adecuada los Elementos de Protección Personal (EPP) y el carné institucional en lugar visible.\n` +
          `3. **Convivencia y Respeto:** Mantener un trato digno, solidario y respetuoso con compañeros, instructores, administrativos y personal de apoyo.\n` +
          `4. **Cuidado de Recursos:** Proteger la infraestructura, equipos, maquinaria y recursos ambientales del Centro de Formación.\n` +
          `5. **Honestidad Académica:** Desarrollar evidencias de autoría propia, rechazando cualquier forma de plagio, suplantación o fraude.`;
      }

      if (q.includes('derecho') || q.includes('derechos') || q.includes('garantia')) {
        return `🛡️ **Derechos Fundamentales del Aprendiz SENA (Acuerdo No. 0009 de 2024 - Capítulo II, Art. 7):**\n\n` +
          `1. **Formación Integral de Calidad:** Recibir inducción completa, acompañamiento pedagógico con instructores idóneos y acceso a la metodología por proyectos.\n` +
          `2. **Acceso a Ambientes y Tecnología:** Utilizar talleres, laboratorios, biblioteca física y digital, plataformas virtuales y conectividad institucional.\n` +
          `3. **Garantía de Debido Proceso:** Derecho a la defensa, presunción de inocencia, notificación formal y recurso de reposición ante decisiones del Comité de Evaluación.\n` +
          `4. **Bienestar al Aprendiz:** Acceso a programas de salud integral, deporte, arte, cultura, apoyos de sostenimiento (FIC/regular) y monitorías académicas.\n` +
          `5. **Representación Estudiantil:** Elegir y ser elegido vocero de ficha o representante de aprendices de centro.`;
      }

      if (q.includes('etapa productiva') || q.includes('contrato') || q.includes('pasantia') || q.includes('practica') || q.includes('fondo emprender')) {
        return `💼 **Modalidades de Etapa Productiva en el SENA (Acuerdo 0009 de 2024):**\n\n` +
          `La etapa productiva permite aplicar y perfeccionar las competencias en el entorno real de trabajo. Las modalidades autorizadas son:\n\n` +
          `• **Contrato de Aprendizaje:** Patrocinio empresarial formal conforme a la Ley 789 de 2002 con cobertura de EPS y ARL.\n` +
          `• **Proyecto Productivo:** Creación y desarrollo de unidad productiva articulada con Fondo Emprender o proyectos de innovación SENNOVA.\n` +
          `• **Pasantía:** Práctica de apoyo en empresas, instituciones públicas u ONG en actividades afines al perfil de egreso.\n` +
          `• **Vínculo Laboral o Contractual:** Validación de funciones si el aprendiz ya labora en un cargo directamente relacionado con su programa.\n` +
          `• **Monitoría:** Apoyo técnico y pedagógico en laboratorios y ambientes especializados del Centro de Formación.\n\n` +
          `*Importante:* Se deben registrar y concertar bitácoras quincenales/mensuales evaluadas por el instructor de seguimiento asignado.`;
      }

      if (q.includes('comite') || q.includes('debido proceso') || q.includes('sancion') || q.includes('falta') || q.includes('descargo')) {
        return `⚖️ **Debido Proceso y Comité de Evaluación y Seguimiento (Acuerdo 0009 de 2024):**\n\n` +
          `1. **Citación Formal:** El aprendiz debe ser citado por escrito con mínimo 3 días hábiles de anticipación, indicando las causales y pruebas.\n` +
          `2. **Audiencia y Descargos:** El aprendiz tiene derecho a ser escuchado, presentar pruebas, controvertir los reportes y contar con acompañamiento del vocero o acudiente (si es menor de edad).\n` +
          `3. **Clasificación de Faltas:**\n` +
          `   - *Leves:* Incumplimientos menores que ameritan llamado de atención por escrito y plan de mejoramiento.\n` +
          `   - *Graves:* Daños a infraestructura, agresiones verbales o fraude académico.\n` +
          `   - *Gravísimas:* Falsificación de documentos, suplantación, porte de armas o sustancias psicoactivas.\n` +
          `4. **Recurso de Reposición:** Frente a la resolución sancionatoria del Subdirector de Centro, procede el recurso de reposición dentro de los 5 días hábiles siguientes a la notificación.`;
      }

      if (q.includes('desercion') || q.includes('inasistencia') || q.includes('falta de asistencia') || q.includes('3 dias')) {
        return `⚠️ **Causales de Deserción en el SENA (Acuerdo 0009 de 2024):**\n\n` +
          `Se configura deserción del proceso formativo en los siguientes casos:\n\n` +
          `1. Cuando el aprendiz injustificadamente no se presenta por **tres (3) días hábiles consecutivos** a las actividades formativas.\n` +
          `2. Cuando al terminar el periodo de aplazamiento autorizado, el aprendiz no se reincorpora al programa.\n` +
          `3. Cuando transcurridos dos (2) años a partir de la terminación de la etapa lectiva, el aprendiz no ha radicado ni legalizado su etapa productiva.\n\n` +
          `*Procedimiento:* El instructor reporta la novedad; la coordinación envía citación al aprendiz para que en 5 días hábiles justifique su ausencia con soportes válidos (incapacidad médica EPS/fuerza mayor). Si no responde o no justifica, se expide acto de cancelación de matrícula.`;
      }

      if (q.includes('homologacion') || q.includes('rap') || q.includes('previo') || q.includes('articulacion') || q.includes('tecnico a tecnologo')) {
        return `🎓 **Homologación y Reconocimiento de Aprendizajes Previos (RAP):**\n\n` +
          `El SENA promueve la cadena de formación técnica y profesional:\n\n` +
          `• **Articulación y Técnicos SENA:** Los egresados técnicos que ingresan al tecnólogo homólogo pueden solicitar el reconocimiento de competencias transversales y técnicas comunes, reduciendo la duración de la etapa lectiva.\n` +
          `• **Reconocimiento de Aprendizajes Previos (RAP):** Quienes posean experiencia laboral demostrable o certificados de formación afín pueden sustentar evidencias ante un evaluador de competencias para aprobar resultados de aprendizaje.\n` +
          `• **Trámite:** Se solicita formalmente ante la Coordinación Académica durante las dos primeras semanas de inicio de ficha adjuntando certificados y diseño curricular.`;
      }

      return `🏛️ **Orientación Normativa del Instructor SENA (Acuerdo No. 0009 de 2024):**\n\n` +
        `Respecto a tu consulta sobre "*${query}*":\n\n` +
        `En el marco del Reglamento del Aprendiz SENA, todas las actividades académicas, convivenciales y de etapa productiva se fundamentan en los principios de **Dignidad Humana, Formación Profesional Integral, Debido Proceso y Diálogo Pedagógico**.\n\n` +
        `• **Canales institucionales:** Consulta siempre con tu instructor técnico, tu vocero de ficha o la Coordinación Académica de tu Centro de Formación.\n` +
        `• **Plataformas oficiales:** Mantén al día tus evidencias en Zajuna / Sofia Plus y revisa las circulares oficiales de la Dirección de Formación Profesional.\n\n` +
        `¿Deseas profundizar sobre deberes, derechos específicos, modalidades de etapa productiva o el procedimiento de comités de evaluación?`;
    };

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({
          apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            }
          }
        });

        const systemInstruction = `Eres el Asistente Virtual Oficial e Instructor Pedagógico del Servicio Nacional de Aprendizaje (SENA).
Tu labor es orientar de manera experta, rigurosa, pedagógica y cálida a aprendices, instructores y coordinadores sobre el Reglamento del Aprendiz (Acuerdo No. 0009 de 2024), el proceso de inducción a la formación titulada, derechos, deberes, prohibiciones, etapa productiva, debido proceso, comités de evaluación, deserción y homologación (RAP).
Reglas de respuesta:
1. Responde siempre con estructura clara, usando viñetas, títulos en negrita y lenguaje accesible pero con rigor normativo.
2. Cita los artículos o principios pertinentes del Acuerdo 0009 de 2024 cuando aplique.
3. Mantén una actitud de acompañamiento integral al aprendiz y excelencia formativa.`;

        const chatPrompt = `${context ? `Contexto Institucional: ${context}\n\n` : ''}Pregunta del usuario: ${prompt}`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: chatPrompt,
          config: {
            systemInstruction,
            temperature: 0.7,
          }
        });

        const replyText = response.text;
        if (replyText && replyText.trim().length > 0) {
          return res.json({ reply: replyText });
        }
      } catch (geminiError: any) {
        console.warn('Gemini API call encountered an issue, falling back to SENA normative engine:', geminiError?.message || geminiError);
        // Fall back seamlessly to built-in comprehensive normative engine
        const fallbackText = generateNormativeFallback(prompt);
        return res.json({ reply: fallbackText });
      }
    }

    // If no API key configured in environment, use local comprehensive normative database
    const localReply = generateNormativeFallback(prompt);
    res.json({ reply: localReply });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor SENA Inducción corriendo en http://localhost:${port}`);
  });
}

startServer();
