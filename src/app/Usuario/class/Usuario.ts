export class Usuario{

  public _nombre:string;
  public _email:string;
  public _password:string;

  public idUsuarioDocRef?:string;

  public idUsuarioUid?:string;

  get nombre():string{
    return this._nombre;
  }

  get email():string{
    return this._email;
  }
  get password():string{
    return this._password;
  }
  constructor(nombre:string, email:string, password:string){
    this._nombre = nombre;
    this._email = email;
    this._password = password;
  }


}
