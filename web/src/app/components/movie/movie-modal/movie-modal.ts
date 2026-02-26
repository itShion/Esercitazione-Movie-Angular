import { Component, InputSignal, input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { StreamingChannel } from '../../../models/StreamingChannel';
import { Movie } from '../../../models/Movie';

@Component({
  selector: 'app-movie-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './movie-modal.html',
  styleUrl: './movie-modal.css'
})
export class MovieModal {

  addMovieForm: FormGroup;
  channelList: InputSignal<StreamingChannel[]> =
    input.required<StreamingChannel[]>();

  @Output() addMovieEvent = new EventEmitter<Movie>();

  constructor(private formBuilder: FormBuilder) {
    this.addMovieForm = this.formBuilder.group({
      title: [''],
      description: [''],
      director: [''],
      streaming_channel: ['---'],
    });
  }

  onSubmit(): void {
    this.addMovieEvent.emit(this.addMovieForm.value);
  }
}