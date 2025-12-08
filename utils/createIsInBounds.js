export function createIsInBounds(data) {
  return (row, col) => {
    return row >= 0 && row < data.length && col >= 0 && col < data[row].length
  };
}
