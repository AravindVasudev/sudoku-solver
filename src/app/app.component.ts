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
  select(row: number, col: number): void {
    this.selected = [row, col];
  }

  @HostListener('window:keydown', ['$event'])
  updateBoard(event: any): void {
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

  solve(board = this.board): boolean {
    let cur = this.getNextEmptyPosition();
    if (cur === null) {
      return true;
    }

    for (let i = 1; i < 10; i++) {
      if (this.isSafe(board, cur, i)) {
        board[cur[0]][cur[1]] = i;

        if (this.solve(board)) {
          return true;
        }

        board[cur[0]][cur[1]] = this.empty;
      }
    }

    return false;
  }

  // returns the first empty position
  getNextEmptyPosition(board = this.board): [number, number] {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (board[i][j] === this.empty) {
          return [i, j];
        }
      }
    }
    
    return null;
  }

  // checks if the given value can be placed in the given position of the given board
  isSafe(board: number[][], position: [number, number], value: number): boolean {
    // check if the value exists in the row or column
    for (let i = 0; i < board.length; i++) {
      if (board[i][position[1]] === value || board[position[0]][i] === value) {
        return false;
      }
    }

    // check if the value exists in its grid
    let rowStart = Math.floor(position[0] / 3) * 3;
    let colStart = Math.floor(position[1] / 3) * 3;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[rowStart + i][colStart + j] === value) {
          return false;
        }
      }
    }

    return true;
  }
}
