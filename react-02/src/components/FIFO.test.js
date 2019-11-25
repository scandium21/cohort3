import { FIFO } from "./FIFO";

test("testing FI FO", () => {
  const nF = new FIFO("Chemistry", 2);
  expect(nF.length).toBe(1);
  nF.push("Math", 9);
  expect(nF.length).toBe(2);
  nF.showNodes();
  expect(nF.delete().subject).toBe("Chemistry");
  nF.showNodes();
  expect(nF.length).toBe(1);
});
