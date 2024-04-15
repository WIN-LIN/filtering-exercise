const { addComma } = require("./addComma");
describe("addComma", () => {
  test("adds commas to an integer", () => {
    expect(addComma(1234567)).toBe("1,234,567");
  });

  test("handles negative numbers", () => {
    expect(addComma(-1234567)).toBe("-1,234,567");
  });

  test("handles decimal points", () => {
    expect(addComma(1000.89)).toBe("1,000.89");
  });
  test("handles with negative decimal points", () => {
    expect(addComma(-7855948.9527)).toBe("-7,855,948.9527");
  });

  test("handles numbers fewer than three digits", () => {
    expect(addComma(12)).toBe("12");
  });

  test("handles zero", () => {
    expect(addComma(0)).toBe("0");
  });
  test("handles numbers as strings", () => {
    expect(addComma("1234567")).toBe("1,234,567");
  });

  test("handles floating point numbers", () => {
    expect(addComma(0.1234567)).toBe("0.1234567");
  });
  test("handle non-numeric input", () => {
    expect(addComma("hello")).toBe("NaN");
    expect(addComma("hello 123")).toBe("NaN");
  });
});
