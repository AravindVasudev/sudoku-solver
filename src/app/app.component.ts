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

    // setInterval(() => console.log(this.board), 10000);
  }

  generateBoard(dimension = this.dimension, fill = this.empty): number[][] {
    let board = new Array(dimension);
    for (let i = 0; i < dimension; i++) {
      board[i] = new Array(dimension).fill(fill);
    }

    return board;
  }

  updateBoard(row: number, col: number, value: number) {
    console.log('foo')
  }
}
