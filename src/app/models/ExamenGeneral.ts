export interface ExamenGeneral{
    examen_gen_id?:number;
    nombre?:string;
    alias?:string;
    precio?:number;
    vr_ninos?:string;
    vr_ninas?:string;
    vr_general_n?:string;
    vr_hombre?:string;
    vr_mujer?:string;
    vr_general?:string;
    estado?:boolean;
    createdAt?:string;
    updatedAt?:string;
    seccion_id?:number;
    tipo_examen_id?:number;
    metodo?:JSON;
}