import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  ProgressDiagramComponent,
  ProgressPoint,
} from './progress-diagram/progress-diagram.component';

@Component({
  selector: 'kode-root',
  standalone: true,
  imports: [RouterOutlet, ProgressDiagramComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'program-statistics';
  startDate = new Date('2024-03-10');
  endDate = new Date('2024-04-10');
  registered: ProgressPoint[] = [
    { date: new Date('2024-03-12'), progress: 35 },
    { date: new Date('2024-03-17'), progress: 38 },
    { date: new Date('2024-03-25'), progress: 38 },
    { date: new Date('2024-04-01'), progress: 42 },
  ];
  started: ProgressPoint[] = [
    { date: new Date('2024-03-12'), progress: 12 },
    { date: new Date('2024-03-17'), progress: 24 },
    { date: new Date('2024-03-25'), progress: 24 },
    { date: new Date('2024-04-01'), progress: 31 },
  ];
  finished: ProgressPoint[] = [
    { date: new Date('2024-03-12'), progress: 10 },
    { date: new Date('2024-03-17'), progress: 20 },
    { date: new Date('2024-03-25'), progress: 22 },
    { date: new Date('2024-04-01'), progress: 28 },
  ];
}
