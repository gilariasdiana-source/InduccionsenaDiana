export interface CentroSENA {
  id: string;
  nombre: string;
  municipio: string;
  programas: string[];
}

export interface RegionalSENAData {
  regional: string;
  centros: CentroSENA[];
}

export const SENA_REGIONALES_CENTROS_PROGRAMAS: RegionalSENAData[] = [
  {
    regional: "Distrito Capital",
    centros: [
      {
        id: "DC-01",
        nombre: "Centro de Electricidad, Electrónica y Telecomunicaciones (CEET)",
        municipio: "Bogotá D.C.",
        programas: [
          "Tecnólogo en Análisis y Desarrollo de Software (ADSO)",
          "Tecnólogo en Mantenimiento de Equipos Electrónicos e Instrumentación",
          "Tecnólogo en Gestión de Redes de Datos",
          "Tecnólogo en Electricidad Industrial",
          "Tecnólogo en Telecomunicaciones",
          "Tecnólogo en Automatización Industrial y Robótica",
          "Técnico en Instalaciones Eléctricas Residenciales y Comerciales",
          "Técnico en Soporte y Mantenimiento de Equipos de Cómputo"
        ]
      },
      {
        id: "DC-02",
        nombre: "Centro de Servicios Financieros (CSF)",
        municipio: "Bogotá D.C.",
        programas: [
          "Tecnólogo en Gestión Bancaria y de Entidades Financieras",
          "Tecnólogo en Contabilidad, Finanzas e Impuestos",
          "Tecnólogo en Gestión de Negocios Fiduciarios",
          "Tecnólogo en Gestión de Riesgos Financieros",
          "Técnico en Asesoría Comercial y Operaciones Financieras",
          "Técnico en Contabilización de Operaciones Comerciales y Financieras"
        ]
      },
      {
        id: "DC-03",
        nombre: "Centro de Gestión de Mercados, Logística y Tecnologías de la Información (CGMLTI)",
        municipio: "Bogotá D.C.",
        programas: [
          "Tecnólogo en Gestión Logística Integral",
          "Tecnólogo en Negociación Internacional",
          "Tecnólogo en Gestión de Mercados y Marketing Digital",
          "Tecnólogo en Desarrollo de Medios Gráficos y Visuales",
          "Tecnólogo en Animación Digital 3D",
          "Técnico en Integración de Contenidos Digitales",
          "Técnico en Operaciones Comerciales en Retail"
        ]
      },
      {
        id: "DC-04",
        nombre: "Centro de Gestión Administrativa (CGA)",
        municipio: "Bogotá D.C.",
        programas: [
          "Tecnólogo en Gestión Empresarial",
          "Tecnólogo en Gestión del Talento Humano",
          "Tecnólogo en Gestión Documental y Archivo",
          "Tecnólogo en Asistencia y Dirección Administrativa",
          "Técnico en Asistencia Administrativa",
          "Técnico en Recursos Humanos"
        ]
      },
      {
        id: "DC-05",
        nombre: "Centro de Tecnologías para la Construcción y la Madera (CTCM)",
        municipio: "Bogotá D.C. (Cazucá)",
        programas: [
          "Tecnólogo en Construcción de Edificaciones",
          "Tecnólogo en Obras Civiles y Vías",
          "Tecnólogo en Diseño de Mobiliario y Carpintería Industrial",
          "Tecnólogo en Topografía y Georreferenciación",
          "Técnico en Carpintería y Ebanistería",
          "Técnico en Instalación de Redes Hidráulicas y Sanitarias"
        ]
      },
      {
        id: "DC-06",
        nombre: "Centro de Formación en Actividad Física y Cultura",
        municipio: "Bogotá D.C.",
        programas: [
          "Tecnólogo en Entrenamiento Deportivo",
          "Tecnólogo en Actividad Física y Promoción de la Salud",
          "Tecnólogo en Producción de Audio y Sonido",
          "Tecnólogo en Expresión Escénica y Danza",
          "Técnico en Ejecución de la Danza",
          "Técnico en Recreación Comunitaria"
        ]
      },
      {
        id: "DC-07",
        nombre: "Centro de Formación de Talento Humano en Salud",
        municipio: "Bogotá D.C.",
        programas: [
          "Tecnólogo en Regencia de Farmacia",
          "Tecnólogo en Imágenes Diagnósticas y Radiología",
          "Técnico en Enfermería",
          "Técnico en Servicios Farmacéuticos",
          "Técnico en Salud Pública",
          "Técnico en Auxiliar de Salud Oral"
        ]
      },
      {
        id: "DC-08",
        nombre: "Centro Nacional de Hotelería, Turismo y Alimentos (CNHTA)",
        municipio: "Bogotá D.C.",
        programas: [
          "Tecnólogo en Gestión Hotelera y Alojamientos",
          "Tecnólogo en Gestión Turística y Agencias de Viajes",
          "Tecnólogo en Procesamiento de Alimentos",
          "Tecnólogo en Control de Calidad de Alimentos",
          "Técnico en Cocina Nacional e Internacional",
          "Técnico en Mesa y Bar",
          "Técnico en Panadería y Pastelería"
        ]
      },
      {
        id: "DC-09",
        nombre: "Centro para la Industria de la Comunicación Gráfica (CENIGRAF)",
        municipio: "Bogotá D.C.",
        programas: [
          "Tecnólogo en Producción de Medios Audiovisuales Digitales",
          "Tecnólogo en Diseño para la Industria Gráfica",
          "Tecnólogo en Impresión Offset y Digital",
          "Tecnólogo en Desarrollo de Videojuegos",
          "Técnico en Preprensa Digital para Medios Impresos",
          "Técnico en Serigrafía y Estampado"
        ]
      },
      {
        id: "DC-10",
        nombre: "Centro Metalmecánico",
        municipio: "Bogotá D.C.",
        programas: [
          "Tecnólogo en Mantenimiento Mecánico Industrial",
          "Tecnólogo en Mecatrónica Industrial",
          "Tecnólogo en Soldadura y Fabricación de Estructuras Metálicas",
          "Tecnólogo en Diseño y Desarrollo de Productos Mecánicos",
          "Técnico en Mecanizado de Productos Metalmecánicos",
          "Técnico en Trazado y Corte en Metales"
        ]
      },
      {
        id: "DC-11",
        nombre: "Centro de Manufactura en Textil y Cuero",
        municipio: "Bogotá D.C.",
        programas: [
          "Tecnólogo en Diseño, Confección y Moda",
          "Tecnólogo en Desarrollo y Modelado de Calzado y Marroquinería",
          "Tecnólogo en Gestión de la Producción de Vestuario",
          "Técnico en Confección Industrial de Prendas de Vestir",
          "Técnico en Patronaje y Escalado de Moda"
        ]
      }
    ]
  },
  {
    regional: "Antioquia",
    centros: [
      {
        id: "ANT-01",
        nombre: "Centro de Tecnología de la Manufactura Avanzada (CTMA)",
        municipio: "Medellín",
        programas: [
          "Tecnólogo en Automatización Industrial",
          "Tecnólogo en Análisis y Desarrollo de Software (ADSO)",
          "Tecnólogo en Mecatrónica",
          "Tecnólogo en Mantenimiento Electromecánico",
          "Tecnólogo en Fabricación de Moldes y Troqueles",
          "Técnico en Mantenimiento de Motores Diésel y Gasolina"
        ]
      },
      {
        id: "ANT-02",
        nombre: "Centro de Formación en Diseño, Confección y Moda",
        municipio: "Itagüí",
        programas: [
          "Tecnólogo en Diseño para la Industria de la Moda",
          "Tecnólogo en Producción Textil",
          "Tecnólogo en Mercadeo y Comercialización de Moda",
          "Técnico en Patronaje Industrial",
          "Técnico en Confección de Prendas de Vestir"
        ]
      },
      {
        id: "ANT-03",
        nombre: "Centro de Comercio y Servicios",
        municipio: "Medellín",
        programas: [
          "Tecnólogo en Gestión de Mercados",
          "Tecnólogo en Gestión del Talento Humano",
          "Tecnólogo en Contabilidad y Finanzas",
          "Tecnólogo en Gestión Bancaria",
          "Técnico en Asistencia Administrativa",
          "Técnico en Ventas de Productos y Servicios"
        ]
      },
      {
        id: "ANT-04",
        nombre: "Centro de los Recursos Naturales Renovables - La Salada",
        municipio: "Caldas",
        programas: [
          "Tecnólogo en Gestión de Empresas Agropecuarias",
          "Tecnólogo en Producción Agropecuaria Ecológica",
          "Tecnólogo en Gestión de Recursos Naturales",
          "Tecnólogo en Producción de Especies Menores",
          "Técnico en Mayordomía de Empresas Ganaderas",
          "Técnico en Producción de Café Especial"
        ]
      },
      {
        id: "ANT-05",
        nombre: "Centro de Servicios y Gestión Empresarial",
        municipio: "Medellín",
        programas: [
          "Tecnólogo en Gestión Empresarial",
          "Tecnólogo en Gestión Documental",
          "Tecnólogo en Gestión de la Calidad y Seguridad Ocupacional",
          "Técnico en Operaciones Comerciales y de Atención al Cliente"
        ]
      },
      {
        id: "ANT-06",
        nombre: "Centro del Hábitat y la Construcción",
        municipio: "Medellín",
        programas: [
          "Tecnólogo en Construcción de Edificaciones",
          "Tecnólogo en Topografía",
          "Tecnólogo en Instalación de Redes de Gas",
          "Técnico en Albañilería Estructurada",
          "Técnico en Pintura y Acabados Arquitectónicos"
        ]
      },
      {
        id: "ANT-07",
        nombre: "Complejo Tecnológico Minero Agroempresarial",
        municipio: "Puerto Berrío",
        programas: [
          "Tecnólogo en Supervisión de Labores Mineras",
          "Tecnólogo en Producción Ganadera Sostenible",
          "Tecnólogo en Gestión Agroindustrial",
          "Técnico en Explotación Minera Bajo Tierra",
          "Técnico en Soldadura de Mantenimiento"
        ]
      }
    ]
  },
  {
    regional: "Valle",
    centros: [
      {
        id: "VAL-01",
        nombre: "Centro Nacional de Asistencia Técnica a la Industria (ASTIN)",
        municipio: "Cali",
        programas: [
          "Tecnólogo en Química Aplicada a la Industria",
          "Tecnólogo en Transformación de Polímeros y Plásticos",
          "Tecnólogo en Metrología Industrial",
          "Tecnólogo en Análisis de Materiales y Calidad",
          "Técnico en Ensayos Fisicoquímicos de Laboratorio",
          "Técnico en Moldeo de Plásticos por Inyección"
        ]
      },
      {
        id: "VAL-02",
        nombre: "Centro de Diseño Tecnológico Industrial (CDTI)",
        municipio: "Cali (Complejo Salomia)",
        programas: [
          "Tecnólogo en Análisis y Desarrollo de Software (ADSO)",
          "Tecnólogo en Mantenimiento Mecatrónico de Automotores",
          "Tecnólogo en Electricidad Industrial",
          "Tecnólogo en Mantenimiento de Maquinaria Industrial",
          "Técnico en Mecánica Automotriz",
          "Técnico en Reparación de Motocicletas"
        ]
      },
      {
        id: "VAL-03",
        nombre: "Centro de Gestión Tecnológica de Servicios (CGTS)",
        municipio: "Cali",
        programas: [
          "Tecnólogo en Gestión del Talento Humano",
          "Tecnólogo en Gestión Empresarial",
          "Tecnólogo en Contabilidad, Finanzas e Impuestos",
          "Tecnólogo en Animación Digital 3D",
          "Tecnólogo en Gestión Documental",
          "Técnico en Asistencia Administrativa"
        ]
      },
      {
        id: "VAL-04",
        nombre: "Centro de la Construcción",
        municipio: "Cali",
        programas: [
          "Tecnólogo en Obras Civiles y Construcción",
          "Tecnólogo en Topografía y Cartografía Digital",
          "Tecnólogo en Instalaciones Eléctricas de Media y Baja Tensión",
          "Técnico en Redes de Acueducto y Alcantarillado"
        ]
      },
      {
        id: "VAL-05",
        nombre: "Centro Agropecuario de Buga (CAB)",
        municipio: "Guadalajara de Buga",
        programas: [
          "Tecnólogo en Procesamiento de Alimentos y Agroindustria",
          "Tecnólogo en Gestión de Empresas Pecuarias",
          "Tecnólogo en Riego y Adecuación de Tierras",
          "Técnico en Procesamiento de Lácteos y Cárnicos",
          "Técnico en Fruticultura Tropical"
        ]
      },
      {
        id: "VAL-06",
        nombre: "Centro Náutico Pesquero de Buenaventura",
        municipio: "Buenaventura",
        programas: [
          "Tecnólogo en Logística Portuaria y Comercio Marítimo",
          "Tecnólogo en Acuicultura Continental y Marina",
          "Tecnólogo en Navegación y Operaciones Pesqueras",
          "Técnico en Operación de Grúas Portuarias",
          "Técnico en Motorista Costanero"
        ]
      }
    ]
  },
  {
    regional: "Santander",
    centros: [
      {
        id: "SAN-01",
        nombre: "Centro Industrial del Mantenimiento Integral (CIMI)",
        municipio: "Girón / Bucaramanga",
        programas: [
          "Tecnólogo en Mecatrónica Industrial",
          "Tecnólogo en Análisis y Desarrollo de Software (ADSO)",
          "Tecnólogo en Mantenimiento Electromecánico",
          "Tecnólogo en Redes de Datos y Telecomunicaciones",
          "Técnico en Mantenimiento de Automatismos Industriales",
          "Técnico en Soldadura en Procesos SMAW y GMAW"
        ]
      },
      {
        id: "SAN-02",
        nombre: "Centro de Servicios Empresariales y Turísticos (CSET)",
        municipio: "Bucaramanga",
        programas: [
          "Tecnólogo en Gestión Turística y Hotelera",
          "Tecnólogo en Gestión Empresarial",
          "Tecnólogo en Contabilidad y Finanzas",
          "Tecnólogo en Gestión Bancaria",
          "Técnico en Cocina Tradicional Santandereana",
          "Técnico en Servicios de Mesa y Bar"
        ]
      },
      {
        id: "SAN-03",
        nombre: "Centro Industrial y del Desarrollo Tecnológico (CIDT)",
        municipio: "Barrancabermeja",
        programas: [
          "Tecnólogo en Refinación de Petróleo y Petroquímica",
          "Tecnólogo en Mantenimiento de Equipos de Industria Petrolera",
          "Tecnólogo en Seguridad y Salud en el Trabajo (SST)",
          "Tecnólogo en Electricidad Industrial",
          "Técnico en Instrumentación Industrial y Tubería"
        ]
      },
      {
        id: "SAN-04",
        nombre: "Centro Agroturístico",
        municipio: "San Gil / Socorro",
        programas: [
          "Tecnólogo en Guianza Turística y Deportes de Aventura",
          "Tecnólogo en Gestión de Empresas Agropecuarias",
          "Tecnólogo en Procesamiento de Café y Cacao",
          "Técnico en Panificación y Pastelería",
          "Técnico en Turismo Rural y Ecológico"
        ]
      }
    ]
  },
  {
    regional: "Atlántico",
    centros: [
      {
        id: "ATL-01",
        nombre: "Centro Nacional Colombo Alemán (CNCA)",
        municipio: "Barranquilla",
        programas: [
          "Tecnólogo en Mantenimiento Mecatrónico de Automotores",
          "Tecnólogo en Automatización Industrial y Robótica",
          "Tecnólogo en Refrigeración y Climatización Industrial",
          "Tecnólogo en Soldadura Especializada",
          "Técnico en Electricidad y Electrónica Automotriz",
          "Técnico en Torno y Fresado CNC"
        ]
      },
      {
        id: "ATL-02",
        nombre: "Centro de Comercio y Servicios",
        municipio: "Barranquilla",
        programas: [
          "Tecnólogo en Gestión Logística y Puertos",
          "Tecnólogo en Análisis y Desarrollo de Software (ADSO)",
          "Tecnólogo en Gestión de Mercados",
          "Tecnólogo en Contabilidad y Finanzas",
          "Técnico en Asistencia Administrativa",
          "Técnico en Operaciones Comerciales"
        ]
      },
      {
        id: "ATL-03",
        nombre: "Centro para el Desarrollo Agroecológico y Agroindustrial (CEDAGRO)",
        municipio: "Sabanalarga",
        programas: [
          "Tecnólogo en Gestión de Empresas Agropecuarias",
          "Tecnólogo en Agroindustria de Alimentos",
          "Tecnólogo en Acuicultura y Piscicultura",
          "Técnico en Ganadería Bovina Tropical",
          "Técnico en Riego Tecnificado"
        ]
      },
      {
        id: "ATL-04",
        nombre: "Centro de Formación de Hotelería y Turismo",
        municipio: "Barranquilla",
        programas: [
          "Tecnólogo en Gestión Hotelera y Gastronómica",
          "Tecnólogo en Organización de Eventos y Congresos",
          "Técnico en Cocina Caribeña e Internacional",
          "Técnico en Barismo y Catación de Café"
        ]
      }
    ]
  },
  {
    regional: "Bolívar",
    centros: [
      {
        id: "BOL-01",
        nombre: "Centro de Comercio y Servicios",
        municipio: "Cartagena de Indias",
        programas: [
          "Tecnólogo en Gestión Hotelera y Alojamientos Turísticos",
          "Tecnólogo en Gestión Turística y Guianza",
          "Tecnólogo en Gestión Empresarial",
          "Tecnólogo en Contabilidad y Finanzas",
          "Técnico en Cocina y Repostería Fina",
          "Técnico en Agencias de Viajes"
        ]
      },
      {
        id: "BOL-02",
        nombre: "Centro Internacional Náutico, Fluvial y Portuario (CINFPo)",
        municipio: "Cartagena de Indias (Mamonal)",
        programas: [
          "Tecnólogo en Operaciones Logísticas Portuarias",
          "Tecnólogo en Construcción y Mantenimiento Naval",
          "Tecnólogo en Mantenimiento de Motores Marinos",
          "Tecnólogo en Control Ambiental y Marino",
          "Técnico en Marinería y Navegación Fluvial"
        ]
      },
      {
        id: "BOL-03",
        nombre: "Centro para el Desarrollo Agroecológico y Minero",
        municipio: "El Carmen de Bolívar / Magangué",
        programas: [
          "Tecnólogo en Producción Agrícola y Montes de María",
          "Tecnólogo en Gestión de Empresas Pecuarias",
          "Tecnólogo en Minería de Canteras y Materiales",
          "Técnico en Cultivo de Palma y Cacao"
        ]
      }
    ]
  },
  {
    regional: "Cundinamarca",
    centros: [
      {
        id: "CUN-01",
        nombre: "Centro de Biotecnología Agropecuaria (CBA)",
        municipio: "Mosquera",
        programas: [
          "Tecnólogo en Biotecnología Vegetal y Reproductiva",
          "Tecnólogo en Procesamiento de Alimentos",
          "Tecnólogo en Producción Ganadera y Bovina",
          "Tecnólogo en Gestión de la Producción Agrícola",
          "Técnico en Floricultura y Cultivos Bajo Invernadero",
          "Técnico en Procesamiento de Cárnicos y Lácteos"
        ]
      },
      {
        id: "CUN-02",
        nombre: "Centro de Desarrollo Agroempresarial",
        municipio: "Chía / Zipaquirá",
        programas: [
          "Tecnólogo en Análisis y Desarrollo de Software (ADSO)",
          "Tecnólogo en Gestión Empresarial",
          "Tecnólogo en Contabilidad y Tributaria",
          "Tecnólogo en Guianza Turística Sabana Centro",
          "Técnico en Asistencia Administrativa",
          "Técnico en Producción de Hortalizas"
        ]
      },
      {
        id: "CUN-03",
        nombre: "Centro Industrial y de Desarrollo Empresarial (CIDE)",
        municipio: "Soacha",
        programas: [
          "Tecnólogo en Mantenimiento Mecatrónico y Automatización",
          "Tecnólogo en Gestión de la Producción Industrial",
          "Tecnólogo en Gestión de Redes de Datos",
          "Tecnólogo en Seguridad y Salud en el Trabajo",
          "Técnico en Confección Industrial",
          "Técnico en Mecanizado Industrial"
        ]
      },
      {
        id: "CUN-04",
        nombre: "Centro de la Tecnología del Diseño y la Productividad Empresarial",
        municipio: "Girardot",
        programas: [
          "Tecnólogo en Gestión Hotelera y Turística del Alto Magdalena",
          "Tecnólogo en Animación 3D y Medios Audiovisuales",
          "Tecnólogo en Gestión Empresarial",
          "Técnico en Cocina y Servicios de Restaurante"
        ]
      }
    ]
  },
  {
    regional: "Caldas",
    centros: [
      {
        id: "CAL-01",
        nombre: "Centro de Automatización Industrial",
        municipio: "Manizales",
        programas: [
          "Tecnólogo en Automatización Industrial y Robótica",
          "Tecnólogo en Análisis y Desarrollo de Software (ADSO)",
          "Tecnólogo en Mecatrónica",
          "Tecnólogo en Mantenimiento Electromecánico Industrial",
          "Técnico en Instalación y Mantenimiento de Redes de Fibra Óptica"
        ]
      },
      {
        id: "CAL-02",
        nombre: "Centro de Comercio y Servicios",
        municipio: "Manizales",
        programas: [
          "Tecnólogo en Gestión del Talento Humano",
          "Tecnólogo en Gestión Bancaria y Financiera",
          "Tecnólogo en Gestión Hotelera y Paisaje Cultural Cafetero",
          "Técnico en Barismo y Cultura Cafetera",
          "Técnico en Asistencia en Mercadeo"
        ]
      },
      {
        id: "CAL-03",
        nombre: "Centro Pecuario y Agroempresarial",
        municipio: "La Dorada",
        programas: [
          "Tecnólogo en Gestión de Empresas Ganaderas del Magdalena Medio",
          "Tecnólogo en Producción Acuícola",
          "Tecnólogo en Agroindustria de Alimentos",
          "Técnico en Inseminación Artificial Bovina"
        ]
      }
    ]
  },
  {
    regional: "Risaralda",
    centros: [
      {
        id: "RIS-01",
        nombre: "Centro de Diseño e Innovación Tecnológica Industrial (CDITI)",
        municipio: "Dosquebradas",
        programas: [
          "Tecnólogo en Diseño de Productos Industriales",
          "Tecnólogo en Análisis y Desarrollo de Software (ADSO)",
          "Tecnólogo en Mecatrónica Industrial",
          "Tecnólogo en Mantenimiento de Maquinaria de Confección",
          "Técnico en Soldadura en Estructuras Livianas y Pesadas"
        ]
      },
      {
        id: "RIS-02",
        nombre: "Centro de Comercio y Servicios",
        municipio: "Pereira",
        programas: [
          "Tecnólogo en Gestión Empresarial",
          "Tecnólogo en Gestión de Mercados y Venta Online",
          "Tecnólogo en Contabilidad y Finanzas",
          "Tecnólogo en Gestión Turística y Cafetera",
          "Técnico en Asistencia Administrativa"
        ]
      },
      {
        id: "RIS-03",
        nombre: "Centro de Atención Sector Agropecuario (CASA)",
        municipio: "Pereira",
        programas: [
          "Tecnólogo en Gestión de Empresas Agropecuarias",
          "Tecnólogo en Procesamiento de Alimentos",
          "Tecnólogo en Producción de Café Especial y Barismo",
          "Técnico en Agroecología y Viveros"
        ]
      }
    ]
  },
  {
    regional: "Quindío",
    centros: [
      {
        id: "QUI-01",
        nombre: "Centro de Comercio, Turismo y Salud",
        municipio: "Armenia",
        programas: [
          "Tecnólogo en Gestión Turística y Parques Temáticos",
          "Tecnólogo en Gestión Hotelera",
          "Tecnólogo en Regencia de Farmacia",
          "Tecnólogo en Gestión Empresarial",
          "Técnico en Enfermería",
          "Técnico en Cocina y Gastronomía del Paisaje Cafetero"
        ]
      },
      {
        id: "QUI-02",
        nombre: "Centro para el Desarrollo Tecnológico de la Construcción y la Industria",
        municipio: "Armenia",
        programas: [
          "Tecnólogo en Construcción de Obras Civiles y Guadua",
          "Tecnólogo en Análisis y Desarrollo de Software (ADSO)",
          "Tecnólogo en Electricidad Industrial",
          "Tecnólogo en Topografía",
          "Técnico en Carpintería en Madera y Guadua Estructural"
        ]
      },
      {
        id: "QUI-03",
        nombre: "Centro Agroindustrial",
        municipio: "Armenia",
        programas: [
          "Tecnólogo en Procesamiento de Alimentos y Derivados del Café",
          "Tecnólogo en Gestión Agroempresarial",
          "Tecnólogo en Control de Calidad de Alimentos",
          "Técnico en Catación y Barismo de Café de Origen"
        ]
      }
    ]
  },
  {
    regional: "Tolima",
    centros: [
      {
        id: "TOL-01",
        nombre: "Centro de Industria y de la Construcción",
        municipio: "Ibagué",
        programas: [
          "Tecnólogo en Mantenimiento Mecatrónico de Automotores",
          "Tecnólogo en Construcción de Edificaciones",
          "Tecnólogo en Análisis y Desarrollo de Software (ADSO)",
          "Tecnólogo en Confección y Diseño de Moda",
          "Técnico en Soldadura Estructural",
          "Técnico en Mantenimiento de Motocicletas"
        ]
      },
      {
        id: "TOL-02",
        nombre: "Centro de Comercio y Servicios",
        municipio: "Ibagué",
        programas: [
          "Tecnólogo en Gestión Empresarial y Emprendimiento",
          "Tecnólogo en Gestión del Talento Humano",
          "Tecnólogo en Contabilidad, Finanzas y Auditoría",
          "Tecnólogo en Gestión Hotelera y Eventos Culturales",
          "Técnico en Asistencia Administrativa"
        ]
      },
      {
        id: "TOL-03",
        nombre: "Centro Agropecuario La Granja",
        municipio: "Espinal",
        programas: [
          "Tecnólogo en Gestión de Empresas Agropecuarias y Arroceras",
          "Tecnólogo en Producción Ganadera y Bovina",
          "Tecnólogo en Agroindustria de Frutas Tropicales",
          "Tecnólogo en Acuicultura Continental",
          "Técnico en Cultivo de Mango y Frutales"
        ]
      }
    ]
  },
  {
    regional: "Huila",
    centros: [
      {
        id: "HUI-01",
        nombre: "Centro de la Industria, la Empresa y los Servicios (CIES)",
        municipio: "Neiva",
        programas: [
          "Tecnólogo en Análisis y Desarrollo de Software (ADSO)",
          "Tecnólogo en Electricidad Industrial y Energías Renovables",
          "Tecnólogo en Gestión Empresarial",
          "Tecnólogo en Contabilidad y Finanzas",
          "Técnico en Mecánica Automotriz",
          "Técnico en Asistencia Administrativa"
        ]
      },
      {
        id: "HUI-02",
        nombre: "Centro de Formación Agroindustrial 'La Angostura'",
        municipio: "Campoalegre",
        programas: [
          "Tecnólogo en Acuicultura y Producción de Tilapia",
          "Tecnólogo en Gestión de Empresas Agropecuarias y Arroz",
          "Tecnólogo en Agroindustria de Alimentos",
          "Técnico en Procesamiento de Cárnicos y Pescados"
        ]
      },
      {
        id: "HUI-03",
        nombre: "Centro de Gestión y Desarrollo Sostenible Surcolombiano",
        municipio: "Pitalito",
        programas: [
          "Tecnólogo en Producción de Cafés Especiales de Alta Calidad",
          "Tecnólogo en Gestión Turística y Parque Arqueológico San Agustín",
          "Tecnólogo en Gestión Agroempresarial",
          "Técnico en Barismo, Tueste y Catación de Café",
          "Técnico en Guianza Turística Arqueológica"
        ]
      },
      {
        id: "HUI-04",
        nombre: "Centro de Desarrollo Agroempresarial y Turístico del Huila",
        municipio: "La Plata",
        programas: [
          "Tecnólogo en Gestión Agroempresarial de Tierras Altas",
          "Tecnólogo en Producción Pecuaria Sostenible",
          "Técnico en Producción de Cacao y Frutas Andinas"
        ]
      }
    ]
  },
  {
    regional: "Boyacá",
    centros: [
      {
        id: "BOY-01",
        nombre: "Centro Industrial de Mantenimiento y Manufactura (CIMM)",
        municipio: "Sogamoso",
        programas: [
          "Tecnólogo en Mantenimiento Mecatrónico y Siderúrgico",
          "Tecnólogo en Análisis y Desarrollo de Software (ADSO)",
          "Tecnólogo en Metalurgia y Soldadura Industrial",
          "Tecnólogo en Electricidad Industrial",
          "Técnico en Soldadura en Plancha y Tubería",
          "Técnico en Ensayos No Destructivos"
        ]
      },
      {
        id: "BOY-02",
        nombre: "Centro de Gestión Administrativa y Agrícola",
        municipio: "Tunja",
        programas: [
          "Tecnólogo en Gestión Empresarial",
          "Tecnólogo en Contabilidad, Finanzas e Impuestos",
          "Tecnólogo en Gestión del Talento Humano",
          "Tecnólogo en Gestión de Recursos Naturales",
          "Técnico en Asistencia Administrativa",
          "Técnico en Producción de Papa y Hortalizas"
        ]
      },
      {
        id: "BOY-03",
        nombre: "Centro Minero",
        municipio: "Sogamoso / Morca",
        programas: [
          "Tecnólogo en Supervisión de Labores Mineras Bajo Tierra",
          "Tecnólogo en Seguridad y Salvamento Minero",
          "Tecnólogo en Topografía Minera",
          "Técnico en Minería de Carbón y Rocas Fosfóricas"
        ]
      },
      {
        id: "BOY-04",
        nombre: "Centro de Desarrollo Agropecuario y Agroindustrial (CEDEAGRO)",
        municipio: "Duitama",
        programas: [
          "Tecnólogo en Procesamiento de Lácteos y Quesos Madurados",
          "Tecnólogo en Producción Ganadera de Leche",
          "Tecnólogo en Fruticultura de Clima Frío Moderado",
          "Técnico en Agroindustria de Frutas y Hortalizas"
        ]
      }
    ]
  },
  {
    regional: "Nariño",
    centros: [
      {
        id: "NAR-01",
        nombre: "Centro Lope (Agropecuario e Industrial)",
        municipio: "Pasto",
        programas: [
          "Tecnólogo en Producción Ganadera de Clima Frío",
          "Tecnólogo en Agroindustria y Lácteos de Nariño",
          "Tecnólogo en Gestión de Empresas Agropecuarias",
          "Tecnólogo en Mecánica Automotriz",
          "Técnico en Producción de Papa y Cuyes",
          "Técnico en Cultivo de Café Especial de Nariño"
        ]
      },
      {
        id: "NAR-02",
        nombre: "Centro Internacional de Producción Limpia - Lope",
        municipio: "Pasto",
        programas: [
          "Tecnólogo en Análisis y Desarrollo de Software (ADSO)",
          "Tecnólogo en Gestión Empresarial y Comercio Fronterizo",
          "Tecnólogo en Contabilidad y Finanzas",
          "Tecnólogo en Diseño y Confección de Modas",
          "Técnico en Asistencia Administrativa",
          "Técnico en Integración de Contenidos Digitales"
        ]
      },
      {
        id: "NAR-03",
        nombre: "Centro Sur Colombiano de Logística Internacional",
        municipio: "Ipiales",
        programas: [
          "Tecnólogo en Comercio Internacional y Operaciones de Aduana",
          "Tecnólogo en Gestión Logística Fronteriza",
          "Tecnólogo en Administración de Empresas de Transporte",
          "Técnico en Trámites Aduaneros y Despacho de Carga"
        ]
      },
      {
        id: "NAR-04",
        nombre: "Centro Agroforestal y Acuícola Arapaima",
        municipio: "Tumaco",
        programas: [
          "Tecnólogo en Acuicultura y Pesca Marina del Pacífico",
          "Tecnólogo en Cultivo y Transformación de Cacao y Palma",
          "Tecnólogo en Gestión de Recursos Forestales y Mangle",
          "Técnico en Procesamiento de Camarón y Pescado"
        ]
      }
    ]
  },
  {
    regional: "Cauca",
    centros: [
      {
        id: "CAU-01",
        nombre: "Centro de Teleinformática y Producción Industrial (CTPI)",
        municipio: "Popayán",
        programas: [
          "Tecnólogo en Análisis y Desarrollo de Software (ADSO)",
          "Tecnólogo en Gestión de Redes de Datos",
          "Tecnólogo en Mantenimiento Electromecánico Industrial",
          "Tecnólogo en Electricidad Industrial",
          "Técnico en Soporte y Mantenimiento de Cómputo"
        ]
      },
      {
        id: "CAU-02",
        nombre: "Centro de Comercio y Servicios",
        municipio: "Popayán",
        programas: [
          "Tecnólogo en Gestión Turística y Gastronómica (Ciudad Unesco)",
          "Tecnólogo en Gestión Empresarial",
          "Tecnólogo en Contabilidad y Tributaria",
          "Técnico en Cocina Tradicional Caucana",
          "Técnico en Asistencia Administrativa"
        ]
      },
      {
        id: "CAU-03",
        nombre: "Centro Agropecuario",
        municipio: "Popayán",
        programas: [
          "Tecnólogo en Gestión de Empresas Agropecuarias",
          "Tecnólogo en Procesamiento de Café Especial del Cauca",
          "Tecnólogo en Producción Pecuaria Ecológica",
          "Técnico en Catación y Barismo de Café",
          "Técnico en Viveros y Reforestación Comunitaria"
        ]
      }
    ]
  },
  {
    regional: "Meta",
    centros: [
      {
        id: "MET-01",
        nombre: "Centro de Industria y Servicios del Meta",
        municipio: "Villavicencio",
        programas: [
          "Tecnólogo en Análisis y Desarrollo de Software (ADSO)",
          "Tecnólogo en Mantenimiento Mecatrónico y Maquinaria Pesada",
          "Tecnólogo en Gestión Empresarial",
          "Tecnólogo en Contabilidad y Finanzas",
          "Técnico en Mecánica de Maquinaria Agrícola e Industrial"
        ]
      },
      {
        id: "MET-02",
        nombre: "Centro Agroindustrial del Meta - Sede Los Naranjos / Hachón",
        municipio: "Villavicencio / San Juan de Arama",
        programas: [
          "Tecnólogo en Producción Ganadera de los Llanos Orientales",
          "Tecnólogo en Gestión de la Producción Agrícola (Arroz, Palma, Cacao)",
          "Tecnólogo en Agroindustria de Cárnicos y Lácteos",
          "Tecnólogo en Acuicultura de Cachama y Bagre",
          "Técnico en Inseminación Bovina y Manejo de Pasturas"
        ]
      }
    ]
  },
  {
    regional: "Norte de Santander",
    centros: [
      {
        id: "NDS-01",
        nombre: "Centro de la Industria, la Empresa y los Servicios (CIES)",
        municipio: "Cúcuta",
        programas: [
          "Tecnólogo en Análisis y Desarrollo de Software (ADSO)",
          "Tecnólogo en Gestión del Comercio Internacional y Aduanas",
          "Tecnólogo en Diseño y Modelado de Calzado y Cuero",
          "Tecnólogo en Confección y Patronaje Industrial",
          "Técnico en Asistencia Administrativa"
        ]
      },
      {
        id: "NDS-02",
        nombre: "Centro de Formación para el Desarrollo Rural y Minero (CEDRUM)",
        municipio: "El Zulia / Cúcuta",
        programas: [
          "Tecnólogo en Supervisión Minera y Extracción de Carbón y Arcilla",
          "Tecnólogo en Gestión de Empresas Agropecuarias (Cacao, Palma, Café)",
          "Tecnólogo en Agroindustria de Alimentos",
          "Técnico en Minería Bajo Tierra",
          "Técnico en Cultivo y Beneficio de Cacao"
        ]
      }
    ]
  },
  {
    regional: "Cesar",
    centros: [
      {
        id: "CES-01",
        nombre: "Centro de Operación y Mantenimiento Minero (COMM)",
        municipio: "Valledupar / La Jagua de Ibirico",
        programas: [
          "Tecnólogo en Mantenimiento Electromecánico de Equipo Minero Pesado",
          "Tecnólogo en Mantenimiento Mecatrónico Automotor",
          "Tecnólogo en Soldadura Especializada",
          "Técnico en Operación de Maquinaria Pesada en Minería a Cielo Abierto",
          "Técnico en Electricidad Minera e Industrial"
        ]
      },
      {
        id: "CES-02",
        nombre: "Centro Biotecnológico del Caribe (CBC)",
        municipio: "Valledupar",
        programas: [
          "Tecnólogo en Producción Ganadera y Bovina de Doble Propósito",
          "Tecnólogo en Gestión de Empresas Agropecuarias",
          "Tecnólogo en Agroindustria de Alimentos",
          "Tecnólogo en Gestión Ambiental",
          "Técnico en Mayordomía de Fincas Ganaderas"
        ]
      }
    ]
  },
  {
    regional: "Córdoba",
    centros: [
      {
        id: "COR-01",
        nombre: "Centro de Comercio, Industria y Turismo de Córdoba",
        municipio: "Montería",
        programas: [
          "Tecnólogo en Análisis y Desarrollo de Software (ADSO)",
          "Tecnólogo en Gestión Hotelera y Ecoturismo del Sinú",
          "Tecnólogo en Gestión Empresarial",
          "Tecnólogo en Contabilidad y Finanzas",
          "Técnico en Cocina Costeña y Típica del Sinú"
        ]
      },
      {
        id: "COR-02",
        nombre: "Centro Agropecuario y de Biotecnología El Porvenir",
        municipio: "Montería",
        programas: [
          "Tecnólogo en Producción Ganadera Tropical",
          "Tecnólogo en Biotecnología y Reproducción Animal",
          "Tecnólogo en Piscicultura de Tilapia y Bocachico",
          "Tecnólogo en Cultivos Tropicales (Maíz, Algodón, Plátano)",
          "Técnico en Inseminación Bovina y Pastos"
        ]
      }
    ]
  },
  {
    regional: "Magdalena",
    centros: [
      {
        id: "MAG-01",
        nombre: "Centro de Logística y Promoción Ecoturística del Magdalena",
        municipio: "Santa Marta",
        programas: [
          "Tecnólogo en Gestión Hotelera y Turismo de Naturaleza",
          "Tecnólogo en Operaciones Logísticas y Portuarias",
          "Tecnólogo en Análisis y Desarrollo de Software (ADSO)",
          "Tecnólogo en Gestión de Playas y Deportes Náuticos",
          "Técnico en Guianza Turística Parque Tayrona",
          "Técnico en Cocina de Mariscos y Tradicional"
        ]
      },
      {
        id: "MAG-02",
        nombre: "Centro Acuícola y Agroindustrial de Gaira",
        municipio: "Santa Marta (Gaira)",
        programas: [
          "Tecnólogo en Acuicultura Continental y Maricultura",
          "Tecnólogo en Procesamiento y Conservación de Pescados y Mariscos",
          "Tecnólogo en Cultivo de Palma de Aceite y Banano",
          "Técnico en Cultivo y Cosecha de Café Sierra Nevada"
        ]
      }
    ]
  },
  {
    regional: "Sucre",
    centros: [
      {
        id: "SUC-01",
        nombre: "Centro de la Innovación, la Tecnología y los Servicios",
        municipio: "Sincelejo",
        programas: [
          "Tecnólogo en Análisis y Desarrollo de Software (ADSO)",
          "Tecnólogo en Gestión Empresarial",
          "Tecnólogo en Contabilidad y Finanzas",
          "Tecnólogo en Redes de Telecomunicaciones",
          "Técnico en Asistencia Administrativa"
        ]
      },
      {
        id: "SUC-02",
        nombre: "Centro de la Formación para el Desarrollo Agroecológico y Agroindustrial",
        municipio: "Sincelejo / Corozal",
        programas: [
          "Tecnólogo en Gestión de Empresas Ganaderas y Sabanas de Sucre",
          "Tecnólogo en Procesamiento de Alimentos y Lácteos (Queso Costeño)",
          "Tecnólogo en Producción de Yuca Industrial y Ñame",
          "Técnico en Mayordomía Ganadera"
        ]
      }
    ]
  },
  {
    regional: "La Guajira",
    centros: [
      {
        id: "GUA-01",
        nombre: "Centro Industrial y de Energías Alternativas (CIEA)",
        municipio: "Riohacha / Maicao",
        programas: [
          "Tecnólogo en Instalación y Mantenimiento de Parques Solares y Eólicos",
          "Tecnólogo en Mantenimiento de Maquinaria Pesada Minera (Cerrejón)",
          "Tecnólogo en Electricidad Industrial",
          "Técnico en Montaje de Sistemas Solares Fotovoltaicos",
          "Técnico en Soldadura Industrial"
        ]
      },
      {
        id: "GUA-02",
        nombre: "Centro Agroempresarial y Acuícola",
        municipio: "Fonseca",
        programas: [
          "Tecnólogo en Gestión Agropecuaria de Zonas Áridas y Semiáridas",
          "Tecnólogo en Producción de Especies Caprinas y Ovinas",
          "Tecnólogo en Procesamiento de Sal Marina y Recursos Pesqueros",
          "Técnico en Artesanías Wayúu y Tejido Tradicional"
        ]
      }
    ]
  },
  {
    regional: "Casanare",
    centros: [
      {
        id: "CAS-01",
        nombre: "Centro Agroindustrial y Fortalecimiento Empresarial de Casanare (CAFEP)",
        municipio: "Yopal",
        programas: [
          "Tecnólogo en Producción y Mantenimiento de Pozos Petroleros",
          "Tecnólogo en Gestión de Empresas Ganaderas y Arroceras",
          "Tecnólogo en Análisis y Desarrollo de Software (ADSO)",
          "Tecnólogo en Seguridad y Salud en el Trabajo (SST)",
          "Técnico en Operación de Maquinaria Agrícola para Arroz y Palma",
          "Técnico en Mecánica Diésel y Automotriz"
        ]
      }
    ]
  },
  {
    regional: "Arauca",
    centros: [
      {
        id: "ARA-01",
        nombre: "Centro de Gestión y Desarrollo Agroindustrial de Arauca",
        municipio: "Arauca / Tame",
        programas: [
          "Tecnólogo en Gestión Ganadera y Cacao Fino de Aroma",
          "Tecnólogo en Mantenimiento de Equipos de Hidrocarburos",
          "Tecnólogo en Agroindustria de Alimentos",
          "Técnico en Producción y Beneficio de Cacao Araucano",
          "Técnico en Asistencia Administrativa y Contable"
        ]
      }
    ]
  },
  {
    regional: "Chocó",
    centros: [
      {
        id: "CHO-01",
        nombre: "Centro de Recursos Naturales, Industria y Biodiversidad",
        municipio: "Quibdó",
        programas: [
          "Tecnólogo en Gestión de Recursos Forestales y Maderables",
          "Tecnólogo en Acuicultura Continental y Piscicultura Tropical",
          "Tecnólogo en Análisis y Desarrollo de Software (ADSO)",
          "Tecnólogo en Gestión Comunitaria y Ecoturismo en el Atrato",
          "Técnico en Minería Responsable y Aluvial de Oro y Platino",
          "Técnico en Procesamiento de Frutas Nativas (Borojó, Chontaduro)"
        ]
      }
    ]
  },
  {
    regional: "Caquetá",
    centros: [
      {
        id: "CAQ-01",
        nombre: "Centro Tecnológico de la Amazonía",
        municipio: "Florencia",
        programas: [
          "Tecnólogo en Sistemas Silvopastoriles y Ganadería Sostenible",
          "Tecnólogo en Procesamiento de Lácteos y Queso del Caquetá (Denominación de Origen)",
          "Tecnólogo en Gestión de Recursos Naturales Amazónicos",
          "Tecnólogo en Análisis y Desarrollo de Software (ADSO)",
          "Técnico en Producción de Cacao y Caucho Natural"
        ]
      }
    ]
  },
  {
    regional: "Putumayo",
    centros: [
      {
        id: "PUT-01",
        nombre: "Centro Agroforestal y Acuícola del Putumayo",
        municipio: "Puerto Asís / Mocoa",
        programas: [
          "Tecnólogo en Producción Agroforestal y Acuicultura Amazónica (Pirarucú)",
          "Tecnólogo en Mantenimiento de Equipos de Producción Petrolera",
          "Tecnólogo en Gestión Ambiental y Ecoturismo del Fin del Mundo",
          "Técnico en Cultivo y Transformación de Pimienta y Cacao",
          "Técnico en Guianza Ecoturística en Cascadas"
        ]
      }
    ]
  },
  {
    regional: "San Andrés y Providencia",
    centros: [
      {
        id: "SAP-01",
        nombre: "Centro de Formación Turística, Gente de Mar y de Servicios",
        municipio: "San Andrés Isla / Providencia",
        programas: [
          "Tecnólogo en Gestión Hotelera y Ecoturismo Insular",
          "Tecnólogo en Operaciones Logísticas y Portuarias del Caribe",
          "Tecnólogo en Buceo Profesional y Conservación de Arrecifes de Coral",
          "Tecnólogo en Animación Turística y Bilingüe (Inglés Criollo Raizal)",
          "Técnico en Motores Fuera de Borda y Embarcaciones Menores",
          "Técnico en Cocina Tradicional Raizal"
        ]
      }
    ]
  },
  {
    regional: "Amazonas",
    centros: [
      {
        id: "AMZ-01",
        nombre: "Centro para la Biodiversidad y el Ecoturismo Amazónico",
        municipio: "Leticia / Puerto Nariño",
        programas: [
          "Tecnólogo en Guianza y Gestión de Ecoturismo en la Selva Amazónica",
          "Tecnólogo en Conservación de Recursos Hidrobiológicos y Piscicultura",
          "Tecnólogo en Gestión Ambiental Comunitaria e Indígena",
          "Técnico en Transformación de Frutos Amazónicos (Açai, Copoazú, Camu Camu)",
          "Técnico en Artesanías con Fibras Naturales de Chambira"
        ]
      }
    ]
  },
  {
    regional: "Guaviare",
    centros: [
      {
        id: "GVR-01",
        nombre: "Centro de Desarrollo Agroindustrial, Turístico y Tecnológico del Guaviare",
        municipio: "San José del Guaviare",
        programas: [
          "Tecnólogo en Gestión de Destinos Turísticos y Arte Rupestre (Chiribiquete / Lindosa)",
          "Tecnólogo en Sistemas Agroforestales y Cacao Sostenible",
          "Tecnólogo en Producción Pecuaria Libre de Deforestación",
          "Técnico en Guianza Turística en Pinturas Rupestres",
          "Técnico en Asistencia Administrativa"
        ]
      }
    ]
  },
  {
    regional: "Guainía",
    centros: [
      {
        id: "GNA-01",
        nombre: "Centro Ambiental y Ecoturístico del Río Inírida",
        municipio: "Inírida",
        programas: [
          "Tecnólogo en Guianza Ecoturística en Cerros de Mavecure y Río Inírida",
          "Tecnólogo en Producción Acuícola de Peces Ornamentales",
          "Tecnólogo en Gestión Ambiental Indígena",
          "Técnico en Cultivo y Cosecha de la Flor de Inírida",
          "Técnico en Navegación Fluvial y Motores"
        ]
      }
    ]
  },
  {
    regional: "Vaupés",
    centros: [
      {
        id: "VAU-01",
        nombre: "Centro Agropecuario y de Servicios Ambientales del Vaupés",
        municipio: "Mitú",
        programas: [
          "Tecnólogo en Manejo Forestal Comunitario y Saberes Ancestrales",
          "Tecnólogo en Gestión de Proyectos Ecoturísticos Étnicos",
          "Tecnólogo en Acuicultura de Especies Nativas del Río Vaupés",
          "Técnico en Cultivos Amazónicos Tradicionales (Chagra y Yuca Brava)",
          "Técnico en Artesanías Indígenas en Cerámica y Madera"
        ]
      }
    ]
  },
  {
    regional: "Vichada",
    centros: [
      {
        id: "VIC-01",
        nombre: "Centro de Producción y Transformación Agroindustrial de la Orinoquía",
        municipio: "Puerto Carreño / La Primavera",
        programas: [
          "Tecnólogo en Producción Forestal Comercial y Caucho",
          "Tecnólogo en Ganadería Regenerativa en Sabanas Inundables",
          "Tecnólogo en Cultivo de Marañón y Frutales de Altillanura",
          "Técnico en Maquinaria de Siembra y Cosecha a Gran Escala",
          "Técnico en Asistencia Administrativa"
        ]
      }
    ]
  }
];
