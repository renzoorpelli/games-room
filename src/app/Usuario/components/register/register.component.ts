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
      nombre: new FormControl(''),
      // email: new FormControl('', {
      //   asyncValidators: this.userExistAsyncValidator(),
      //   updateOn: "blur"
      // }),
      email: new FormControl(''),
      confirmEmail: new FormControl(''),
      password: new FormControl(''),
    });
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
      let mail = formGroup.get('mail');
      let confirmEmail = formGroup.get('confirmEmail');
      let response = { response: 'los mail no son iguales' };

      if (mail?.value === confirmEmail?.value) {
        formGroup.get('confirmEmail')?.setErrors(null);
        return null;
      }

      formGroup.get('confirmEmail')?.setErrors(response);
      return response;
    };
  }

  // validador asincrono, encargado de verificar que el mail con el que se intenta registrar el usuario
  // no exista en la base de datos
  userExistAsyncValidator(): AsyncValidatorFn {
    let error: ValidationErrors = [];
    return async (
      control: AbstractControl
    ): Promise<ValidationErrors | null> => {
      console.log('pregunto al validador');
      if (await this._usuarioService.userExist(control.value)) {
        console.log('entro al validador');
        error = [{ error: 'el mail ingresado ya existe' }];
        return error;
      }
      return null;
    };
  }

  alertaMensajeSucces(mensaje: string): void {
    Swal.fire({
      title: 'Sucess!',
      text: mensaje,
      icon: 'success',
      confirmButtonText: 'Aceptar',
      confirmButtonAriaLabel: '<a routerLink="usuario/login"></a>',
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
