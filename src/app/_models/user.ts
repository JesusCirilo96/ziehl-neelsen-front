/*export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    token: string;
}*/

export class User {
    usuario_id: number;
    nombre: string;
    apellido_materno:string;
    apellido_paterno:string;
    nombre_usuario: string;
    cedula:string;
    estado:boolean;
    token:string = "fake-jwt-token";
}