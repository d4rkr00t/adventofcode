export function flipHoriz(matrix) {
  const n = matrix.length;

  for (let i = 0; i < n; i++) {
    matrix[i].reverse();
  }

  return matrix;
}
