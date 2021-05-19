import {Component} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {GameService} from './services/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'avanalfabetaren';
  currentRoute: string;
  currentGame: string;

  constructor(private router: Router,
              private gameService: GameService) {

    gameService.currentGame$.subscribe(game => {
      console.log(game);
      this.currentGame = game;
    });

    router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.url;
      });
  }

  resetGame(): void {
    this.gameService.setGame('');
  }


}
