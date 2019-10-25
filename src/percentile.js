export default function(numbers, divider) {
  const sortedNumbers = numbers.sort(((a, b) => a - b)) // ascending numeric sort
  const lastIndex = sortedNumbers.length - 1;
  const index = Math.min(lastIndex, Math.floor(lastIndex * divider))
  return sortedNumbers[index]
}
