import { Component, OnInit } from '@angular/core';
import {GameService} from '../../services/game.service';
import {SpeakService} from '../../services/speak.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {

  constructor(private gameService: GameService,
              private speakService: SpeakService) { }

  ngOnInit(): void {
   this.playWelcomeMessage();
  }

  playWelcomeMessage(): void {
    this.gameService.currentUser$.pipe(take(1)).subscribe(name => {
      this.speakService.speak(`Välkommen ${name}. Vad vill du spela för spel?`);
    });
  }

  setGame(game: string): void {
    this.gameService.setGame(game);
  }

}
