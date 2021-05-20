import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private currentGameSubj = new BehaviorSubject('');
  public currentGame$ = this.currentGameSubj.asObservable();

  private currentUserSubj = new BehaviorSubject('CASPER');
  public currentUser$ = this.currentUserSubj.asObservable();

  constructor() { }

  setGame(game: string): void {
    this.currentGameSubj.next(game);
  }

  setUser(name: string): void {
    this.currentUserSubj.next(name);
  }
}
