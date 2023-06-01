import { Component } from '@angular/core';
import { UsuarioService } from './Usuario/services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SalaDeJuegos';

  constructor(private usuarioService:UsuarioService){}

  userLoggedIn():boolean{
    return this.usuarioService.isLoggedIn();
  }
}
