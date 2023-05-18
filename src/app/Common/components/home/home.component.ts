import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/Usuario/class/Usuario';
import { UsuarioService } from 'src/app/Usuario/services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  //el usuario desde el local Storage
  _userFromLocalStorage?: Usuario | null;
  favIcon: HTMLLinkElement | null = document.querySelector('#appIcon');

  CUSTOM_FAVICON_URL:string = "../../../../assets/imagenes/favicon/gaming.svg";

  ngOnInit(): void {
      this.favIcon!.href = this.CUSTOM_FAVICON_URL;
  }

  constructor(private _usuarioService:UsuarioService){
    this._userFromLocalStorage = this._usuarioService.getCurrentUserLocalStorage();
  }

}
