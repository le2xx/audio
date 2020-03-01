import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { EqualizerComponent } from './equalizer/equalizer.component';
import { HttpClientModule } from '@angular/common/http';
import { FileLoaderComponent } from './file-loader/file-loader.component';

@NgModule({
  declarations: [
    AppComponent,
    EqualizerComponent,
    FileLoaderComponent
  ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      HttpClientModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
