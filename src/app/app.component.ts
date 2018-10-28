import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  board: number[][];
  dimension = 9;
  empty = 0;

  constructor() {
    this.board = this.generateBoard();
  }

  generateBoard(dimension = this.dimension, fill = this.empty): number[][] {
    let board = new Array(dimension);
    for (let i = 0; i < dimension; i++) {
      board[i] = new Array(dimension).fill(fill);
    }

    return board;
  }
}
