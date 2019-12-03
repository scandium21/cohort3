import { Stack } from "../Stack & Queue/Stack";

test("testing Stack(LIFO)", () => {
  const nL = new Stack("Chemistry", 2);
  expect(nL.length).toBe(1);
  nL.push("Math", 9);
  nL.push("Eggs", 6);
  expect(nL.length).toBe(3);
  nL.showNodes();
  expect(nL.delete().subject).toBe("Eggs");
  nL.showNodes();
  expect(nL.length).toBe(2);
});
