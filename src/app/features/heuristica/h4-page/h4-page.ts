import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderHeuristicaComponent } from '../components/heuristica-component/header-heuristica';

@Component({
  selector: 'app-h4-page',
  imports: [CommonModule, HeaderHeuristicaComponent],
  templateUrl: './h4-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class H4Page { }
