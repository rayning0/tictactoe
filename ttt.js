// Raymond Gan - Tic Tac Toe (in JavaScript. Tested with QUnit.)

var empty_board = [[0,0,0],[0,0,0],[0,0,0]];
var horiz_board1 = [[1,2,0],
                    [2,1,2],
                    [1,1,1]];

var horiz_board2 = [[1,2,0],
                    [2,2,2],
                    [0,1,1]];

var vert_board1 =  [[1,1,0],
                    [2,1,2],
                    [0,1,1]];

var vert_board2 =  [[1,2,2],
                    [2,2,2],
                    [0,1,2]];

var diag_board1 =  [[1,2,0],
                    [2,1,2],
                    [0,1,1]];

var diag_board2 =  [[1,2,2],
                    [2,2,0],
                    [2,1,1]]; 

var avg_board =    [[1,2,2],
                    [2,0,0],
                    [2,1,1]]; 

// Array of rows of board
function horiz(board) {
  return board;
}

// Array of cols of board
function vert(board) {
  var vertical = empty_board;
  for (col = 0; col < board.length; col++) {
    for (row = 0; row < board.length; row++) {
      vertical[row][col] = board[col][row];
    }
  }
  return vertical;
}

// Returns both diagonal arrays of board
function diag(board) {
  var diag1 = [];
  var diag2 = [];
  for (i = 0; i < board.length; i++) {
    diag1.push(board[i][i]); // top L to bot R
    diag2.push(board[i][board.length - 1 - i]); // top R to bot L
  }
  return [diag1, diag2, [0,0,0]];
}

function product_check(board) {
  for (row = 0; row < board.length; row++) {
    product = 1;
    for (col = 0; col < board.length; col++) {
      product *= board[row][col];
    }

    if (product === 1) {
      return 1;
    } else if (product === 8) {
      return 8;
    } 
  }
  console.log("No one wins");
  console.log(board);
  return 0;
}

function win_or_not(board) {
  if (JSON.stringify(board) === JSON.stringify(empty_board)) {
    return -1; // empty board
  }
  h = horiz(board);
  v = vert(board);
  d = diag(board);
  
  if (product_check(h) === 1 || product_check(v) === 1 || product_check(d) === 1) {
    return 1;
  } else if (product_check(h) === 8 || product_check(v) === 8 || product_check(d) === 8) {
    return 2;
  } else {
    return 0;
  }
}

test( "Win or Not?", function() {
  ok( win_or_not(empty_board) === -1, "Board is empty" );
  ok( win_or_not(horiz_board1) === 1, "Player 1 wins horizontally!" );
  ok( win_or_not(horiz_board2) === 2, "Player 2 wins horizontally!" );
  ok( win_or_not(vert_board1) === 1, "Player 1 wins vertically!" );
  ok( win_or_not(vert_board2) === 2, "Player 2 wins vertically!" );
  ok( win_or_not(diag_board1) === 1, "Player 1 wins diagonally - Top L to Bot R!" );
  ok( win_or_not(diag_board2) === 2, "Player 2 wins diagonally - Top R to Bot L!" );
  ok( win_or_not(avg_board) === 0, "No one wins" );
});