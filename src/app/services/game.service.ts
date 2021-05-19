import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private currentGameSubj = new BehaviorSubject('');
  public currentGame$ = this.currentGameSubj.asObservable();

  constructor() { }

  setGame(game: string): void {
    this.currentGameSubj.next(game);
  }
}
