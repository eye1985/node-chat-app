const expect = require("expect");
const { generateMessage } = require("./message");

describe("generateMessage", () => {
    it("should generate correct message object", () => {
        const {from, text, createdAt} = generateMessage("erik", "test message");

        expect(from).toBe("erik");
        expect(text).toBe("test message");
        expect(typeof createdAt).toBe("number");
    });
});