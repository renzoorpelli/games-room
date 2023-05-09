import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UsuarioRoutingModule } from '../routing/usuario-routing.module';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { UsuarioService } from '../services/usuario.service';
import { FormModule } from 'src/app/Common/Form/form.module';
import { UsuarioRepositoryService } from '../services/usuario-repository.service';
import { AuthGuardService } from '../services/auth.service';
import { UsuarioLogService } from '../Logs/services/usuario-log.service';
import { NoAuthGuardService } from '../services/noauth.service';
import { ProfileComponent } from '../components/profile/profile.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    ReactiveFormsModule,
    FormModule
  ],
  providers: [
    UsuarioService,
    UsuarioRepositoryService,
    AuthGuardService,
    NoAuthGuardService,
    UsuarioLogService
  ]

})
export class UsuarioModule { }
