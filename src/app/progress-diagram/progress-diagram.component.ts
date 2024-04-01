import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
} from '@angular/core';

interface Point {
  x: number;
  y: number;
}

interface DateStep {
  date: Date;
  x: number;
}

export interface ProgressPoint {
  date: Date;
  progress: number;
}

@Component({
  selector: 'kode-progress-diagram',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-diagram.component.html',
  styleUrl: './progress-diagram.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressDiagramComponent {
  startDate = input<Date>(new Date());
  endDate = input<Date>(
    new Date(new Date().setMonth(this.startDate().getMonth() + 1)),
  );
  total = input<number>(100);
  registered = input<ProgressPoint[]>([]);
  started = input<ProgressPoint[]>([]);
  finished = input<ProgressPoint[]>([]);

  currentDate = signal<Date>(new Date(new Date().setHours(0, 0, 0, 0)));
  scaleSteps = signal<number>(7);
  currentX = computed(() => {
    const startDate = this.startDate().getTime();
    const endDate = this.endDate().getTime();
    const currentDate = this.currentDate().getTime();
    return ((currentDate - startDate) / (endDate - startDate)) * 700;
  });

  levels = computed(() => {
    return [
      0,
      Math.round(0.2 * this.total()),
      Math.round(0.4 * this.total()),
      Math.round(0.6 * this.total()),
      Math.round(0.8 * this.total()),
      this.total(),
    ];
  });

  dateSteps = computed(() => {
    const duration =
      (this.endDate().getTime() - this.startDate().getTime()) /
      (24 * 60 * 60 * 1000);
    const step = Math.round(duration / this.scaleSteps() + 0.4);
    const deltaX = 700 / (duration / step);

    const steps: DateStep[] = [];
    for (let i = 0; i < this.scaleSteps(); i += 1) {
      var x = i * deltaX;
      var date = new Date(
        this.startDate().getTime() + i * step * 24 * 60 * 60 * 1000,
      );
      if (date > this.endDate()) {
        x = 700;
        date = this.endDate();
      }
      steps.push({
        x: x,
        date: date,
      });
    }
    return steps;
  });

  registeredPath = computed(() => {
    return this.calculatePath(this.registered());
  });

  startedPath = computed(() => {
    return this.calculatePath(this.started());
  });

  finishedPath = computed(() => {
    return this.calculatePath(this.finished());
  });

  calculatePath(points: ProgressPoint[]): string {
    var path = 'M 0 400 ';
    for (let i = 0; i < points.length; i += 1) {
      const x = this.calculateX(points[i].date);
      const y = this.calculateY(points[i].progress);
      path += `L ${x} ${y} `;
    }
    return path;
  }

  calculateX(date: Date): number {
    const startDate = this.startDate().getTime();
    const endDate = this.endDate().getTime();
    const currentDate = date.getTime();
    return ((currentDate - startDate) / (endDate - startDate)) * 700;
  }

  calculateY(progress: number): number {
    return 400 - (progress / this.total()) * 400;
  }
}
