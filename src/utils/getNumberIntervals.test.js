import { getNumberIntervals } from "./getNumberIntervals";

describe("getNumberIntervals", () => {
  test("identifies overlapping and non-included intervals", () => {
    const input = [
      [6, 11],
      [5, 8],
      [17, 20],
      [7, 7],
      [14, 17]
    ];
    const expected = {
      overlap: [
        [6, 8],
        [17, 17]
      ],
      notInclude: [
        [0, 4],
        [12, 13]
      ]
    };
    expect(getNumberIntervals(input)).toEqual(expected);
  });

  test("identifies overlapping 1", () => {
    const input = [
      [0, 3],
      [3, 3]
    ];
    const expected = {
      overlap: [[3, 3]],
      notInclude: [[4, 20]]
    };
    expect(getNumberIntervals(input)).toEqual(expected);
  });

  test("identifies overlapping 2", () => {
    const input = [
      [0, 4],
      [3, 3]
    ];
    const expected = {
      overlap: [[3, 3]],
      notInclude: [[5, 20]]
    };
    expect(getNumberIntervals(input)).toEqual(expected);
  });

  test("handles non-overlapping intervals", () => {
    const input = [
      [1, 2],
      [4, 5],
      [7, 8]
    ];
    const expected = {
      overlap: [],
      notInclude: [
        [0, 0],
        [3, 3],
        [6, 6],
        [9, 20]
      ]
    };
    expect(getNumberIntervals(input)).toEqual(expected);
  });

  test("handles case with intervals covering the entire range", () => {
    const input = [[0, 20]];
    const expected = {
      overlap: [],
      notInclude: []
    };
    expect(getNumberIntervals(input)).toEqual(expected);
  });

  test("handles case with no intervals", () => {
    const input = [];
    const expected = {
      overlap: [],
      notInclude: [[0, 20]]
    };
    expect(getNumberIntervals(input)).toEqual(expected);
  });

  test("handles case with exact overlaps", () => {
    const input = [
      [5, 10],
      [5, 10]
    ];
    const expected = {
      overlap: [[5, 10]],
      notInclude: [
        [0, 4],
        [11, 20]
      ]
    };
    expect(getNumberIntervals(input)).toEqual(expected);
  });
});
