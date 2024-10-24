import { Component, Input, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-summary',
  templateUrl: './weather-summary.component.html',
  styleUrls: ['./weather-summary.component.css']
})
export class WeatherSummaryComponent implements OnInit {

  selectedCity: string = 'Delhi'; // Default city
  weatherSummary: any[] = []; // Holds daily summary data
  errorMessage: string | null = null; // Holds error messages

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getDailyWeatherSummary(); // Fetch summary on initialization
  }

  // Fetch the daily weather summary from the service
  getDailyWeatherSummary(): void {
    this.weatherService.getDailySummary(this.selectedCity).subscribe(
      (data) => {
        this.weatherSummary = data; // Assign received data to weatherSummary
        this.errorMessage = null; // Clear any previous error messages
      },
      (error) => {
        console.error('Error fetching weather summary:', error);
        this.errorMessage = 'Could not fetch weather summary. Please try again.';
      }
    );
  }

  // This method will be called when the city is changed
  onCityChange(city: string): void {
    this.selectedCity = city; // Update selected city
    this.getDailyWeatherSummary(); // Fetch summary for the new city
  }
}
