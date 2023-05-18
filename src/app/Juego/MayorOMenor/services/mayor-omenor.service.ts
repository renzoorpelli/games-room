import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

import {PokerCard} from '../interfaces/poker-card.interface'

@Injectable({
  providedIn: 'root'
})
export class MayorOMenorService {
  private urlBase:string = "https://deckofcardsapi.com/api/deck/new/draw/?";
  constructor(private _httpClient:HttpClient) { }

  getTheDeck(cardsQuantity:number): Observable<PokerCard>{
    return this._httpClient.get(this.urlBase + "deck_count=1&" + "count=" + cardsQuantity) as Observable<PokerCard>;
  }
}
