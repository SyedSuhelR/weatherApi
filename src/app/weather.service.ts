import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiBaseUrl = 'http://localhost:8080/api/weather'; // API URL

  constructor(private http: HttpClient) {}

  // Get current weather data for a city
  getCurrentWeather(city: string): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/current/${city}`);
  }

 

  // Get daily weather summaries for a city
  getDailySummary(city: string): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/daily-summary/${city}`);
  }


   

  // Get weather alerts for a city
  getWeatherAlerts(city: string): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/alerts/${city}`);
  }

  // Optionally generate summary
  generateSummary(city: string): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/generate-summary/${city}`);
  }


  // Get temperature threshold from the backend
  getTemperatureThreshold(): Observable<number> {
    return this.http.get<number>('http://localhost:8080/api/weather/threshold');
  }
  
  private conversionApiUrl = 'http://localhost:8080/api/weather/convert/toKelvin'; // Conversion API URL


// Get current weather for a city
getCurrentWeathe(city: string): Observable<any> {
  return this.http.get<any>(`${this.apiBaseUrl}/weather?city=${city}`);
}



  // Conversion method to convert Celsius to Kelvin using backend API
  convertCelsiusToKelvin(city: string): Observable<number> {
    // Form the API URL dynamically with the selected city
    const url = `${this.conversionApiUrl}?city=${encodeURIComponent(city)}`;
    return this.http.get<number>(url);
  }


  convertToKelvin(city: string): Observable<number> {
    return this.http.get<number>(`http://localhost:8080/api/weather/convert/toKelvin?city=${city}`);
}

}
