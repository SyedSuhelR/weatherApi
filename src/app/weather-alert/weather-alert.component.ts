import { Component, Input, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-alert',
  templateUrl: './weather-alert.component.html',
  styleUrls: ['./weather-alert.component.css']
})
export class WeatherAlertComponent implements OnInit {
  @Input() alert: string[] = []; // Input property to accept alerts from the parent component

  city: string = 'Delhi'; // Default city
  alerts: string[] = []; // Holds alert data
  currentTemperature: number | null = null; // Holds the current temperature
  temperatureThreshold: number | null = null; // Holds the temperature threshold

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeatherAlerts();
    this.getTemperatureThreshold();
  }

  getWeatherAlerts(): void {
    this.weatherService.getWeatherAlerts(this.city).subscribe(
      (data) => {
        this.alerts = data.message ? [data.message] : []; // Handle the response correctly
      },
      (error) => {
        console.error('Error fetching weather alerts:', error);
      }
    );
  }

  getTemperatureThreshold(): void {
    this.weatherService.getTemperatureThreshold().subscribe(
      (threshold) => {
        this.temperatureThreshold = threshold;
        this.checkTemperatureAlert(); // Check after fetching the threshold
      },
      (error) => {
        console.error('Error fetching temperature threshold:', error);
      }
    );
  }

  // Assume this method is called when current weather is fetched
  setCurrentTemperature(temp: number): void {
    this.currentTemperature = temp;
    this.checkTemperatureAlert(); // Check alert whenever current temperature is set
  }

  checkTemperatureAlert(): void {
    this.alerts = []; // Reset alerts to avoid duplicate messages
    if (this.currentTemperature !== null && this.temperatureThreshold !== null) {
      if (this.currentTemperature > this.temperatureThreshold) {
        this.alerts.push(`Alert: Current temperature ${this.currentTemperature}°C exceeds the threshold of ${this.temperatureThreshold}°C.`);
      }
    }
  }
  
}
