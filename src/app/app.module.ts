import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherSummaryComponent } from './weather-summary/weather-summary.component';
import { HttpClientModule } from '@angular/common/http';
import { WeatherAlertComponent } from './weather-alert/weather-alert.component';
import { WeatherService } from './weather.service';
import { FormsModule } from '@angular/forms';
import { CweatherComponent } from './cweather/cweather.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherSummaryComponent,
    WeatherAlertComponent,
     CweatherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
