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
  currentRoute: string;
  currentGame: string;
  currentUser: string;
  editName = false;
  firstLoad = true;

  constructor(private router: Router,
              private gameService: GameService) {

    gameService.currentGame$.subscribe(game => {
      this.currentGame = game;
    });

    gameService.currentUser$.subscribe(name => {
      this.currentUser = name;
    });

    router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.url;
      });
  }

  resetGame(): void {
    this.gameService.setGame('');
  }

  changeName(name): void {
    this.editName = false;
    this.gameService.setUser(name);
  }

  onClickPlay(): void {
    this.firstLoad = false;
  }


}
