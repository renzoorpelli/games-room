import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../class/Usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  userFromLocalStorage?:Usuario | null;
  ngOnInit(): void {
    this.userFromLocalStorage = this._userService.getCurrentUserLocalStorage();
  }

  constructor(private _userService: UsuarioService, private _router: Router){}

  logOut(){
    this.userFromLocalStorage = undefined;
    this._userService.deleteUserFromLocalStorage();
    this._router.navigate(['usuario/login'])
  }
}
