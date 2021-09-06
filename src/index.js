function nextEmptySpot(matrix) {
  for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
          if (matrix[i][j] === 0)
              return [i, j];
      }
  }
  return [-1, -1];
}

function checkRow(matrix, row, value){
  for(var i = 0; i < matrix[row].length; i++) {
      if(matrix[row][i] === value) {
          return false;
      }
  }

  return true;
}

function checkColumn(matrix, column, value){
  for(var i = 0; i < matrix.length; i++) {
      if(matrix[i][column] === value) {
          return false;
      }
  }
  return true;
};

function checkSquare(matrix, row, column, value){
  boxRow = Math.floor(row / 3) * 3;
  boxCol = Math.floor(column / 3) * 3;
  for (var r = 0; r < 3; r++){
      for (var c = 0; c < 3; c++){
          if (matrix[boxRow + r][boxCol + c] === value)
              return false;
      }
  }

  return true;
};

function checkValue(matrix, row, column, value) {
  if(checkRow(matrix, row, value) &&
    checkColumn(matrix, column, value) &&
    checkSquare(matrix, row, column, value)) {
      return true;
  }

  return false;
};

module.exports = function solveSudoku(matrix) {
  let emptySpot = nextEmptySpot(matrix);
  let row = emptySpot[0];
  let col = emptySpot[1];

  // there is no more empty spots
  if (row === -1){
      return matrix;
  }

  for(let num = 1; num<=9; num++){
      if (checkValue(matrix, row, col, num)){
        matrix[row][col] = num;
        solveSudoku(matrix);
      }
  }

  if (nextEmptySpot(matrix)[0] !== -1)
  matrix[row][col] = 0;

  return matrix;
}
