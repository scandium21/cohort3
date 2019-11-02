import { func } from "./functions.js";
test("", () => {
  console.log("Hello from functions.test");
  expect(func.func1()).toEqual(undefined);
});
