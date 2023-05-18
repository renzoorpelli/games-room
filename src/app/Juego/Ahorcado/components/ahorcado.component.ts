import { Component } from '@angular/core';
import { AhorcadoService } from '../services/ahorcado.service';
import { ScoreService } from '../../services/score.service';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent {
  basePathImage = '/assets/imagenes/juegos/ahorcado/hanged_';
  imagesName: string[] = [];

  defaultImage = `${this.basePathImage}6.png`
  keyboard = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R','S', 'T','U', 'V', 'W', 'X', 'Y', 'Z'];
  attempts = 6;
  points = 0;
  unknownWord!: any;
  unknownWordHidden:string= "";
  usedLetters: string[] = [];
  clueMessage = '';
  isWinner = false;
  isLoser = false;

  allScores: any;

  constructor(private ahorcadoService: AhorcadoService, private _scoreService: ScoreService) {
  }

  ngOnInit(): void {
    this.selectWord();
  }


  private generateImages(attempt: number): void {
    if (attempt < 0) {
      return;
    }
    const image = `${this.basePathImage}${attempt}.png`;
    this.imagesName = [];
    this.imagesName.push(image);
  }

  getRandomWord(): any {
    return this.ahorcadoService.availableWords[Math.floor(Math.random() * this.ahorcadoService.availableWords.length)];
  }


  resetGame(): void {
    this.clueMessage = '';
    this.isWinner = false;
    this.isLoser = false;
    this.attempts = 6;
    this.points = 0;
    this.usedLetters = [];
    this.unknownWord = "";
    this.unknownWordHidden = "";
    this.selectWord();
  }

  private selectWord(): void {
    this.unknownWord = this.getRandomWord();
    for (let i = 0; i < this.unknownWord.word.length; i++) {
        this.unknownWordHidden += '-';
    }
    console.log(this.unknownWord);
  }


  private verify(letra:string){
      const matches = []
      if(this.unknownWord.word.indexOf(letra) > -1){
        const indexes = [];
        for (let i = 0; i < this.unknownWord.word.length; i++) {
          if(this.unknownWord.word[i] === letra){
            // guardo los indices de al letra que machea con la de la palabra
            indexes.push(i);
          }
        }
        // guardo lso match con los indices
        matches.push({
          position: indexes,
          match: true
        });
      }else{
        matches.push({
          match:false
        });
      }
      return matches;
  }


  try(letra:string){
     const resultado = this.verify(letra);
     if(!resultado[0].match){
        if(this.attempts > 0){
          this.attempts-=1
        }else{
          this.attempts = 0;
        }
        // en caso de no ser correcta la letra, genero la imagen
        this.generateImages(this.attempts);
     }else{
        for(const pos of resultado[0].position!){
            this.swap(letra, pos);
        }
        this.points += 5;
     }
     this.usedLetters.push(letra);

     this.evaluate()
  }

  // intercambia una letra en la posicion de la palabra indicada
  swap(letra:string, posicion:number){
      const wordChars = [...this.unknownWordHidden];
      wordChars[posicion] = letra;
      this.unknownWordHidden = wordChars.join('');
    }


  private evaluate():void{

    console.log(this.unknownWordHidden.indexOf('-') === -1)

    if(this.unknownWordHidden.indexOf('-') === -1 && this.attempts > 0){
      this.isWinner = true;
    }

    if(this.attempts < 1){
      this.isLoser = true;
    }

    if(this.isLoser){
      this._scoreService.saveScore("Ahorcado", this.points, "partida perdida", new Date())
    }

    if(this.isWinner){
      this._scoreService.saveScore("Ahorcado", this.points, "partida ganada", new Date())
    }

    if(this.isLoser || this.isWinner){
      this.usedLetters = this.keyboard;
    }


  }

  hiddenLetterExist(letra:string){
    return this.usedLetters.includes(letra);
  }
}
