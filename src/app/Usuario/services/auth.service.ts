import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private _usuarioService: UsuarioService, private router: Router) {}


  //TODO HACER LOS DOS AUTHGUARDS UNO QUE PROTEGA LAS RUTAS LOGIN Y REGISTER. Y OTRO PARA CUANDO NO ESTA LOGUEADO LA MANDE A LOGIN

  // TODO  PARA EL INICAR SESION, VERIFICAR LA POSIBILIDAD DE HACER UN LINK A UNA SECCION LLAMADA "MI PERFIL" LA CUAL SOLO TENGA ACCESO SI EL USUARIO EXISTE EN EL LOCAL STORAGE Y SE CARGUE CON LSO DATOS DEL LOCAL STORAGE Y AHI PONER EL CERRAR SESION Y LISTO


  canActivate(): boolean {
    if (this._usuarioService.isLoggedIn()) {
      return true;
    }else{
      this.router.navigate(['usuario/login']);
      return false;
    }
  }
}
