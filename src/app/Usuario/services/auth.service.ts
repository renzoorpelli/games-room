import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private _usuarioService: UsuarioService, private router: Router) {}

  canActivate(): boolean {
    if (this._usuarioService.isLoggedIn()) {
      return true;
    }else{
      this.router.navigate(['usuario/login']);
      return false;
    }
  }
}
