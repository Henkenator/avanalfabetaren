import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {GuessLetterComponent} from './components/guess-letter/guess-letter.component';
import {StartPageComponent} from './components/start-page/start-page.component';

const routes: Routes = [
  { path: '', component: StartPageComponent },
  { path: 'guess-letter', component: GuessLetterComponent }
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
