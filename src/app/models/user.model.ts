export class User {
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
  telefono?: string;
  pedidos?: any[];

  constructor(
    nombre = '',
    email = '',
    username = '',
    cumpleanos = '',
    contrasena = '',
    departamento = '',
    ciudad = '',
    direccion = '',
    complemento = '',
    codigoPostal = '',
    telefono = '',
    pedidos = []
  ) {
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
    this.telefono = telefono;
    this.pedidos = []
  }
}
