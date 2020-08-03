export interface SubExamen{
    sub_examen_id?:number;
    nombre?:string;
    vr_ninos?:string;
    vr_ninas?:string;
    vr_general_n?:string;
    vr_hombre?:string;
    vr_mujer?:string;
    vr_general?:string;
    orden?:number;
    precio?:number; 
    metodo?:JSON,
    referencia_personalizada?:JSON,
    estado?:boolean;
    createdAt?:string;
    updatedAt?:string;    
}