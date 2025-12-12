export function rotateMatrix(matrix) {
  const n = matrix.length;

  // Step 1: Transpose the matrix
  // We iterate over the top-right triangle of the matrix to swap elements
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      // Swap matrix[i][j] with matrix[j][i] using array destructuring
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }

  // Step 2: Reverse each row
  for (let i = 0; i < n; i++) {
    matrix[i].reverse();
  }

  return matrix;
}
