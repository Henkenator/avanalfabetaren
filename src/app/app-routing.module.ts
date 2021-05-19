import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AlphabetComponent} from './alphabet/components/alphabet.component';
import {StartPageComponent} from './start-page/start-page.component';

const routes: Routes = [
  { path: '', component: StartPageComponent },
  { path: 'alphabet', component: AlphabetComponent }
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
