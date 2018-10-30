import { NavItem } from "../../abstract/interfaces/nav-item.interface";


export const CT_MENU_ITEMS: NavItem[] = [
    /*** GESTIÓN ***/
    {
        displayName: "Gestión administrativa",
        iconName: "hand-holding-usd",
        flag: "gestion",
        children:[
            {
                displayName: "Ventas",
                children:[
                    {
                        displayName: "Cotización",
                        route: "/app/gestion/ventas/cotizacion"
                    },
                    {
                        displayName: "Pedido",
                        route: "/app/gestion/ventas/pedido"
                    },
                    {
                        displayName: "Cobro",
                        route: "/app/gestion/ventas/cobro",
                        disabled: true
                    },
                    {
                        displayName: "Gestión Clientes",
                        route: "/app/gestion/ventas/gestion-clientes",
                        disabled: true
                    },
                    {
                        displayName: "Devolución",
                        route: "/app/gestion/ventas/devolucion"
                    },
                    {
                        displayName: "Plantilla de venta",
                        route: "/app/gestion/ventas/plantilla-de-venta"
                    }
                ]
            }
        ]
    },
    /*** REPORTES ***/
    {
        displayName: "Administrativos",
        iconName: "calculator",
        flag: "reportes",
        children:[
            {
                displayName: "Ventas",
                children:[
                    {
                        displayName: "Lista de precios stock",
                        route: "/app/reportes/administrativos/ventas/listado-precio-stock"
                    },
                    {
                        displayName: "CxC por cliente",
                        route: "/app/reportes/administrativos/ventas/cxc"
                    },
                    {
                        displayName: "Facturas",
                        children: [
                            {
                                displayName: "Factura Digital",
                                route: "/app/reportes/administrativos/ventas/factura-digital"
                            },
                            {
                                displayName: "Resumen Factura",
                                route: "/app/reportes/administrativos/ventas/resumen-factura"
                            }
                        ]
                    },
                    {
                        displayName: "Cotización digital",
                        route: "/app/reportes/administrativos/ventas/cotizaciones-digital"
                    },
                    {
                        displayName: "Devolución digital",
                        route: "/app/reportes/administrativos/ventas/devoluciones-digital"
                    },
                    {
                        displayName: "Pedido digital",
                        route: "/app/reportes/administrativos/ventas/pedido-digital"
                    },
                    {
                        displayName: "Nota de entrega digital",
                        route: "/app/reportes/administrativos/ventas/nota-entrega-digital"
                    },
                    {
                        displayName: "Nota de despacho digital",
                        route: "/app/reportes/administrativos/ventas/nota-despacho-digital"
                    },
                    {
                        displayName: "Plantilla de venta digital",
                        route: "/app/reportes/administrativos/ventas/plantilla-digital"
                    },
                    {
                        displayName: "Cobro digital",
                        route: "/app/reportes/administrativos/ventas/cobro-digital"
                    }
                ]
            },
            {
                displayName: "Compras",
                children:[
                    {
                        displayName: "CxP por proveedor",
                        route: "/app/reportes/administrativos/compras/cxp"
                    },
                    {
                        displayName: "Pagos",
                        children:[
                            {
                                displayName: "Por número",
                                route: "/app/reportes/administrativos/compras/pagos-por-numero"
                            },
                            {
                                displayName: "Digital",
                                route: "/app/reportes/administrativos/compras/pagos-digital"
                            },
                        ]
                    },
                    {
                        displayName: "Orden de compra digital",
                        route: "/app/reportes/administrativos/compras/ordenes-de-compra"
                    },
                    {
                        displayName: "Nota de recepción digital",
                        route: "/app/reportes/administrativos/compras/notas-de-recepcion"
                    },
                    {
                        displayName: "Factura de compra",
                        route: "/app/reportes/administrativos/compras/factura-de-compra"
                    },
                    {
                        displayName: "Devolución al proveedor",
                        route: "/app/reportes/administrativos/compras/devoluciones-al-proveedor"
                    },
                    {
                        displayName: "Cotización al proveedor",
                        route: "/app/reportes/administrativos/compras/cotizaciones-al-proveedor"
                    }
                ]
            },
            {
                displayName: "Inventario",
                children:[
                    {
                        displayName: "Stock disponible",
                        route: "/app/reportes/administrativos/inventario/lista-stock-disponible"
                    },
                    {
                        displayName: "Compras vs. ventas",
                        route: "/app/reportes/administrativos/inventario/compras-vs-ventas"
                    }
                ]
            },
            {
                displayName: "Caja Banco",
                children:[
                    {
                        displayName: "Disponibilidad flujo de caja",
                        route: "/app/reportes/administrativos/caja-banco/flujo-caja"
                    },
                    {
                        displayName: "Movimientos de banco",
                        children: [
                            {
                                displayName: "Por número",
                                route: "/app/reportes/administrativos/caja-banco/movimientos-banco-numero"
                            },
                            {
                                displayName: "Por formato digital",
                                route: "/app/reportes/administrativos/caja-banco/flujo-caja"
                            }
                        ]
                    },
                    {
                        displayName: "Formato orden de pago",
                        route: "/app/reportes/administrativos/caja-banco/ordenes-pago"
                    }
                ]
            }
        ]
    },
    {
        displayName: "Contables",
        iconName: "university",
        flag: "reportes",
        children:[
            {
                displayName: "EEFF",
                children:[
                    {
                        displayName: "Balance",
                        children: [
                            {
                                displayName: "De comprobación",
                                route: "/app/reportes/contables/balance/comprobacion"
                            },
                            {
                                displayName: "General",
                                route: "/app/reportes/contables/balance/general"
                            },
                            {
                                displayName: "General Mensual",
                                route: "/app/reportes/contables/balance/general-mensual"
                            }
                        ]
                    },
                    {
                        displayName: "Ganancias y pérdidas",
                        children: [
                            {
                                displayName: "General",
                                route: "/app/reportes/contables/ganancia-perdida/ganancia-perdida"
                            },
                            {
                                displayName: "Por Meses",
                                route: "/app/reportes/contables/ganancia-perdida/ganancia-perdida-mensual"
                            }
                        ]
                    },
                ]
            }
        ]
    },
    {
        displayName: "Nómina",
        iconName: "user",
        flag: "reportes",
        children:[
            {
                displayName: "Recibo Nómina",
                route: "/app/reportes/nomina/recibo-nomina"
            },
            {
                displayName: "Estados de cuenta",
                children:[
                    {
                        displayName: "Prestaciones",
                        route: "/app/reportes/nomina/estado-cuenta/prestaciones"
                    },
                    {
                        displayName: "Préstamos",
                        route: "/app/reportes/nomina/estado-cuenta/prestamo"
                    },
                    {
                        displayName: "Utilidades",
                        route: "/app/reportes/nomina/estado-cuenta/utilidades"
                    }
                ]
            }
        ]
    },
    {
        displayName: "Gerencial",
        iconName: "chart-line",
        flag: "reportes",
        children:[
            {
                displayName: "Administrativo",
                children:[
                    {
                        displayName: "Reporte de tesorería",
                        route: "/app/reportes/gerenciales/administrativos/tesoreria"
                    },
                    {
                        displayName: "Todos administrativo",
                        route: "/app/reportes/gerenciales/administrativos/todos"
                    }
                ]
            },
            {
                displayName: "Comercial",
                children:[
                    {
                        displayName: "Reportes de ventas",
                        route: "/app/reportes/gerenciales/comercial/ventas"
                    },
                    {
                        displayName: "Reportes de compras",
                        route: "/app/reportes/gerenciales/comercial/compras"
                    },
                    {
                        displayName: "Todos comercial",
                        route: "/app/reportes/gerenciales/comercial/todos"
                    }
                ]
            },
            {
                displayName: "Reporte de auditoría",
                route: "/app/reportes/nomina/recibo-nomina"
            },
            {
                displayName: "Todos gerencial",
                route: "/app/reportes/nomina/recibo-nomina"
            }
        ]
    }
]