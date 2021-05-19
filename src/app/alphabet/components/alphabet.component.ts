import { Component, OnInit } from '@angular/core';
import {AlphabetService} from '../services/alphabet.service';
import Speech from 'speak-tts';


@Component({
  selector: 'app-alphabet',
  templateUrl: './alphabet.component.html',
  styleUrls: ['./alphabet.component.css']
})
export class AlphabetComponent implements OnInit {

  public letters: string[] = ['?', '?', '?', '?'];
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


  private speech = new Speech();


  private colors = [
    '--sizzling-red',
    '--sunglow',
    '--yellow-green',
    '--royal-purple'
  ];

  constructor(private service: AlphabetService) { }

  ngOnInit(): void {
    this.speech.init({
      volume: 1,
      lang: 'sv-SE',
      rate: 1,
      pitch: 1,
    });

  }

  startGame(): void {
    this.newLetters();
    this.speak(`Hej Casper. Nu ska vi spela ett spel! Tryck på bokstaven ${this.correctLetter}`);
    this.gameOngoing = true;
    this.firstGame = false;
  }

  playAgain(): void {
    this.nbrOfCorrectGuesses = 0;
    this.nbrOfGuesses = 0;
    this.newLetters();
    this.speak(`Vi spelar en gång till! Tryck på bokstaven ${this.correctLetter}`);
    this.gameOngoing = true;
  }


  speak(text: string): void {
    this.speech.speak({text});

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
    this.speak(this.getPhrase(this.correct));

    this.active = false;
    if (this.nbrOfGuesses < this.nbrOfQuestions) {

      setTimeout(() => {
        this.newLetters();
        this.speak(`Tryck på bokstaven ${this.correctLetter}`);
      }, 2000);
    } else {
      this.gameOver();
    }




  }

  newLetters(): void {
    this.guessedLetter = null;
    this.letters = this.service.getRandomLetters(4);
    this.correctLetter = this.letters[Math.floor(Math.random() * 4)];
    this.active = true;
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

  gameOver(): void {
    this.gameOngoing = false;

    this.speak('Spelet är slut.');
    this.speak(this.getEndPhrase(this.nbrOfCorrectGuesses, this.nbrOfQuestions));
    this.speak(`Du klarade ${this.nbrOfCorrectGuesses} av ${this.nbrOfQuestions}`);

    this.gameOverText = `Du klarade ${this.nbrOfCorrectGuesses} av ${this.nbrOfQuestions}`;
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
