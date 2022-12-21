const { createChat } = require("./allTests");
const { sendMessage } = require("./allTests");

test("adds new chat according to name entered", () => {
  const text = createChat("Abrar");
  expect(text).toBe("Abrar");
});

test("add blank as chat name", () => {
  const text = createChat("");
  expect(text).toBe("");
});

test("chat display", () => {
  const text = sendMessage("Abrar", "Hi how are you doing", "19:04");
  expect(text).toBe("Abrar 19:04 Hi how are you doing");
});
