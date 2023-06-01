import { Component, OnDestroy, OnInit } from '@angular/core';
import { PreguntadosService } from '../services/preguntados.service';
import { Question } from '../interfaces/Question';
import { Subscription } from 'rxjs';
import { ScoreService } from '../../services/score.service';
@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent implements OnInit, OnDestroy{

  questionsFromService?: Question[];
  shuffledAnswers?:string[];
  currentQuestion?:Question;
  private _subscription!:Subscription;
  gameStarted = false;
  attemps = 0;
  hits = 0;
  points =0;
  guessed = false;
  notGuessed = false;
  isFinished = false;

  ngOnInit(): void {
    if(!this._subscription){
      this._subscription = this._preguntadosService.getRandomSetOfQuestions().subscribe((data) => {
          this.questionsFromService = data;
            this.attemps = data.length;
      });
    }
  }
  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
  constructor(private _preguntadosService: PreguntadosService, private _scoreService:ScoreService){
  }

  startGame(){
    this.gameStarted = true;
    if(this.questionsFromService!.length > 0){
      this.chooseAlternativeQuestion();
    }
  }

  shuffleAnswers(){
     const answersToArr: string[] = this.currentQuestion!.incorrectAnswers;
     answersToArr!.push(this.currentQuestion!.correctAnswer!);

     for (let i = 0; i < answersToArr.length; i++) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [answersToArr[i], answersToArr[randomIndex]] = [answersToArr[randomIndex], answersToArr[i]];
     }

     this.shuffledAnswers = answersToArr;
  }

  checkAnswer(currentAnswer:string){
    if(currentAnswer.trim() === this.currentQuestion!.correctAnswer.trim()){
      this.guessed = true;
      this.notGuessed = false;
      this.hits += 1;
      this.points += 5;
    }else{
      this.notGuessed = true;
      this.guessed = false;
    }

    if(this.attemps > 0){
      this.attemps -= 1;
    }

    if(this.attemps === 0){
      this.isFinished = true;
      this._scoreService.saveScore("Preguntados", this.points, "No corresponde", new Date())
    }else{
      this.chooseAlternativeQuestion();
    }


  }

  chooseAlternativeQuestion(){
    this.currentQuestion =  this.questionsFromService![Math.floor(Math.random() * this.questionsFromService!.length)];
    this.shuffleAnswers();
  }

  resetGame(){
    this.attemps = this.questionsFromService!.length;
    this.points = 0;
    this.guessed = false;
    this.notGuessed = false;
    this.isFinished = false;
    this.chooseAlternativeQuestion();
  }


}
