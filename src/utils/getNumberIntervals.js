export function getNumberIntervals(intervals) {
  let overlap = [];
  let notInclude = [];

  if (intervals.length === 0) {
    return { overlap, notInclude: [[0, 20]] };
  }

  // Adjust the intervals to be within the range of 0 to 20
  intervals = intervals.map(([start, end]) => [
    Math.max(0, start),
    Math.min(20, end)
  ]);

  intervals.sort((a, b) => a[0] - b[0]);

  let merged = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const [intervalMin, intervalMax] = intervals[i];
    const currentMax = merged[merged.length - 1][1];

    // Overlapping intervals
    if (intervalMin <= currentMax) {
      if (intervalMax >= currentMax) {
        overlap.push([intervalMin, currentMax]);
        merged[merged.length - 1][1] = intervalMax;
      }
    } else {
      merged.push([intervalMin, intervalMax]);
    }
  }

  let start = 0;

  merged.forEach(([min, max], index) => {
    if (min > start) {
      notInclude.push([start, min - 1]);
    }
    start = max + 1;
    if (index === merged.length - 1 && start <= 20) {
      notInclude.push([start, 20]);
    }
  });
  console.log("overlap:", overlap, "notInclude", notInclude);
  return { overlap, notInclude };
}
