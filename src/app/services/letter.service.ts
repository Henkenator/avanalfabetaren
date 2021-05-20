import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LetterService {

  private letters: string[] = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
    'q', 'r', 's', 't', 'u', 'v', 'w', 'x',
    'y', 'z', 'å', 'ä', 'ö',
  ];


  constructor() { }


  getRandomLetters(nbr: number = 4): string[] {

    const randomNumbers = [];

    while (randomNumbers.length < nbr) {
      const ranNum = this.getRandomNumber(this.letters.length);
      if (!randomNumbers.includes(ranNum)) {
        randomNumbers.push(ranNum);
      }
    }
    return randomNumbers.map(n => this.letters[n]);

  }



  private getRandomNumber(max: number = 1): number {
    return Math.floor(Math.random() * max);
  }
}
