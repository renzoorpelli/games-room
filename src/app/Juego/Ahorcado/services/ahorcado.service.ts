import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AhorcadoService {
  public availableWords = [
    {
      word: 'PERA',
      clue: 'Es una fruta...'
    },
    {
      word: 'PAPA',
      clue: 'Es una fruta...'
    },
    {
      word: 'MOTOCICLETA',
      clue: 'Es una vehiculo de dos ruedas...'
    },
    {
      word: 'AUTO',
      clue: 'Es vehiculo de cuatro ruedas...'
    },
    {
      word: 'PERRO',
      clue: 'Es un animal domestico...'
    },
    {
      word: 'GATO',
      clue: 'Es un animal felino...'
    },
    {
      word: 'ELEFANTE',
      clue: 'Es un animal de gran tamaño...'
    }
  ];

  constructor() { }

}
