import { Component, OnInit } from '@angular/core';
import { MayorOMenorService } from '../services/mayor-omenor.service';
import { ScoreService } from '../../services/score.service';
import { PokerCard } from '../classes/PokerCard';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mayor-omenor',
  templateUrl: './mayor-omenor.component.html',
  styleUrls: ['./mayor-omenor.component.css']
})
export class MayorOMenorComponent implements OnInit {

  currentCard!: PokerCard;
  cards: PokerCard[] = [];
  points = 0;
  attempts = 0;
  hits = 0;
  TOTAL_CARDS:number = 36;
  subscription?: Subscription;
  guessed:boolean = false;
  notGuessed:boolean = false;
  isFinished: boolean = false;

  ngOnInit(): void {
    if(!this.subscription){
      this.subscription = this._mayorOmenorService.getTheDeck(this.TOTAL_CARDS).subscribe(data => {
          for(const {index, value} of data.cards.map((value, index) => ({index, value}))){
            const currentValueOfCard = Number(data.cards[index].value);
            if(!isNaN(currentValueOfCard)){
              const curretPokerCard = new PokerCard(true, data.cards[index].image, (data.cards.length - index -1),  currentValueOfCard)
              this.cards.push(curretPokerCard);
            }
          }
      });
    }
  }

  constructor(private _mayorOmenorService: MayorOMenorService, private _scoreService: ScoreService){}


  initGame():void{
    this.TOTAL_CARDS-=1;
    // saco la ultima carta de mazo
    this.currentCard = this.cards.pop()!;
  }

  resetGame():void{
    this.TOTAL_CARDS = this.cards.length;
    this.points = 0;
    this.isFinished = false;
    this.guessed = false;
  }

  // 1 mayor
  // 0 menor
  guessCard(choice:number){

    const currentSelectedCard = this.cards.shift()!;

    if(this.cards.length > 1){
      // si la carta seleccionada es mayor a la carta seleccionada del mazo
      if(currentSelectedCard!.value > this.currentCard!.value  && choice === 1){
        this.guessed = true;
        this.notGuessed = false;
        this.points += 5;
        this.hits +=1;
      }

      // si la carta es mayor pero eleigio que es menor
      if(this.currentCard!.value > currentSelectedCard!.value && choice === 0){
        this.notGuessed = true;
        this.guessed = false;
      }

      // si la carta es menor pero eligio que es mayor
      if(currentSelectedCard!.value < this.currentCard!.value  && choice === 1 ){
        this.notGuessed = true;
        this.guessed = false;
      }

      // si la carta es menor y eligio que es menor
      if(this.currentCard!.value < currentSelectedCard!.value && choice === 0 ){
        this.guessed = true;
        this.notGuessed = false;
        this.points += 5;
        this.hits +=1;
      }

      this.attempts +=1;

      if(this.TOTAL_CARDS != 0){
        this.TOTAL_CARDS -= 1;
      }

      this.currentCard = currentSelectedCard;

      this.cards.push(currentSelectedCard);

      if(this.TOTAL_CARDS === 0){
        this.isFinished = true;

        this._scoreService.saveScore("Mayor o Menor", this.points, `intentos ${this.attempts}, aciertos ${this.hits}`, new Date())
      }


    }


  }

}
