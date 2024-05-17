import { Injectable, effect, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {

  darkModeSignal = signal<string>(JSON.parse(window.localStorage.getItem('darkModeSignal') ?? '"light"'));

  updateDarkMode() {
    this.darkModeSignal.update((value) =>(value === "dark" ? "light" : "dark"));
  }
  constructor() { 
    effect(() =>{
      window.localStorage.setItem('darkModeSignal', JSON.stringify(this.darkModeSignal()));
    });
  }
}
