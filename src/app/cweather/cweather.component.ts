import { Component, Input, ViewChild } from '@angular/core';
import { WeatherService } from '../weather.service';
import { WeatherAlertComponent } from '../weather-alert/weather-alert.component';

@Component({
  selector: 'app-cweather',
  templateUrl: './cweather.component.html',
  styleUrl: './cweather.component.css'
})
export class CweatherComponent {
  // @Input() alert: string[] = []; // Input property to accept alerts from the parent component

  // cities: string[] = ['Delhi', 'Chennai', 'Mumbai', 'Kolkata', 'Bangalore']; // List of cities
  // selectedCity: string = 'Delhi'; // Default selected city
  // currentWeather: any; // Variable to hold current weather data
  // errorMessage: string | null = null; // Variable for error messages
  // temperatureThreshold: number = 35; // Define your temperature threshold here
  // alerts: string[] = []; // Array to hold alerts
  // weather: any;

  // constructor(private weatherService: WeatherService) {}

  // ngOnInit(): void {
  //   this.fetchCurrentWeather(); // Fetch data on initialization
  // }

  // fetchCurrentWeather(): void {
  //   this.weatherService.getCurrentWeather(this.selectedCity).subscribe(
  //     (data) => {
  //       this.currentWeather = data; // Assign received data to currentWeather
  //       this.errorMessage = null; // Clear any previous error messages
  //       this.checkTemperatureAlert(this.currentWeather.temp); // Check for alerts
  //     },
  //     (error) => {
  //       console.error('Error fetching current weather:', error);
  //       this.errorMessage = 'Could not fetch current weather. Please try again.';
  //     }
  //   );
  // }


  // checkTemperatureAlert(currentTemp: number): void {
  //   if (currentTemp > this.temperatureThreshold) {
  //     this.alerts.push(`Alert: The current temperature in ${this.selectedCity} is ${currentTemp} °C, which exceeds the threshold of ${this.temperatureThreshold} °C.`);
  //   } else {
  //     this.alerts = []; // Clear alerts if temperature is below threshold
  //   }
  // }




  // fetchData(): void {
  //   this.weatherService.getCurrentWeather(this.selectedCity).subscribe(
  //     (data) => {
  //       this.currentWeather = data;
  //       // Set current temperature to the alert component
  //       this.weather.setCurrentTemperature(this.currentWeather.temp);
  //     },
  //     (error) => {
  //       console.error('Error fetching current weather:', error);
  //     }
  //   );
  // }










  @Input() alert: string[] = []; // Accept alerts as input from parent component

  cities: string[] = ['Delhi', 'Chennai', 'Mumbai', 'Kolkata', 'Bangalore']; // List of cities
  selectedCity: string = 'Delhi'; // Default selected city
  currentWeather: any = null; // To hold current weather data
  errorMessage: string | null = null; // To hold error messages
  temperatureThreshold: number = 35; // Temperature threshold for alerts
  alerts: string[] = []; // Array to hold alerts
  temperatureUnit: string = 'Celsius'; // Default unit
  temperature: number = 0; // Variable to hold the converted temperature

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.fetchCurrentWeather(); // Fetch data when the component initializes
  }

  // Method to fetch the current weather for the selected city
  fetchCurrentWeather(): void {
    this.weatherService.getCurrentWeather(this.selectedCity).subscribe(
      (data) => {
        this.currentWeather = data; // Assign the API response to currentWeather
        this.errorMessage = null; // Clear any previous errors
        this.temperature = this.currentWeather.temp; // Initially set to Celsius
        this.checkTemperatureAlert(this.currentWeather.temp); // Check for alerts
      },
      (error) => {
        console.error('Error fetching current weather:', error);
        this.errorMessage = 'Could not fetch current weather. Please try again.'; // Handle errors
        this.currentWeather = null; // Reset weather data if there's an error
      }
    );
  }

  // Method to handle unit change and convert temperature if necessary
  onUnitChange(): void {
    if (this.temperatureUnit === 'Kelvin') {
      this.convertToKelvin(this.currentWeather.temp);
    } else {
      // If Celsius is selected, set it to the original value from the API
      this.temperature = this.currentWeather.temp;
    }
  }

  // Method to convert Celsius to Kelvin
  convertToKelvin(celsius: number): void {
    this.weatherService.convertToKelvin(this.selectedCity).subscribe(
      (kelvinTemp) => {
        this.temperature = kelvinTemp; // Update the temperature to Kelvin
      },
      (error) => {
        console.error('Error converting temperature to Kelvin:', error);
        this.errorMessage = 'Error converting temperature to Kelvin.';
      }
    );
  }
  fetchKelvinTemperature(): void {
    this.weatherService.convertToKelvin(this.selectedCity).subscribe(
        (kelvinTemp) => {
            this.currentWeather.kelvin = kelvinTemp; // Store the converted temperature in your currentWeather object
            this.errorMessage = null; // Clear previous errors
        },
        (error) => {
            console.error('Error fetching temperature in Kelvin:', error);
            this.errorMessage = 'Could not fetch temperature in Kelvin. Please try again.'; // Handle error
        }
    );
}

  // Method to check if the current temperature exceeds the threshold
  checkTemperatureAlert(currentTemp: number): void {
    if (currentTemp > this.temperatureThreshold) {
      this.alerts.push(`Alert: The current temperature in ${this.selectedCity} is ${currentTemp} °C, which exceeds the threshold of ${this.temperatureThreshold} °C.`);
    } else {
      this.alerts = []; // Clear alerts if the temperature is below the threshold
    }
  }

  // Called when the city is changed in the dropdown
  onCityChange(): void {
    this.fetchCurrentWeather(); // Fetch the weather for the new selected city
  }


  // cweather.component.ts
fetchCurrentWeathr(): void {
  this.weatherService.getCurrentWeather(this.selectedCity).subscribe(
    (data) => {
      this.currentWeather = data;
      this.errorMessage = null;
      this.checkTemperatureAlert(this.currentWeather.temp); // This will trigger alert in WeatherAlertComponent
      this.weatherAlertComponent.setCurrentTemperature(this.currentWeather.temp); // Pass temperature to WeatherAlertComponent
    },
    (error) => {
      console.error('Error fetching current weather:', error);
      this.errorMessage = 'Could not fetch current weather. Please try again.';
      this.currentWeather = null;
    }
  );
}




// Ensure to create a reference to WeatherAlertComponent in the template
@ViewChild(WeatherAlertComponent) weatherAlertComponent!: WeatherAlertComponent;

}
