export class AccessRouteParent{
    constructor(
        public nombrePadre: string,
        public rutaPadre: string
    ){}
}

export class AccessRoutes{
    constructor(
        public modulo: string,
        public accion: string,
        public padre: AccessRouteParent,
        public path?: string,
    ){}
}