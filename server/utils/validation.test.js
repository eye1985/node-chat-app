const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString', () => {

    it('should reject non-string values', () => {
        expect(isRealString(123123123)).toBeFalsy();
        expect(isRealString(false)).toBeFalsy();
        expect(isRealString({})).toBeFalsy();
    });

    it('should reject string with only spaces', () => {
        expect(isRealString('    ')).toBeFalsy();
    });

    it('should allow string with non-space charaters', () => {
        expect(isRealString('My String')).toBeTruthy();
    });
});