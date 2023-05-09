import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword

} from '@angular/fire/auth';

import { Usuario } from '../class/Usuario';
import { BehaviorSubject, Subject, Subscription, Observable } from 'rxjs';
import { UsuarioRepositoryService } from './usuario-repository.service';
import { UsuarioLogService } from '../Logs/services/usuario-log.service';
import { FirebaseError } from '@angular/fire/app';


@Injectable({
  providedIn: 'root',
})
export class UsuarioService {


  listadoUsuariosModelo?: Usuario[];
  subscription?: Subscription;

  constructor(private afAuth: Auth,private _usuariosRepository: UsuarioRepositoryService, private _usuarioLogService: UsuarioLogService) {
    if(!this.subscription){
      this.subscription = this._usuariosRepository.listadoUsuarios$.subscribe((data) => {
        this.listadoUsuariosModelo =  data;
      });
    }
  }

  //metodo encargado de registrar un usuario que viene en el componente register
  async register(usuarioRegistro: Usuario): Promise<{mensaje:string, valido:boolean}> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.afAuth,
        usuarioRegistro.email,
        usuarioRegistro.password
      );
      this._usuariosRepository.create(usuarioRegistro, userCredential.user.uid);
      return {mensaje: "Usuario logueado correctamente", valido:true}

    } catch (err) {
      let errorMensaje = "Hubo un error al intentar registrarte";
      if(err instanceof FirebaseError){
        if(err.code == 'auth/email-already-in-use'){
            errorMensaje = "El email ingresado ya existe, ingrese otro";
        }
      }
      return {mensaje: errorMensaje, valido:false};
    }
  }

  // metodo encargado de inicar sesion
  async login(usuarioLogin: Usuario):Promise<{mensaje:string, valido:boolean}>{
    try{
      const userCredential = await signInWithEmailAndPassword(this.afAuth, usuarioLogin.email, usuarioLogin.password);

      //TODO arregalar el quilombo de los nombnres en la base de datos y en las propiedades, dejar todo public y a la mierda

      let usuario = this.listadoUsuariosModelo!.find(user => user._email == usuarioLogin.email)!;

      this.setUserToLocalStorage(usuario);

      this._usuarioLogService.log(usuario.idUsuarioUid!,usuario.idUsuarioDocRef!);

      return {mensaje: "Usuario logueado correctamente", valido:true}

      //return true;
    }catch(err){

      let errorMensaje = "Hubo un error al intentar iniciar sesión, intenta más tarde";
      if(err instanceof FirebaseError){
        switch(err.code){
          case 'auth/user-not-found':
            errorMensaje = "El usuario ingresado no existe"
          break;
          case "auth/wrong-password":
            errorMensaje = "La contraseña ingresada no es válida"
          break;
          case "auth/too-many-requests":
            errorMensaje = "Has excedido el limite de intentos de inicio de sesión"
          break;
        }
      }
      return {mensaje: errorMensaje, valido:false};
    }
  }

  async userExist(mail:string): Promise<Boolean | undefined>{
    return this.listadoUsuariosModelo?.some(usr => usr.email == mail);

  }

  // metodo encargado de actualizar los usuarios que se encuentran registrados en el local storage
  // si existe la key usuarios, limpia y aztualiza su contenido
  // si no existe la key, la crea con su contenido inicial
  refreshLocalStorage(data: Usuario[]){
    const userFromLocalStorage = localStorage.getItem('usuario');
    if(userFromLocalStorage == null){
       localStorage.setItem('usuario', JSON.stringify(data));
    }else{
      localStorage.clear();
      localStorage.setItem('usuario', JSON.stringify(data));
    }
  }

  // metodo utilizado para iniciar sesion
  setUserToLocalStorage(data: Usuario){
    const currentUserFromLocalStorage = localStorage.getItem('currentUser');
    let usrStringify = JSON.stringify(data);

    if(currentUserFromLocalStorage == null){
      localStorage.setItem('currentUser', usrStringify);
    }else{
      localStorage.removeItem('currentUser');
      localStorage.setItem('currentUser', usrStringify);
    }
  }

  //obtiene los datos del usuario que se encuentra con la sesion iniciada
  getCurrentUserLocalStorage():Usuario | null{
    const currentUserFromLocalStorage = localStorage.getItem('currentUser');
    if(currentUserFromLocalStorage != null){
      let usr = JSON.parse(currentUserFromLocalStorage);

      let usrToModel : Usuario = new Usuario(usr._nombre, usr._email, usr._password);

      return usrToModel;
    }
    return null;
  }

  // elimina el usuario que inicio sesion en el local storage
  deleteUserFromLocalStorage(): void{
    localStorage.removeItem('currentUser');
  }

  //verifica que el usuario haya inciaido sesion
  isLoggedIn(): boolean{
    return this.getCurrentUserLocalStorage() != null;
  }
}
