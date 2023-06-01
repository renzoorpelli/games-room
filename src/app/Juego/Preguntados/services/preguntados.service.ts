import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../interfaces/Question';



@Injectable({
  providedIn: 'root'
})
export class PreguntadosService {

  URL_BASE:string = "https://the-trivia-api.com/v2/questions";
  constructor(private _httpClient:HttpClient) { }

  getRandomSetOfQuestions(): Observable<Question[]>{
    return this._httpClient.get(this.URL_BASE) as Observable<Question[]>;
  }
}
