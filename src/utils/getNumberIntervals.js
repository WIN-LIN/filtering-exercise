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

  intervals.sort((a, b) => {
    if (a[0] === b[0]) return a[1] - b[1];
    return a[0] - b[0];
  });

  let merged = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const [intervalMin, intervalMax] = intervals[i];
    const [, currentMax] = merged[merged.length - 1];

    if (intervalMin <= currentMax) {
      if (intervalMax > currentMax) {
        // New interval extends current one
        if (intervalMin <= currentMax) {
          overlap.push([intervalMin, currentMax]);
        }
        merged[merged.length - 1][1] = intervalMax; // Extend the current interval
      } else if (intervalMin <= currentMax && intervalMax <= currentMax) {
        // Full overlap within an existing interval
        overlap.push([intervalMin, intervalMax]);
      }
    } else {
      merged.push([intervalMin, intervalMax]);
    }
  }

  // Remove duplicated overlaps
  overlap = overlap.reduce((acc, curr) => {
    if (!acc.some((item) => item[0] <= curr[0] && item[1] >= curr[1])) {
      acc.push(curr);
    }
    return acc;
  }, []);

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
