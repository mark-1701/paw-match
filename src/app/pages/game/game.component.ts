import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { DogapiService } from '../../services/dogapi.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import Dog from '../../classes/Dog';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterLink],
  providers: [DogapiService],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  AlternativeImagePath: string = '../../../assets/img/red_backside_card.png';
  dogs: Dog[] = [];
  // cartas seleccionadas
  dogA: Dog | null = null;
  dogB: Dog | null = null;
  // perros encontrados
  foundDogs: any[] = [];
  attempts: number = 5;

  constructor(private router: Router, private dogpiService: DogapiService) {}
  ngOnInit(): void {
    this.dogpiService.getDog().subscribe(data => console.log(data.message));
    this.getDogs();
  }

  getDogs(): void {
    this.dogpiService.getMultipleDogs(10).subscribe(data => {
      let URLs: string[] = data.map(dogAttribute => dogAttribute.message);
      let duplicateUrls: string[] = URLs.flatMap(URL => [URL, URL]);
      this.dogs = duplicateUrls.map((URL, index) => new Dog(index, URL));
      // desordenar el array
      this.dogs = this.shuffleArray(this.dogs);
    });
  }

  shuffleArray(array: any[]) {
    let shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      // Genera un índice aleatorio entre 0 y i
      const j = Math.floor(Math.random() * (i + 1));
      // Intercambia los elementos en las posiciones i y j
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  selectCard(dog: Dog | null): void {
    // decide la posicion en donde se guarda la seleccion
    !this.dogA ? (this.dogA = dog) : (this.dogB = dog);
    // verifica si hay dos cartas seleccionadas
    if (this.dogA && this.dogB) {
      if (
        this.dogA?.urlImage === this.dogB?.urlImage &&
        this.dogA.id !== this.dogB.id
      ) {
        // verificar existencia de dogs en perros encontrados
        const dogAExists = this.foundDogs.some(
          foundDog => foundDog.id === this.dogA?.id
        );
        const dogBExists = this.foundDogs.some(
          foundDog => foundDog.id === this.dogB?.id
        );
        // agregar si no estan guardadaos
        if (!dogAExists && !dogBExists) {
          this.foundDogs.push(this.dogA);
          this.foundDogs.push(this.dogB);
        }
      } else {
        // si no coincide se pierde un intento
        if (this.attempts - 1 < 0) this.lose();
        this.attempts--;
      }
      setTimeout(() => {
        this.dogA = this.dogB = null;
        if (this.foundDogs.length === 20) {
          this.win();
        }
      }, 1000);
    }
  }

  generatePathImage(dog: Dog): string | undefined {
    if (
      dog.id === this.dogA?.id ||
      dog.id === this.dogB?.id ||
      this.foundDogs.some(foundDog => foundDog.id === dog.id)
    ) {
      return dog.urlImage;
    }

    return this.AlternativeImagePath;
  }

  // ganar y perder
  win(): void {
    alert(`Felicidades has ganado. 🏆`);
    this.router.navigate(['/']);
  }
  lose(): void {
    alert(`Lo siento, has periddo. Vuelve a intentarlo. `);
    this.router.navigate(['/']);
  }
}
