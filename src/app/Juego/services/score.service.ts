import { Injectable } from '@angular/core';
import { UsuarioService } from 'src/app/Usuario/services/usuario.service';
import { GameScoreRepositoryService } from './game-score-repository.service';

@Injectable({
  providedIn: 'root'
})

export class ScoreService{

  constructor(private _usuarioService: UsuarioService, private _gameScoreRepository: GameScoreRepositoryService){}


  saveScore(juego:string, puntaje:number, resultado:string, fecha:Date):boolean{

    const currentUser = this._usuarioService.getCurrentUserLocalStorage();

    if(currentUser == null){
        return false;
    }

    if(this._gameScoreRepository.create({
      nombreJuego: juego,
      puntajeJuego:puntaje,
      resultadoJuego: resultado,
      fechaPartida: fecha
    })){
      return true;
    }

    return false;

  }
}
