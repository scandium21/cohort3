import { Queue } from "../Stack & Queue/Queue";

test("testing Queue(FIFO)", () => {
  const nF = new Queue("Chemistry", 2);
  expect(nF.length).toBe(1);
  nF.push("Math", 9);
  expect(nF.length).toBe(2);
  nF.showNodes();
  expect(nF.delete().subject).toBe("Chemistry");
  nF.showNodes();
  expect(nF.length).toBe(1);
});
