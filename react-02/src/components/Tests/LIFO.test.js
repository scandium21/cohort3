import { LIFO } from "../Stack & Queue/LIFO";

test("testing LIFO", () => {
  const nL = new LIFO("Chemistry", 2);
  expect(nL.length).toBe(1);
  nL.push("Math", 9);
  nL.push("Eggs", 6);
  expect(nL.length).toBe(3);
  nL.showNodes();
  expect(nL.delete().subject).toBe("Eggs");
  nL.showNodes();
  expect(nL.length).toBe(2);
});
