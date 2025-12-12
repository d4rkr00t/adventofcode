export function flipVert(matrix) {
  const rows = matrix.length;

  for (let i = 0; i < Math.floor(rows / 2); i++) {
    [matrix[i], matrix[rows - 1 - i]] = [matrix[rows - 1 - i], matrix[i]];
  }

  return matrix;
}
