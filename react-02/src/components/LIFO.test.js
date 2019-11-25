import { LIFO } from "./LIFO";

test("testing LIFO", () => {
  const nF = new LIFO("Chemistry", 2);
  expect(nF.length).toBe(1);
  nF.push("Math", 9);
  nF.push("Eggs", 6);
  expect(nF.length).toBe(3);
  nF.showNodes();
  expect(nF.delete().subject).toBe("Eggs");
  nF.showNodes();
  expect(nF.length).toBe(2);
});
