import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet, Router, NavigationEnd, Event } from '@angular/router';
import { BehaviorSubject, interval } from 'rxjs';
import { filter, takeUntil, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';

interface RemoteStatus { name: string; online: boolean; }

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy {
  title = 'shell';
  private destroy$ = new Subject<void>();
  status$ = new BehaviorSubject<RemoteStatus[]>([
    { name: 'portfolio', online: true },
    { name: 'products', online: true }
  ]);

  constructor(private router: Router) {
    interval(2000).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => this.checkRemotes());
  }

  checkRemotes() {
    // Simulate status check (in real: ping remoteEntry.js)
    const current = this.status$.value;
    this.status$.next(current.map(s => ({ ...s, online: Math.random() > 0.1 }))); // Demo flicker
  }

  getStatus(name: string): RemoteStatus | undefined {
    return this.status$.value.find(s => s.name === name);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
