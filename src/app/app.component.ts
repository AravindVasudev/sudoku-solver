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
    this.board = this.generateBoard();
  }

  generateBoard(dimension = this.dimension, fill = this.empty): number[][] {
    let board = new Array(dimension);
    for (let i = 0; i < dimension; i++) {
      board[i] = new Array(dimension).fill(fill);
    }

    return board;
  }

  select(row: number, col: number) {
    this.selected = [row, col];
  }

  @HostListener('window:keydown', ['$event'])
  updateBoard(event: any) {
    // debugger;
    let num = parseInt(event.key);
    if (isNaN(num) || this.selected[0] === -1 || num < 0 || num > 9) {
      return;
    }

    this.board[this.selected[0]][this.selected[1]] = num;
  }
}
