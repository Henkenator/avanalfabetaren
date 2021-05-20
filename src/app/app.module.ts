import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GuessLetterComponent } from './components/guess-letter/guess-letter.component';
import {AppRoutingModule} from './app-routing.module';
import { StartPageComponent } from './components/start-page/start-page.component';

@NgModule({
  declarations: [
    AppComponent,
    GuessLetterComponent,
    StartPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
