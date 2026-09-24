import React, { useState, useEffect } from 'react';
import { UserCheck, Sparkles, BookOpen, Shield, ChevronRight, CheckCircle2, Building2, GraduationCap, School, MapPin } from 'lucide-react';
import { AprendizPerfil } from '../types/evaluacion';
import { SENA_REGIONALES_CENTROS_PROGRAMAS } from '../data/senaCentrosYProgramas';

interface RegistroAprendizProps {
  initialData?: AprendizPerfil;
  onStartEvaluation: (perfil: AprendizPerfil) => void;
}

export default function RegistroAprendiz({ initialData, onStartEvaluation }: RegistroAprendizProps) {
  const [formData, setFormData] = useState<AprendizPerfil>(() => {
    const saved = localStorage.getItem('sena_aprendiz_activo');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return initialData || {
      tipoDocumento: 'CC',
      numeroDocumento: '',
      nombres: '',
      apellidos: '',
      correo: '',
      telefono: '',
      regional: 'Distrito Capital',
      centroFormacion: 'Centro de Electricidad, Electrónica y Telecomunicaciones (CEET)',
      programa: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
      numeroFicha: '2874925',
      jornada: 'Diurna',
      tieneFormacionPrevia: false,
      programaPrevio: ''
    };
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCustomProgram, setIsCustomProgram] = useState(false);

  // Get current regional data
  const currentRegionalData = SENA_REGIONALES_CENTROS_PROGRAMAS.find(
    r => r.regional.toLowerCase() === formData.regional.toLowerCase()
  ) || SENA_REGIONALES_CENTROS_PROGRAMAS[0];

  // Get current center data
  const currentCentro = currentRegionalData.centros.find(
    c => c.nombre.toLowerCase() === formData.centroFormacion.toLowerCase()
  ) || currentRegionalData.centros[0];

  // Available programs for current selected center
  const availablePrograms = currentCentro ? currentCentro.programas : [];

  const handleRegionalChange = (newRegional: string) => {
    const regData = SENA_REGIONALES_CENTROS_PROGRAMAS.find(r => r.regional === newRegional);
    if (regData && regData.centros.length > 0) {
      const firstCentro = regData.centros[0];
      const firstProgram = firstCentro.programas[0] || '';
      setFormData(prev => ({
        ...prev,
        regional: newRegional,
        centroFormacion: firstCentro.nombre,
        programa: firstProgram
      }));
      setIsCustomProgram(false);
    } else {
      setFormData(prev => ({ ...prev, regional: newRegional }));
    }
  };

  const handleCentroChange = (newCentroNombre: string) => {
    const foundCentro = currentRegionalData.centros.find(c => c.nombre === newCentroNombre);
    if (foundCentro && foundCentro.programas.length > 0) {
      setFormData(prev => ({
        ...prev,
        centroFormacion: newCentroNombre,
        programa: foundCentro.programas[0]
      }));
      setIsCustomProgram(false);
    } else {
      setFormData(prev => ({
        ...prev,
        centroFormacion: newCentroNombre
      }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.numeroDocumento.trim()) newErrors.numeroDocumento = 'El número de documento es obligatorio';
    if (!formData.nombres.trim()) newErrors.nombres = 'Los nombres son obligatorios';
    if (!formData.apellidos.trim()) newErrors.apellidos = 'Los apellidos son obligatorios';
    if (!formData.correo.trim()) newErrors.correo = 'El correo electrónico es obligatorio';
    if (!formData.numeroFicha.trim()) newErrors.numeroFicha = 'El número de ficha es obligatorio';
    if (!formData.programa.trim()) newErrors.programa = 'El programa de formación es obligatorio';
    if (!formData.centroFormacion.trim()) newErrors.centroFormacion = 'El centro de formación es obligatorio';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      localStorage.setItem('sena_aprendiz_activo', JSON.stringify(formData));
      onStartEvaluation(formData);
    }
  };

  const handleFillDemo = () => {
    const defaultReg = SENA_REGIONALES_CENTROS_PROGRAMAS[0];
    const defaultCent = defaultReg.centros[0];
    const demoPerfil: AprendizPerfil = {
      tipoDocumento: 'CC',
      numeroDocumento: '1098' + Math.floor(100000 + Math.random() * 900000),
      nombres: 'Laura Sofía',
      apellidos: 'Ramírez Castro',
      correo: 'laura.ramirez@soy.sena.edu.co',
      telefono: '312' + Math.floor(1000000 + Math.random() * 9000000),
      regional: defaultReg.regional,
      centroFormacion: defaultCent.nombre,
      programa: defaultCent.programas[0],
      numeroFicha: '2874930',
      jornada: 'Diurna',
      tieneFormacionPrevia: true,
      programaPrevio: 'Técnico en Programación de Software'
    };
    setFormData(demoPerfil);
    setIsCustomProgram(false);
    setErrors({});
  };

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn">
      {/* Step Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-emerald-900 text-white p-6 rounded-3xl shadow-sm border border-emerald-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-800/80 rounded-full text-emerald-300 text-xs font-semibold mb-2">
            <UserCheck className="w-3.5 h-3.5" />
            Paso 1 de 2 · Caracterización y Registro
          </div>
          <h2 className="text-xl md:text-2xl font-bold font-display">
            Datos Básicos del Aprendiz
          </h2>
          <p className="text-emerald-200 text-xs md:text-sm mt-1">
            Selecciona tu Regional, Centro de Formación y Programa de Formación Titulada oficial del SENA antes de presentar la evaluación del Acuerdo No. 0009 de 2024.
          </p>
        </div>
        <button
          type="button"
          onClick={handleFillDemo}
          className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-emerald-100 text-xs font-bold rounded-xl transition-all cursor-pointer shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          ⚡ Autocompletar Demo
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
        
        {/* Identificación Personal */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold">1</span>
            Identificación Personal
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Tipo de Documento *</label>
              <select
                value={formData.tipoDocumento}
                onChange={(e) => setFormData({ ...formData, tipoDocumento: e.target.value })}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
              >
                <option value="CC">Cédula de Ciudadanía (CC)</option>
                <option value="TI">Tarjeta de Identidad (TI)</option>
                <option value="CE">Cédula de Extranjería (CE)</option>
                <option value="PPT">Permiso por Protección Temporal (PPT)</option>
                <option value="PEP">Permiso Especial de Permanencia (PEP)</option>
                <option value="PAS">Pasaporte</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Número de Documento *</label>
              <input
                type="text"
                value={formData.numeroDocumento}
                onChange={(e) => setFormData({ ...formData, numeroDocumento: e.target.value })}
                placeholder="Ej. 1023456789"
                className={`w-full text-xs bg-slate-50 border rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 ${errors.numeroDocumento ? 'border-rose-500 ring-rose-500/20' : 'border-slate-300 focus:border-emerald-600 focus:ring-emerald-500/20'}`}
              />
              {errors.numeroDocumento && <p className="text-[11px] text-rose-600 mt-1">{errors.numeroDocumento}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Nombres Completos *</label>
              <input
                type="text"
                value={formData.nombres}
                onChange={(e) => setFormData({ ...formData, nombres: e.target.value })}
                placeholder="Ej. Juan Camilo"
                className={`w-full text-xs bg-slate-50 border rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 ${errors.nombres ? 'border-rose-500 ring-rose-500/20' : 'border-slate-300 focus:border-emerald-600 focus:ring-emerald-500/20'}`}
              />
              {errors.nombres && <p className="text-[11px] text-rose-600 mt-1">{errors.nombres}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Apellidos Completos *</label>
              <input
                type="text"
                value={formData.apellidos}
                onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
                placeholder="Ej. Gómez Pérez"
                className={`w-full text-xs bg-slate-50 border rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 ${errors.apellidos ? 'border-rose-500 ring-rose-500/20' : 'border-slate-300 focus:border-emerald-600 focus:ring-emerald-500/20'}`}
              />
              {errors.apellidos && <p className="text-[11px] text-rose-600 mt-1">{errors.apellidos}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Correo Electrónico *</label>
              <input
                type="email"
                value={formData.correo}
                onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                placeholder="aprendiz@soy.sena.edu.co"
                className={`w-full text-xs bg-slate-50 border rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 ${errors.correo ? 'border-rose-500 ring-rose-500/20' : 'border-slate-300 focus:border-emerald-600 focus:ring-emerald-500/20'}`}
              />
              {errors.correo && <p className="text-[11px] text-rose-600 mt-1">{errors.correo}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Teléfono / WhatsApp</label>
              <input
                type="tel"
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                placeholder="Ej. 3101234567"
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
              />
            </div>
          </div>
        </div>

        {/* Ubicación Institucional SENA (Regional -> Centro -> Programa) */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold">2</span>
            Regional, Centro de Formación y Programa SENA
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. Regional SENA */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                Regional SENA *
              </label>
              <select
                value={formData.regional}
                onChange={(e) => handleRegionalChange(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 font-medium"
              >
                {SENA_REGIONALES_CENTROS_PROGRAMAS.map((reg) => (
                  <option key={reg.regional} value={reg.regional}>
                    Regional {reg.regional} ({reg.centros.length} centro{reg.centros.length > 1 ? 's' : ''})
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Centro de Formación de la Regional */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                Centro de Formación *
              </label>
              <select
                value={formData.centroFormacion}
                onChange={(e) => handleCentroChange(e.target.value)}
                className={`w-full text-xs bg-slate-50 border rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 ${errors.centroFormacion ? 'border-rose-500 ring-rose-500/20' : 'border-slate-300 focus:border-emerald-600 focus:ring-emerald-500/20'} font-medium`}
              >
                {currentRegionalData.centros.map((centro) => (
                  <option key={centro.id} value={centro.nombre}>
                    {centro.nombre} - {centro.municipio}
                  </option>
                ))}
              </select>
              {errors.centroFormacion && <p className="text-[11px] text-rose-600 mt-1">{errors.centroFormacion}</p>}
            </div>
          </div>

          {/* 3. Programa de Formación Titulada de ese Centro */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                Programa de Formación Titulada ({currentCentro?.nombre ? 'Oferta del Centro' : ''}) *
              </label>
              <button
                type="button"
                onClick={() => setIsCustomProgram(!isCustomProgram)}
                className="text-[11px] text-emerald-700 hover:text-emerald-900 font-semibold cursor-pointer underline"
              >
                {isCustomProgram ? '← Seleccionar de la lista oficial' : '✍️ Escribir otro programa'}
              </button>
            </div>

            {!isCustomProgram ? (
              <select
                value={formData.programa}
                onChange={(e) => setFormData({ ...formData, programa: e.target.value })}
                className={`w-full text-xs bg-slate-50 border rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 ${errors.programa ? 'border-rose-500 ring-rose-500/20' : 'border-slate-300 focus:border-emerald-600 focus:ring-emerald-500/20'} font-medium`}
              >
                {availablePrograms.map((prog) => (
                  <option key={prog} value={prog}>
                    {prog}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={formData.programa}
                onChange={(e) => setFormData({ ...formData, programa: e.target.value })}
                placeholder="Ej. Tecnólogo en Gestión de la Producción Industrial"
                className={`w-full text-xs bg-slate-50 border rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 ${errors.programa ? 'border-rose-500 ring-rose-500/20' : 'border-slate-300 focus:border-emerald-600 focus:ring-emerald-500/20'}`}
              />
            )}
            {errors.programa && <p className="text-[11px] text-rose-600 mt-1">{errors.programa}</p>}
            <p className="text-[11px] text-slate-500 mt-1">
              🏫 {currentCentro?.nombre} ({currentCentro?.municipio}) cuenta con {availablePrograms.length} programas de formación titulada registrados.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Número de Ficha de Caracterización *</label>
              <input
                type="text"
                value={formData.numeroFicha}
                onChange={(e) => setFormData({ ...formData, numeroFicha: e.target.value })}
                placeholder="Ej. 2874921"
                className={`w-full text-xs bg-slate-50 border rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 ${errors.numeroFicha ? 'border-rose-500 ring-rose-500/20' : 'border-slate-300 focus:border-emerald-600 focus:ring-emerald-500/20'}`}
              />
              {errors.numeroFicha && <p className="text-[11px] text-rose-600 mt-1">{errors.numeroFicha}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Jornada de Formación</label>
              <div className="grid grid-cols-5 gap-1.5">
                {['Diurna', 'Nocturna', 'Mixta', 'Madrugada', 'Virtual'].map((j) => (
                  <button
                    type="button"
                    key={j}
                    onClick={() => setFormData({ ...formData, jornada: j })}
                    className={`py-2 px-1 text-[11px] font-semibold rounded-xl border transition-all cursor-pointer text-center truncate ${
                      formData.jornada === j
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-800 ring-2 ring-emerald-500/20 font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {j}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Antecedentes Formativos (Homologación) */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2 mb-3 pb-2 border-b border-slate-100">
            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold">3</span>
            Antecedentes Formativos SENA
          </h3>
          
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="formacionPrevia"
                checked={formData.tieneFormacionPrevia}
                onChange={(e) => setFormData({ ...formData, tieneFormacionPrevia: e.target.checked })}
                className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
              />
              <label htmlFor="formacionPrevia" className="text-xs font-medium text-slate-800 cursor-pointer">
                ¿Ha cursado previamente alguna formación titulada en el SENA? (Técnico, Tecnólogo, Operario)
              </label>
            </div>

            {formData.tieneFormacionPrevia && (
              <div className="mt-3 pl-7">
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nombre del programa previo cursado en el SENA:</label>
                <input
                  type="text"
                  value={formData.programaPrevio || ''}
                  onChange={(e) => setFormData({ ...formData, programaPrevio: e.target.value })}
                  placeholder="Ej. Técnico en Sistemas o Técnico en Contabilidad"
                  className="w-full text-xs bg-white border border-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  💡 Esta información se utilizará para orientar el proceso de Reconocimiento de Aprendizajes Previos (RAP) y homologación de competencias transversales.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-emerald-600" />
            Tus datos se almacenan de manera segura en el Repositorio de Inducción.
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:shadow-lg active:scale-98"
          >
            <span>Guardar y Continuar a la Evaluación</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
