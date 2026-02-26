import { Component, InputSignal, signal, WritableSignal } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from '../../models/Movie';
import { MovieApi } from './movie-api';
import { HttpErrorResponse } from '@angular/common/http';
import { MovieItem } from "./movie-item/movie-item";
import { StreamingChannel } from '../../models/StreamingChannel';
import { MovieModal } from './movie-modal/movie-modal';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [MovieItem, MovieModal],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css',
})
export class MovieList {
  movieList!: Movie[];
  private subscription: Subscription = new Subscription();
  channelList:WritableSignal<StreamingChannel[]>=signal<StreamingChannel[]>(new Array<StreamingChannel>());

  constructor(private api: MovieApi) { }
  ngOnInit(): void {
    this.onGetMovieList();
    this.onGetChannelList();
  }
  onGetMovieList(): void {
    this.subscription.add(
      this.api.getMovieList().subscribe({
        next: (movieList: Movie[]): void => {
          this.movieList = movieList;
        },
        error: (e: HttpErrorResponse) => {
          throw Error(
            `Cannot connect to API: Error: ${e.status} - ${e.message}`
          );
        }
      })
    );
  }

  onDeleteMovie(movieId: number): void {
    this.subscription.add(
      this.api.deleteMovie(movieId).subscribe({
        error: (e: HttpErrorResponse) => {
          throw Error(
            `Cannot connect to API: Error: ${e.status} - ${e.message}`
          );
        },
        complete: () => {
          this.onGetMovieList();
        }
      })
    );
  }

  onGetChannelList(): void {
    this.subscription.add(
      this.api.getChannelList().subscribe({
        next: (channelList: StreamingChannel[]) => {
          this.channelList.set(channelList);
        },
        error: (e: HttpErrorResponse) => {
          throw new Error(`Cannot connect to API: Error: ${e.status} - ${e.message}`);
        }
      })
    );
  }

  onAddMovie(movie: Movie) {
    this.subscription.add(
      this.api.addMovie(movie).subscribe({
        error: (e: HttpErrorResponse) => {
          console.log(e)
        },
        complete: (): void => {
          this.onGetMovieList();
        }
      })
    )
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
