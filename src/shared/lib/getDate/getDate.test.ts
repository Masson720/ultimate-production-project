import { getDate } from "./getDate";


describe('shared/lib/getDate', () => {
    test('Функция должна выдать строку', () => {
        expect(getDate()).toEqual(expect.any(String));
    })
})