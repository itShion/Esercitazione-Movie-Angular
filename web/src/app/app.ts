import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieList } from './components/movie/movie-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MovieList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('web');
}
