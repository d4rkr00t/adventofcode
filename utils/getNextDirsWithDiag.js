export function getNextDirsWithDiag(row, col) {
  let dirs = [];

  for (let [x, y] of [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1],
  ]) {
    dirs.push([row + x, col + y]);
  }

  return dirs;
}
