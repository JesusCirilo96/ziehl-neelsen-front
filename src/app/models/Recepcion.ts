export interface Recepcion{
    recepcion_id?:string;
    fecha_ingreso?:string;
    hora_ingreso?:string;
    ficha?:number;
    subTotal?:number;
    descuento?:number;
    total?:number;
    anticipo?:number;
    restante?:number;
    paciente_id?:number;
    atencion_id?:number;
    muestra?:string;
    createdAt?:string;
    updatedAt?:string;
}