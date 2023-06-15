export class useer {
  _id?: string;
  id?: string;
  role?: string;
  metodosDePago?: string;
  telefono?: string;
  nombre?: string;
  email?: string;
  username?: string;
  cumpleanos?: string;
  contrasena?: string;
  departamento?: string;
  ciudad?: string;
  direccion?: string;
  complemento?: string;
  codigoPostal?: string;

  constructor(
    _id = '',
    id = '',
    role = '',
    metodosDePago = '',
    telefono = '',
    nombre = '',
    email = '',
    username = '',
    cumpleanos = '',
    contrasena = '',
    departamento = '',
    ciudad = '',
    direccion = '',
    complemento = '',
    codigoPostal = ''
  ) {
    this._id = _id;
    this.id = id;
    this.role = role;
    this.metodosDePago = metodosDePago;
    this.telefono = telefono;
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
  }
}
