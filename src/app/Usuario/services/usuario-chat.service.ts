import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword

} from '@angular/fire/auth';

import { Usuario } from '../class/Usuario';
import { BehaviorSubject, Subject, Subscription, Observable } from 'rxjs';
import { UsuarioRepositoryService } from './usuario-repository.service';
import { UsuarioLogService } from '../Logs/services/usuario-log.service';
import { FirebaseError } from '@angular/fire/app';
import { Mensaje } from '../interface/mensaje';


@Injectable({
  providedIn: 'root',
})
export class UsuarioChatService {


}
