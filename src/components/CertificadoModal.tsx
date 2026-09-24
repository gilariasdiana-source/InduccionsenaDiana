import React from 'react';
import { Award, CheckCircle, Download, Printer, X, ShieldCheck, QrCode } from 'lucide-react';
import { EvaluacionRegistro } from '../types/evaluacion';

interface CertificadoModalProps {
  evaluacion: EvaluacionRegistro;
  onClose: () => void;
}

export default function CertificadoModal({ evaluacion, onClose }: CertificadoModalProps) {
  const handlePrint = () => {
    window.print();
  };

  const formattedDate = new Date(evaluacion.fecha).toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden relative my-8">
        
        {/* Modal Actions Bar (hidden in print) */}
        <div className="flex items-center justify-between p-4 bg-slate-900 text-white border-b border-slate-800 print:hidden">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-sm">Constancia Oficial de Aprobación de Inducción</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / Guardar PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Content */}
        <div className="p-8 md:p-12 text-slate-800 bg-linear-to-b from-emerald-50/40 via-white to-slate-50 border-8 border-double border-emerald-800/20 m-4 rounded-2xl relative">
          
          {/* Header Logos */}
          <div className="flex items-center justify-between border-b-2 border-emerald-600/30 pb-6 mb-6">
            <div className="flex items-center gap-3">
              <img 
                src="data:image/svg+xml,%3c?xml%20version=%271.0%27%20encoding=%27utf-8%27?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2026.0.1,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3csvg%20version=%271.1%27%20id=%27Capa_1%27%20xmlns=%27http://www.w3.org/2000/svg%27%20xmlns:xlink=%27http://www.w3.org/1999/xlink%27%20x=%270px%27%20y=%270px%27%20viewBox=%270%200%201000%201000%27%20style=%27enable-background:new%200%200%201000%201000;%27%20xml:space=%27preserve%27%3e%3cstyle%20type=%27text/css%27%3e%20.st0{fill:%2339a900;}%20%3c/style%3e%3cpath%20id=%27path47-5%27%20class=%27st0%27%20d=%27M504.2,20.5c-58.3,0.1-105.6,47.4-105.5,105.8c0.1,58.3,47.4,105.6,105.7,105.6%20c58.3,0,105.6-47.3,105.6-105.7V126C609.9,67.6,562.6,20.4,504.2,20.5z%20M155.6,264.6c-18.6,0.1-37.5,1.1-55.2,5.6%20c-11.7,3-23,7.8-30.3,15.4c-9.2,9.5-10.4,22.3-5.9,33.3c4,9.7,14.8,16.9,26.8,21.1c25.9,8.9,54.6,10.7,81.8,16.3%20c5,1.2,10.6,2.6,13.7,6c3.2,4.1,1.3,9.7-4,12.2c-8.8,4.5-20.1,4.5-30.4,4.4c-9.4-0.4-19.7-1.2-27.2-5.9c-5.5-3.4-6.5-9.1-5.2-14.1%20l-60.6,0c-0.2,9.2,1.6,18.9,8.4,26.8c5.6,6.8,14.8,11.5,24.6,14.4c15.7,4.6,32.7,6,49.4,6.4c22.7,0.4,45.8-0.3,67.6-5.4%20c13-3.2,25.8-8.3,34.1-16.6c14.8-14.8,11.3-38.3-8.3-49.8c-9.8-5.7-21.5-9.2-33.4-11.5c-17.5-3.6-35.3-6.3-52.9-9.2%20c-6.2-1.2-12.8-2.3-18-5.2c-5.5-2.9-5.9-9.8-0.3-12.9c7.2-4.1,16.8-4,25.4-4c9.1,0.2,19,0.7,26.5,5c4.2,2.3,5.9,6.3,5.9,10.1%20l57.6-0.1c-0.2-7.3-1.6-14.9-6.9-21.2c-6.2-7.8-17.1-12.7-28.3-15.5C192.8,265.6,174.1,264.7,155.6,264.6L155.6,264.6z%20M280.6,268.9%20l0,137.7l168.1,0l0-30H342.3v-26.7h94.9v-29.3h-94.9l0-21.9l102.6,0l-0.1-29.7L280.6,268.9z%20M557.5,269c0,0-51.9,0-77.9,0l0,137.7%20l59,0l0-92.7l80.8,92.6l81,0.1l0-137.7l-59.1,0l0.1,92L557.5,269z%20M805.6,269.2c0,0-63.6,91.9-95.6,137.7l61.9,0l14.9-24.8h95.7%20l13.9,24.9l68.8,0L874,269.2L805.6,269.2z%20M836.6,302.1l29.4,49.9l-60.7,0.1L836.6,302.1z%20M10.6,445.6l0.5,75l280.1-1%20c14.3,3.1,22.6,12.4,19.7,33.5L138.6,854.7l56.1,52.5l266.9-461.6L10.6,445.6z%20M545.2,446.2l262.4,459.6l58-52.1L691.3,552.9%20c-2.9-21.2,5.4-30.6,19.7-33.7l280.2,1l-0.1-73.7L545.2,446.2z%20M500.9,522.3L254.8,944.7l65.4,31.9L484.4,699%20c5.7-4.6,11.4-7.1,17.1-7.3c6-0.2,12.2,2,18.3,6.8l163.8,278.4l67.4-35.2L500.9,522.3z%27/%3e%3cg%20id=%27_x23_000000ff-2%27%20transform=%27matrix(0.31570611,0,0,0.23560774,-391.49698,-10.601126)%27%3e%3c/g%3e%3c/svg%3e" 
                alt="Logo SENA" 
                className="w-12 h-12 object-contain"
              />
              <div>
                <h1 className="text-sm font-black tracking-widest text-emerald-800 uppercase font-display">
                  Servicio Nacional de Aprendizaje
                </h1>
                <p className="text-xs font-bold text-slate-500 tracking-wider">
                  Regional {evaluacion.aprendiz.regional}
                </p>
                <p className="text-[11px] text-slate-400">{evaluacion.aprendiz.centroFormacion}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full border border-emerald-300">
                Acuerdo No. 0009 de 2024
              </span>
              <p className="text-[10px] text-slate-400 mt-1 font-mono">{evaluacion.id}</p>
            </div>
          </div>

          {/* Certificate Body */}
          <div className="text-center my-6 space-y-4">
            <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase font-display tracking-tight">
              Constancia de Aprobación
            </h2>
            <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
              Inducción y Apropiación del Reglamento del Aprendiz SENA
            </p>

            <div className="py-2">
              <p className="text-xs text-slate-600">Se hace constar que el(la) aprendiz:</p>
              <h3 className="text-xl md:text-2xl font-extrabold text-emerald-800 mt-1 font-display">
                {evaluacion.aprendiz.nombres} {evaluacion.aprendiz.apellidos}
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Identificado(a) con {evaluacion.aprendiz.tipoDocumento} No. <span className="font-bold text-slate-800">{evaluacion.aprendiz.numeroDocumento}</span>
              </p>
            </div>

            <div className="max-w-xl mx-auto text-xs text-slate-700 leading-relaxed bg-white/80 p-4 rounded-xl border border-emerald-100 shadow-xs">
              Ha cursado, comprendido y aprobado satisfactoriamente la sesión de inducción y evaluación de competencias sobre derechos, deberes, debido proceso y alternativas de etapa productiva para el programa de formación:
              <div className="font-bold text-emerald-900 mt-1 text-sm">
                {evaluacion.aprendiz.programa}
              </div>
              <div className="text-slate-500 text-[11px] mt-0.5">
                Ficha de Caracterización No. <span className="font-bold text-slate-700">{evaluacion.aprendiz.numeroFicha}</span> · Jornada {evaluacion.aprendiz.jornada}
              </div>
            </div>

            {/* Score Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs font-bold text-emerald-800">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Calificación Obtenida: {evaluacion.puntaje}/100 ({evaluacion.aciertos} de {evaluacion.totalPreguntas} aciertos)</span>
              <span className="px-2 py-0.5 bg-emerald-600 text-white text-[10px] rounded-full uppercase">
                {evaluacion.estado}
              </span>
            </div>
          </div>

          {/* Footer & Signatures */}
          <div className="mt-8 pt-6 border-t border-slate-200 grid grid-cols-3 gap-4 items-end text-center">
            <div>
              <div className="h-10 border-b border-slate-400 mx-auto w-36 mb-1"></div>
              <p className="text-[11px] font-bold text-slate-800">Coordinación Académica</p>
              <p className="text-[10px] text-slate-500">SENA · Regional {evaluacion.aprendiz.regional}</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-white border border-slate-300 rounded-lg p-1 flex items-center justify-center shadow-xs">
                <div className="w-full h-full bg-slate-100 flex flex-col items-center justify-center text-[8px] font-mono text-slate-600">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 mb-0.5" />
                  <span>VERIFICADO</span>
                </div>
              </div>
              <p className="text-[9px] text-slate-400 mt-1 font-mono">{evaluacion.id}</p>
              <p className="text-[9px] text-slate-500 font-semibold">{formattedDate}</p>
            </div>
            <div>
              <div className="h-10 border-b border-slate-400 mx-auto w-36 mb-1"></div>
              <p className="text-[11px] font-bold text-slate-800">Instructor Líder de Ficha</p>
              <p className="text-[10px] text-slate-500">Acompañamiento Integral</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
