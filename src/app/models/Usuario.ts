export interface Usuario {
    usuarioId?:number;
    nombre?:string;
    apellidoPaterno?:string;
    apellidoMaterno?:string;
    nombreUsuario?:string;
    cedula?:string;
    contrasena?:string;
    rol?:JSON;
    estado?:boolean;
}