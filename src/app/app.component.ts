import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DogapiService } from './services/dogapi.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  providers: [DogapiService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}
