export interface Recepcion{
    recepcionId?:string;
    fechaIngreso?:string;
    horaIngreso?:string;
    ficha?:number;
    total?:number;
    subTotal?:number;
    descuento?:number;
    anticipo?:number;
    restante?:number;
    importe?: number,
    pagado?: boolean,
    finalizado?: boolean,
    impreso?: boolean,
    entregado?:boolean,
    muestras?:string;
    notas?:string;
    usuarioId?:number;
    medicoId?:number;
    pacienteId?:number;
}