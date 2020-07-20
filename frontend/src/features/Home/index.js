// Write a function that takes in a “special” array and returns its product sum.
// A “special” array is a non-empty array that contains either integers or other
// “special” arrays. The product sum of a “special” array is the sum of its elements,
// where “special” arrays inside it are summed themselves and then multiplied by
// their level of depth.

const practiceProblem = (arr, level = 1) => {
  let sum = 0;
  arr.forEach((element) => {
    if (Array.isArray(element)) {
      sum += practiceProblem(element, level + 1);
    } else {
      sum += element;
    }
  });
  return sum * level;
};

console.log(practiceProblem([5, 2, [7, -1], 3, [6, [-13, 8], 4]]));
