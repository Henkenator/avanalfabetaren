import {Injectable} from '@angular/core';
import Speech from 'speak-tts';

@Injectable({
  providedIn: 'root'
})
export class SpeakService {

  private speech = new Speech();

  constructor() {
    this.speech.init({
      volume: 1,
      lang: 'sv-SE',
      rate: 1,
      pitch: 1,
    });
  }

  speak(text: string, cancelOngoing: boolean = false): void {
    if (cancelOngoing) {
      this.speech.cancel();
    }
    this.speech.speak({text});
  }
}
