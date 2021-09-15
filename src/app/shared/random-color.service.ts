import { Injectable } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Injectable({
  providedIn: 'root'
})
export class RandomColorService {

  constructor() { }
  public color: Array<ThemePalette> = ['primary', 'accent', 'warn'];

  getRandomPalette(it: any = null) {

    if (it !== null)
      return this.color[it % 3];

    let val = this.color[parseInt((Math.random() * 100).toString()) % 3];
    return val;
  }

}
