import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioRepositoryService } from '../../services/usuario-repository.service';
import { Usuario } from '../../class/Usuario';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  //TODO hacer login y registro bien la logica
  //TODO chequear los validators

  loginForm!:FormGroup;

  ngOnInit(): void {
      this.createForm();
  }

  constructor(private _usuarioService:UsuarioService, private _router: Router){}

  createForm(){
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    })
  }

  // getters that references to a formGroup Elements
  get mail(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }

  onSubmitEventHandler($event:Usuario){
    let respuesta = this._usuarioService.login($event);
    respuesta.then(response => {
      if(response.valido){
        this.alertaMensajeSucces(response.mensaje)
        this._router.navigate(['home']);
      }else{
        this.alertaMensajeError(response.mensaje)
      }
    });
  }


  // TODO esto tiene que estar en en el formulario de alta y register
  alertaMensajeSucces(mensaje:string):void{
    Swal.fire(
      {
        title: 'Sucess!',
        text: mensaje,
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonAriaLabel: '<a routerLink="usuario/login"></a>'}
    )
   }

   alertaMensajeError(mensaje:string):void{
    Swal.fire({
      title: 'Error!',
      text: mensaje,
      icon: 'error',
      confirmButtonText: 'Aceptar'}
    )
   }

}
