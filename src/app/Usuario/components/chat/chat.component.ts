import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsuarioChatRepositoryService } from '../../services/usuario-chat-repository.service';
import { Mensaje } from '../../interface/mensaje';
import { Subscription } from 'rxjs';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy{
  isChatOpen = true; //TODO PONER EN FALSE
  listadoMensajes!: Mensaje[];
  subscription!:Subscription;

  public currentMessage!: string;

  constructor(private _usuarioChatRepository:UsuarioChatRepositoryService, private _usuarioService: UsuarioService){}

  ngOnInit(): void {
    if(!this.subscription){
      this.subscription = this._usuarioChatRepository.getAll().subscribe((data) => {
        this.listadoMensajes = data;
        this.listadoMensajes.sort((a, b) => a.fecha.getTime() - b.fecha.getTime());
      })
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  sendMessage(){
    if(this.currentMessage != ""){
      const currentUser = this._usuarioService.getCurrentUserLocalStorage();

      const message: Mensaje = {
        usuario: currentUser!._nombre,
        contenido: this.currentMessage,
        fecha: new Date()
      }
      this._usuarioChatRepository.create(message, "");
      this.currentMessage = "";
    }
  }
}
