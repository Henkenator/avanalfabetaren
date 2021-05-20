import { Component, OnInit } from '@angular/core';
import {LetterService} from '../../services/letter.service';
import {SpeakService} from '../../services/speak.service';


@Component({
  selector: 'app-guess-letter',
  templateUrl: './guess-letter.component.html',
  styleUrls: ['./guess-letter.component.css']
})
export class GuessLetterComponent implements OnInit {

  public letters: string[];
  public correctLetter: string;
  public guessedLetter: string;
  public correct;
  public nbrOfQuestions = 5;
  public nbrOfGuesses = 0;
  public nbrOfCorrectGuesses = 0;
  public gameOverText;
  public active = false;
  public gameOngoing = false;
  public firstGame = true;
  public caseFilter = 'uppercase';
  public correctPhrases = [
    'Snyggt!',
    'Bra jobbat!',
    'Duktigt!',
    'Du kan ju det här!',
  ];
  public wrongPhrases = [
    'Tyvärr!',
    'Nej!',
    'Attans!',
    'Synd!'
  ];

  private colors = [
    '--sizzling-red',
    '--sunglow',
    '--yellow-green',
    '--royal-purple'
  ];

  constructor(private service: LetterService,
              private speakService: SpeakService) { }

  ngOnInit(): void {
    this.speakService.speak(`Nu ska vi spela 'Gissa rätt bokstav'. Tryck på play-knappen för att börja`, true);
    this.resetGame();
  }

  startGame(): void {
    this.firstGame = false;
    this.gameOngoing = true;
    this.setupTurn();
  }

  setupTurn(): void {
    this.newLetters();
    this.active = true;
    this.speakService.speak(`Tryck på bokstaven ${this.correctLetter}`, true);
  }

  gameOver(): void {
    this.gameOngoing = false;

    this.speakService.speak('Spelet är slut.');
    this.speakService.speak(this.getEndPhrase(this.nbrOfCorrectGuesses, this.nbrOfQuestions));
    this.speakService.speak(`Du klarade ${this.nbrOfCorrectGuesses} av ${this.nbrOfQuestions}`);

    this.gameOverText = `Du klarade ${this.nbrOfCorrectGuesses} av ${this.nbrOfQuestions}`;
  }

  playAgain(): void {
    this.speakService.speak(`Vi spelar en gång till!`, true);
    this.resetGame();
    setTimeout(() => {
      this.startGame();
    }, 2000);
  }

  resetGame(): void {
    this.nbrOfCorrectGuesses = 0;
    this.nbrOfGuesses = 0;
    this.letters = ['?', '?', '?', '?'];
  }

  selectLetter(guess: string): void {

    this.nbrOfGuesses++;
    this.guessedLetter = guess;

    if (this.guessedLetter === this.correctLetter) {
      this.correct = true;
      this.nbrOfCorrectGuesses++;
    } else {
      this.correct = false;
    }
    this.speakService.speak(this.getPhrase(this.correct));

    this.active = false;

    if (this.nbrOfGuesses < this.nbrOfQuestions) {
      setTimeout(() => {
       this.setupTurn();
      }, 2000);
    } else {
      this.gameOver();
    }

  }

  newLetters(): void {
    this.guessedLetter = null;
    this.letters = this.service.getRandomLetters(4);
    this.correctLetter = this.letters[Math.floor(Math.random() * 4)];
  }

  getColor(letter, button, index: number): string {
    if (letter === this.correctLetter || this.active) {
      return `var(${this.colors[index]})`;
    }
    if (button) {
      return 'darkgrey';
    }
    return 'grey';
  }

  switchCase(): void {
    this.caseFilter = this.caseFilter === 'uppercase' ? 'lowercase' : 'uppercase';
  }


  getPhrase(correct: boolean): string {
    if (correct){
      return this.correctPhrases[Math.floor(Math.random() * this.correctPhrases.length)];
    } else {
      return this.wrongPhrases[Math.floor(Math.random() * this.wrongPhrases.length)];
    }
  }

  getEndPhrase(correctGuesses: number, nbrOfQuestions: number): string {
    if (correctGuesses === nbrOfQuestions) {
      return 'Wow! Alla rätt! Superduktigt!';
    } else if (correctGuesses - 1 === nbrOfQuestions) {
      return 'Det här gick ju galant! Nästan alla rätt!';
    } else if (correctGuesses / nbrOfQuestions > 0.5) {
      return 'Inte fy skam.';
    } else {
      return 'Vill du öva lite till?';
    }
  }


}
