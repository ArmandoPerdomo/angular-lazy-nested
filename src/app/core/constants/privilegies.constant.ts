export interface SubModule{
    name: string,
    path: string
    actions: Array<string>
}
export interface Module{
    name: string,
    path: string,
    action?:string,
    section: string //Valores admitidos 'r': Reportes 'g': Gestión 'c': Configuracioens
    subModules?: SubModule[]
}

export const PRIVILEGIES: Module[] = [
    {
        name: 'Ventas',
        section: 'Reporte',
        action: 'Consultar',
        path: 'Reportes/Administrativo/Ventas',
        subModules: [
            {
                name: 'Lista Precio Stock',
                path: 'Reportes/Administrativo/Ventas/ListadoPrecioStock',
                actions: ['Consultar','PDF']
            }
        ]
    }
]