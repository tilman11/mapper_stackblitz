// phase-switcher.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-phase-switcher',
  templateUrl: './phase-switcher.component.html',
  styleUrls: ['./phase-switcher.component.css'],
})
export class PhaseSwitcher {
  phases = ['Upload', 'Mapping'];
  phaseRoutes = ['dataloading', 'mapping'];
  currentPhaseIndex = 0;

  constructor(private router: Router) {}

  goToNextPhase() {
    console.log("Current phase (at click): ", this.currentPhaseIndex)

    if (this.currentPhaseIndex < this.phases.length - 1) {
      this.currentPhaseIndex++;
      this.router.navigate([this.phaseRoutes[this.currentPhaseIndex]]);
    }
    console.log("Current phase: ", this.currentPhaseIndex)
  }

  goToPreviousPhase() {
    console.log("Current phase (at click): ", this.currentPhaseIndex)
    if (this.currentPhaseIndex > 0) {
      this.currentPhaseIndex--;
      this.router.navigate([this.phaseRoutes[this.currentPhaseIndex]]);
    }
    console.log("Current phase: ", this.currentPhaseIndex)

  }
}
