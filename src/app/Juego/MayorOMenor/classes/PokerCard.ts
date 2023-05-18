export class PokerCard{
  image_url:string;
  value:number;
  remaining:number;
  success:boolean;
  constructor(success:boolean, image_url:string, remaining:number, value:number){
    this.image_url = image_url;
    this.success = success;
    this.remaining = remaining;
    this.value = value;
  }

}
