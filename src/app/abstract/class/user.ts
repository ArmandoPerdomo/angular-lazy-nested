export class Empresa{
  constructor(
    public id: number,
    public nombre: string,
    public imagen: string,
    public codigoAdministrativo: string,
    public codigoContabilidad: string,
    public codigoNomina: string
  ){}
}

export class UsuarioEmpresa{
  constructor(
    public codigoVendedor: string,
    public codigoTrabajador: string,
    public codigoBeneficiario: string
  ){}
}


export class User {
  constructor(
    public id: number,
    public nombre: string,
    public apellido: string,
    public nombreUsuario: string,
    public imagen: string,
    public codigoAdministrativo: string,
    public fullname: string,
    public codigoNomina: string,
    public empresa?: Empresa,
    public usuarioEmpresa?: UsuarioEmpresa,
  ){
  }
}
