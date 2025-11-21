import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderHeuristicaComponent } from '../components/heuristica-component/header-heuristica';

@Component({
  selector: 'app-h2-page',
  imports: [HeaderHeuristicaComponent,CommonModule ],
  templateUrl: './h2-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class H2Page {
    lastOperation = signal('');

  executeOperation(action: string) {
    this.lastOperation.set(action);
  }
}
