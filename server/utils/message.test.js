const expect = require("expect");
const { generateMessage, generateLocationMessage } = require("./message");

describe("generateMessage", () => {
    it("should generate correct message object", () => {
        const {from, text, createdAt} = generateMessage("erik", "test message");

        expect(from).toBe("erik");
        expect(text).toBe("test message");
        expect(typeof createdAt).toBe("number");
    });
});

describe("generateLocationMessage", () => {
   it('should generate correct location object', () => {
        const lat = 59.8949302;
        const long = 10.609931;
        const from = 'erik';
        const url = `https://www.google.com/maps?q=${lat},${long}`;

        const result = generateLocationMessage(from, lat, long);

        expect(typeof result.createdAt).toBe('number');
        expect(result).toMatchObject({
            url,
            from
        });
   });
});