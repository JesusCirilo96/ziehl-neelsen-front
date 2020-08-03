export interface Usuario {
    usuario_id?:number;
    nombre?:string;
    apellido_paterno?:string;
    apellido_materno?:string;
    nombre_usuario?:string;
    cedula?:string;
    contrasena?:string;
    rol?:JSON;
    estado?:boolean;
}