export interface AprendizPerfil {
  tipoDocumento: string;
  numeroDocumento: string;
  nombres: string;
  apellidos: string;
  correo: string;
  telefono: string;
  regional: string;
  centroFormacion: string;
  programa: string;
  numeroFicha: string;
  jornada: string;
  tieneFormacionPrevia: boolean;
  programaPrevio?: string;
}

export interface RespuestaDetalle {
  preguntaId: string;
  categoria: string;
  competencia: string;
  preguntaTexto: string;
  opcionSeleccionada: string;
  esCorrecta: boolean;
  retroalimentacion: string;
}

export interface EvaluacionRegistro {
  id: string;
  fecha: string;
  aprendiz: AprendizPerfil;
  puntaje: number;
  totalPreguntas: number;
  aciertos: number;
  errores: number;
  porcentaje: number;
  estado: string;
  tiempoSegundos: number;
  respuestas: RespuestaDetalle[];
}

export interface RepositoryStats {
  total: number;
  aprobados: number;
  reprobados: number;
  tasaAprobacion: number;
  promedioPuntaje: number;
  promedioTiempo: number;
  distribucionFichas: Record<string, number>;
  distribucionRegionales: Record<string, number>;
  diagnosticoTematico: Array<{
    preguntaId: string;
    categoria: string;
    competencia: string;
    totalIntentos: number;
    aciertos: number;
    porcentajeAcierto: number;
    necesitaRefuerzoEnAula: boolean;
  }>;
}
