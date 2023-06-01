import { Component, OnInit } from '@angular/core';
import { ScoreService } from '../../services/score.service';

@Component({
  selector: 'app-pong',
  templateUrl: './pong.component.html',
  styleUrls: ['./pong.component.css'],
})
export class PongComponent implements OnInit {
  // Game variables
  canvas!: HTMLCanvasElement;
  context?: CanvasRenderingContext2D;
  paddleHeight = 100;
  paddleWidth = 10;
  ballSize = 10;
  paddleLeftY = 40;
  paddleRightY = 40;
  ballX = 50;
  ballY = 50;
  ballSpeedX = 5;
  ballSpeedY = 5;
  gameStarted = false;
  pointsPlayerOne = 0;
  pointsPlayerTwo = 0;
  isFinished = false;
  attempts = 2;

  constructor(private _scoreService:ScoreService){}

  ngOnInit(): void {
    this.canvas = document.getElementById('pongCanvas') as HTMLCanvasElement;
    this.context = this.canvas.getContext('2d')!;
  }


  startGame() {
    this.gameStarted = true;

    setInterval(() => this.move(), 1000 / 60);

    this.canvas.addEventListener('mousemove', (event) =>
      this.handleMouse(event)
    );
  }

  finishGame(){
    this.isFinished = true;
    if(this.pointsPlayerOne > this.pointsPlayerTwo){
      this._scoreService.saveScore("Pong!", this.pointsPlayerOne, "GANADADOR JUGADOR 1", new Date());
    }else if(this.pointsPlayerOne < this.pointsPlayerTwo){
      this._scoreService.saveScore("Pong!", this.pointsPlayerTwo, "GANADADOR JUGADOR 2", new Date());
    }else{
      this._scoreService.saveScore("Pong!", this.pointsPlayerTwo, "EMPATE", new Date());
    }
  }

  resetGame(){
    this.gameStarted = true;
    this.attempts = 5;
    this.isFinished = false;
    this.pointsPlayerOne = 0;
    this.pointsPlayerTwo = 0;
  }


  draw() {
    // Clear the canvas
    this.context!.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw left paddle
    this.context!.fillStyle = '#fff';
    this.context!.fillRect(
      0,
      this.paddleLeftY,
      this.paddleWidth,
      this.paddleHeight
    );

    // Draw right paddle
    this.context!.fillStyle = '#fff';
    this.context!.fillRect(
      this.canvas.width - this.paddleWidth,
      this.paddleRightY,
      this.paddleWidth,
      this.paddleHeight
    );

    // Draw ball
    this.context!.fillStyle = '#fff';
    this.context!.beginPath();
    this.context!.arc(
      this.ballX,
      this.ballY,
      this.ballSize,
      0,
      Math.PI * 2,
      true
    );
    this.context!.closePath();
    this.context!.fill();
  }

  move() {

    if(this.isFinished){
      return;
    }

    // Move paddles
    this.ballX += this.ballSpeedX;
    this.ballY += this.ballSpeedY;

    // Collision detection with paddles
    if (this.ballY - this.ballSize < 0 || this.ballY + this.ballSize > this.canvas.height) {
      this.ballSpeedY = -this.ballSpeedY;
    }

    if (
      this.ballX - this.ballSize < this.paddleWidth &&
      this.ballY > this.paddleLeftY &&
      this.ballY < this.paddleLeftY + this.paddleHeight
    ) {
      this.ballSpeedX = -this.ballSpeedX;
    }

    if (
      this.ballX + this.ballSize > this.canvas.width - this.paddleWidth &&
      this.ballY > this.paddleRightY &&
      this.ballY < this.paddleRightY + this.paddleHeight
    ) {
      this.ballSpeedX = -this.ballSpeedX;
    }

    // Check if the ball went past the right side of the canvas
    if (this.ballX + this.ballSize > this.canvas.width) {
      this.pointsPlayerOne+=5; // Increment Player One's score
      this.resetBall(); // Reset the ball position
      this.attempts--;
    }

    // Check if the ball went past the legt side of the canvas
    if(this.ballX - this.ballSize < 0){
      this.pointsPlayerTwo+=5;
      this.resetBall(); // Reset the ball position
      this.attempts--;
    }

    if(this.attempts === 0){
      this.finishGame();
    }

    this.draw();
  }

  handleMouse(event: MouseEvent) {
    const rect = this.canvas.getBoundingClientRect();
    const root = document.documentElement;
    const mouseY = event.clientY - rect.top - root.scrollTop;

    this.paddleLeftY = mouseY - this.paddleHeight / 2;
    this.paddleRightY = this.canvas.height - this.paddleLeftY - this.paddleHeight; // Calculate the position of the right paddle
  }

  resetBall(){
    this.ballX = this.canvas.width / 2;
    this.ballY = this.canvas.height / 2;
    this.ballSpeedX =- this.ballSpeedX;
    this.ballSpeedY = Math.random() > 0.5 ? -5 : 5; // Randomize the ball's initial Y direction
  }
}
