const {weekFn} = require("../main")

describe("weekFn", () => {
    test("", () => {
        expect(weekFn(1.5)).toBeNull();
        expect(weekFn('2')).toBeNull();
        expect(weekFn(9)).toBeNull();
    });

    test("", () => {
        expect(weekFn(1)).toBe("Понеділок");
    });

    test("", () => {
        expect(weekFn(2)).toBe("Вівторок");
    });

    test("", () => {
        expect(weekFn(3)).toBe("Середа");
    });

    test("", () => {
        expect(weekFn(4)).toBe("Четвер");
    });

    test("", () => {
        expect(weekFn(5)).toBe("П\'ятниця");
    });

    test("", () => {
        expect(weekFn(6)).toBe("Субота");
    });

    test("", () => {
        expect(weekFn(7)).toBe("Неділя");
    });
});