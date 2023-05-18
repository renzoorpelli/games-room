export interface PokerCard {
  cards:     Card[];
  deck_id:   string;
  remaining: number;
  success:   boolean;
 }

 export interface Card {
  code:   string;
  image:  string;
  images: Images;
  suit:   Suit;
  value:  string;
 }

 export interface Images {
  png: string;
  svg: string;
 }

 export enum Suit {
  Clubs = "CLUBS",
  Diamonds = "DIAMONDS",
  Hearts = "HEARTS",
  Spades = "SPADES",
 }
