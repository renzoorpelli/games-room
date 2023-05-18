import { Component } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../class/Usuario';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm!: FormGroup;

  ngOnInit(): void {
    this.createForm();
  }

  constructor(private _usuarioService: UsuarioService, private _router: Router) {}

  createForm() {
    this.registerForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(80)]),
      email: new FormControl('', [Validators.email, Validators.required, ]),
      confirmEmail: new FormControl('', [this.EmailValidator(), Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  // getters that references to formGroup elements
  get nombre(){
    return this.registerForm.get('nombre');
  }

  get email(){
    return this.registerForm.get('email')
  }

  get confirmEmail(){
    return this.registerForm.get('confirmEmail');
  }

  get password(){
    return this.registerForm.get('password');
  }

  //metodo encargado de manejar el evento submit que recibe del formsModule
  onSubmitEventHandler($event: Usuario) {
    const user = new Usuario($event.nombre, $event.email, $event.password);
    let respuesta = this._usuarioService.register(user);

    respuesta.then((response) => {
      if(response.valido){
        this.alertaMensajeSucces(response.mensaje);
        this._usuarioService.setUserToLocalStorage(user);
        this._router.navigate(['']);
      }else{
        this.alertaMensajeError(response.mensaje);
      }

    })
  }

  // metodo encargado de verficar que el mail con el que se intenta registrar el usuario sea igual
  //
  EmailValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {

      return formGroup.get('email')?.value === formGroup.get('confirmEmail')?.value
      ? null
      : {"notEqual" : true}
    };
  }
  alertaMensajeSucces(mensaje: string): void {
    Swal.fire({
      title: 'Sucess!',
      text: mensaje,
      icon: 'success',
      confirmButtonText: 'Aceptar'//,
      //confirmButtonAriaLabel: '<a routerLink="usuario/login"></a>',
    });
  }

  alertaMensajeError(mensaje: string): void {
    Swal.fire({
      title: 'Error!',
      text: mensaje,
      icon: 'error',
      confirmButtonText: 'Aceptar',
    });
  }
}
