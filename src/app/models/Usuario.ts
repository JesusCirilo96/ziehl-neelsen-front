export interface Usuario {
    usuarioId?:number;
    nombre?:string;
    apellidoPaterno?:string;
    apellidoMaterno?:string;
    nombreUsuario?:string;
    cedula?:string;
    password?:string;
    estado?:boolean;
    fechaCreacion?:string,
    fechaActualizacion?: string
}