import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  board: number[][];
  dimension = 9;
  empty = 0;
  selected: [number, number] = [-1, -1];

  constructor() {
    // Init board
    this.board = this.generateBoard();
  }

  // create a sqaure board with specified dimension and fill with specified value
  generateBoard(dimension = this.dimension, fill = this.empty): number[][] {
    let board = new Array(dimension);
    for (let i = 0; i < dimension; i++) {
      board[i] = new Array(dimension).fill(fill);
    }

    return board;
  }

  // select the clicked cell
  select(row: number, col: number) {
    this.selected = [row, col];
  }

  @HostListener('window:keydown', ['$event'])
  updateBoard(event: any) {
    let num = parseInt(event.key);
    if (isNaN(num) || this.selected[0] === -1 || num < 0 || num > 9) { // check if the key is a valid number
      return;
    }

    // toggle number if already present
    if (num === this.board[this.selected[0]][this.selected[1]]) {
      this.board[this.selected[0]][this.selected[1]] = this.empty;
      return;
    }

    // set number at selected cell
    this.board[this.selected[0]][this.selected[1]] = num;
  }
}
