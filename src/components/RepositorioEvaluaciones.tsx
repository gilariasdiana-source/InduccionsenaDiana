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
  GraduationCap
} from 'lucide-react';
import { EvaluacionRegistro, RepositoryStats } from '../types/evaluacion';
import CertificadoModal from './CertificadoModal';

interface RepositorioEvaluacionesProps {
  onStartNewEvaluation: () => void;
}

export default function RepositorioEvaluaciones({ onStartNewEvaluation }: RepositorioEvaluacionesProps) {
  const [evaluaciones, setEvaluaciones] = useState<EvaluacionRegistro[]>([]);
  const [stats, setStats] = useState<RepositoryStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
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
    if (!confirm('¿Estás seguro de eliminar este registro del repositorio?')) return;
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

  // Get unique fichas and regionales for filter dropdowns
  const uniqueFichas = Array.from(new Set(evaluaciones.map(e => e.aprendiz.numeroFicha).filter(Boolean)));
  const uniqueRegionales = Array.from(new Set(evaluaciones.map(e => e.aprendiz.regional).filter(Boolean)));

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-linear-to-r from-emerald-900 via-emerald-800 to-teal-900 rounded-3xl p-6 md:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Database className="w-3.5 h-3.5" />
              Repositorio Institucional de Evaluaciones · SENA
            </div>
            <h1 className="text-2xl md:text-3xl font-bold font-display text-white">
              Registro y Trazabilidad de Evaluaciones
            </h1>
            <p className="mt-2 text-emerald-100 text-xs md:text-sm leading-relaxed">
              Consolidado oficial de respuestas, calificaciones y refuerzo pedagógico del Acuerdo No. 0009 de 2024. Permite el seguimiento por ficha, regional y la emisión de constancias formativas.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onStartNewEvaluation}
              className="px-4 py-2.5 bg-white hover:bg-emerald-50 text-emerald-900 text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Evaluar Nuevo Aprendiz</span>
            </button>
            <a
              href="/api/evaluaciones/export/csv"
              download="SENA_Repositorio_Evaluaciones.csv"
              className="px-3.5 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl border border-emerald-600/50 transition-all flex items-center gap-2 cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-300" />
              <span>Exportar CSV</span>
            </a>
            <button
              onClick={handleExportJson}
              className="px-3.5 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl border border-emerald-600/50 transition-all flex items-center gap-2 cursor-pointer"
            >
              <FileCode className="w-4 h-4 text-emerald-300" />
              <span>Exportar JSON</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Aprendices Evaluados</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-black text-slate-900 font-display">{stats.total}</span>
              <span className="text-xs text-emerald-700 font-medium ml-2">registros en servidor</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tasa de Aprobación</span>
              <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center">
                <CheckCircle className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-black text-slate-900 font-display">{stats.tasaAprobacion}%</span>
              <span className="text-xs text-slate-500 font-medium ml-2">({stats.aprobados} de {stats.total})</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Promedio de Puntaje</span>
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-black text-slate-900 font-display">{stats.promedioPuntaje}/100</span>
              <span className="text-xs text-amber-700 font-medium ml-2">media grupal</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Fichas Activas</span>
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
                <GraduationCap className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-black text-slate-900 font-display">{Object.keys(stats.distribucionFichas).length}</span>
              <span className="text-xs text-blue-700 font-medium ml-2">grupos formados</span>
            </div>
          </div>
        </div>
      )}

      {/* Pedagogical Diagnosis Bar */}
      {stats && stats.diagnosticoTematico && stats.diagnosticoTematico.length > 0 && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-600" />
                Diagnóstico de Apropiación Normativa (Aciertos por Competencia)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Identifica qué temáticas del Reglamento requieren mayor énfasis pedagógico durante la inducción.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.diagnosticoTematico.map((diag) => (
              <div key={diag.preguntaId} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-800 truncate pr-2">{diag.competencia}</span>
                  <span className={`font-bold ${diag.porcentajeAcierto >= 80 ? 'text-emerald-700' : 'text-amber-700'}`}>
                    {diag.porcentajeAcierto}%
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mb-2">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      diag.porcentajeAcierto >= 80 ? 'bg-emerald-600' : diag.porcentajeAcierto >= 60 ? 'bg-amber-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${diag.porcentajeAcierto}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>{diag.categoria}</span>
                  {diag.necesitaRefuerzoEnAula && (
                    <span className="text-amber-700 font-medium flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> Requiere Refuerzo
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nombre, documento o ficha..."
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
                <th className="py-3.5 px-4">Regional</th>
                <th className="py-3.5 px-4 text-center">Calificación</th>
                <th className="py-3.5 px-4 text-center">Estado</th>
                <th className="py-3.5 px-4 text-center">Fecha</th>
                <th className="py-3.5 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto text-emerald-600 mb-2" />
                    Cargando repositorio de evaluaciones...
                  </td>
                </tr>
              ) : evaluaciones.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500">
                    <BookOpen className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                    No se encontraron evaluaciones con los filtros seleccionados.
                  </td>
                </tr>
              ) : (
                evaluaciones.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{item.aprendiz.nombres} {item.aprendiz.apellidos}</div>
                      <div className="text-[11px] text-slate-400">{item.aprendiz.correo}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-700">
                      <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 rounded text-slate-600 mr-1 font-sans">{item.aprendiz.tipoDocumento}</span>
                      {item.aprendiz.numeroDocumento}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-emerald-800">Ficha {item.aprendiz.numeroFicha}</div>
                      <div className="text-[11px] text-slate-500 truncate max-w-xs">{item.aprendiz.programa}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      <div>{item.aprendiz.regional}</div>
                      <div className="text-[10px] text-slate-400">{item.aprendiz.jornada}</div>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="font-black text-sm text-slate-900">{item.puntaje}</span>
                      <span className="text-[10px] text-slate-400">/100</span>
                      <div className="text-[10px] text-slate-500">{item.aciertos}/{item.totalPreguntas} aciertos</div>
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
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setActiveDetailEval(item)}
                          title="Ver detalle de respuestas y refuerzo pedagógico"
                          className="p-1.5 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setActiveCertEval(item)}
                          title="Ver y descargar constancia oficial"
                          className="p-1.5 text-slate-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Award className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => handleDelete(item.id, e)}
                          title="Eliminar del repositorio"
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
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

      {/* DETAIL MODAL (Answers & Pedagogical Reinforcement Breakdown) */}
      {activeDetailEval && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden relative my-8 max-h-[90vh] flex flex-col">
            <div className="p-5 bg-emerald-900 text-white flex items-center justify-between border-b border-emerald-800">
              <div>
                <span className="text-xs font-semibold text-emerald-300 font-mono">{activeDetailEval.id}</span>
                <h3 className="text-base font-bold font-display">
                  Detalle de Evaluación · {activeDetailEval.aprendiz.nombres} {activeDetailEval.aprendiz.apellidos}
                </h3>
              </div>
              <button
                onClick={() => setActiveDetailEval(null)}
                className="p-1.5 text-emerald-300 hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              {/* Profile summary */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 grid grid-cols-2 md:grid-cols-3 gap-3">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Documento</span>
                  <p className="font-semibold text-slate-800">{activeDetailEval.aprendiz.tipoDocumento} {activeDetailEval.aprendiz.numeroDocumento}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Ficha</span>
                  <p className="font-semibold text-emerald-800">{activeDetailEval.aprendiz.numeroFicha}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Puntaje</span>
                  <p className="font-bold text-slate-900">{activeDetailEval.puntaje}/100 ({activeDetailEval.estado})</p>
                </div>
                <div className="col-span-2">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Programa</span>
                  <p className="font-semibold text-slate-700">{activeDetailEval.aprendiz.programa}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Regional</span>
                  <p className="font-semibold text-slate-700">{activeDetailEval.aprendiz.regional}</p>
                </div>
              </div>

              <h4 className="font-bold text-slate-900 pt-2 border-t border-slate-100">
                Desglose de Preguntas y Respuestas ({activeDetailEval.respuestas?.length || 0})
              </h4>

              {activeDetailEval.respuestas?.map((resp, idx) => (
                <div 
                  key={idx} 
                  className={`p-4 rounded-2xl border ${
                    resp.esCorrecta ? 'bg-emerald-50/50 border-emerald-200' : 'bg-rose-50/50 border-rose-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-slate-800 flex items-center gap-2">
                      {resp.esCorrecta ? (
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-600" />
                      )}
                      Pregunta #{idx + 1} · {resp.competencia}
                    </span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600">
                      {resp.categoria}
                    </span>
                  </div>

                  <p className="text-slate-700 mb-2 italic">"{resp.preguntaTexto}"</p>
                  
                  <div className="text-[11px] space-y-1">
                    <p className="font-semibold text-slate-900">
                      Opción Seleccionada: <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-300">{resp.opcionSeleccionada}</span>
                    </p>
                    <p className="text-slate-600">
                      <strong>Retroalimentación del Instructor:</strong> {resp.retroalimentacion}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
              <button
                onClick={() => {
                  const ev = activeDetailEval;
                  setActiveDetailEval(null);
                  setActiveCertEval(ev);
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer text-xs"
              >
                <Award className="w-4 h-4" />
                <span>Generar Constancia Oficial</span>
              </button>
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
