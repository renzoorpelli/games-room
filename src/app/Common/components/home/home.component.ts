import { Component } from '@angular/core';
import { Usuario } from 'src/app/Usuario/class/Usuario';
import { UsuarioService } from 'src/app/Usuario/services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  //el usuario desde el local Storage
  _userFromLocalStorage?: Usuario | null;

  constructor(private _usuarioService:UsuarioService){
    this._userFromLocalStorage = this._usuarioService.getCurrentUserLocalStorage();
  }

}
