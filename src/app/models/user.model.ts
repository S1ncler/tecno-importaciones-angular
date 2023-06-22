export class User {
  _id: string;
  nombre?: string;
  email?: string;
  username?: string;
  cumpleanos?: Date;
  contrasena?: string;
  departamento?: string;
  ciudad?: string;
  direccion?: string;
  complemento?: string;
  codigoPostal?: string;
  telefono?: string;

  constructor(
    _id = '',
    nombre = '',
    email = '',
    username = '',
    cumpleanos = new Date('2023-06-22'),
    contrasena = '',
    departamento = '',
    ciudad = '',
    direccion = '',
    complemento = '',
    codigoPostal = '',
    telefono = ''
  ) {
    this._id = _id
    this.nombre = nombre;
    this.email = email;
    this.username = username;
    this.cumpleanos = cumpleanos;
    this.contrasena = contrasena;
    this.departamento = departamento;
    this.ciudad = ciudad;
    this.direccion = direccion;
    this.complemento = complemento;
    this.codigoPostal = codigoPostal;
    this.telefono = telefono
  }
}
