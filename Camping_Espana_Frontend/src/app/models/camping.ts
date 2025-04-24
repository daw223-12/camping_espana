export interface Camping {
    accesible_a_personas_con_discapacidad: string;
    c_postal: number;
    categoria: string;
    clase: string | any;
    codigo: string | any;
    direccion: string;
    email: string;
    especialidades: string | any;
    establecimiento: string;
    gps_latitud: number;
    gps_longitud: number;
    localidad: string;
    municipio: string;
    n_registro: string;
    nombre: string;
    nucleo: string;
    plazas: number;
    posada_real: string | any;
    posicion: {
        lat: number,
        lon: number
    };
    provincia: string;
    q_calidad: string | any;
    telefono_1: number;
    telefono_2: number;
    telefono_3: number;
    tipo: string;
    web: string;

}
