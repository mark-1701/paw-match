import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DogapiService {
  private URL: string = 'https://dog.ceo/api/breeds/image/random';
  constructor(private http: HttpClient) {}

  getDog(): Observable<any> {
    // Agregar un parámetro aleatorio para evitar la caché
    const randomUrl = `${this.URL}?cacheBuster=${Math.random()}`;
    return this.http.get<any>(randomUrl);
  }

  getMultipleDogs(count: number): Observable<any[]> {
    const requests: Observable<any>[] = [];
    for (let i = 0; i < count; i++) {
      requests.push(this.getDog());
    }
    return forkJoin(requests);
  }
}
