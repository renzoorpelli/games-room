import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { ChatComponent } from '../components/chat/chat.component';
import { UsuarioChatRepositoryService } from '../services/usuario-chat-repository.service';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    ReactiveFormsModule,
    FormModule,
    FormsModule
  ],
  providers: [
    UsuarioService,
    UsuarioRepositoryService,
    AuthGuardService,
    NoAuthGuardService,
    UsuarioLogService,
    UsuarioChatRepositoryService
  ],
  exports:[
    ChatComponent
  ]

})
export class UsuarioModule { }
