import { Component, OnInit } from '@angular/core';
import {GameService} from '../services/game.service';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
  }

  setGame(game: string): void {
    this.gameService.setGame(game);
  }

}
