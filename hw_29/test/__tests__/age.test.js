const {ageClassification} = require("../main")

describe("ageClassification", () => {
    test("", () => {
        expect(ageClassification(-1)).toBeNull();
        expect(ageClassification(122.01)).toBeNull();
        expect(ageClassification(150)).toBeNull();
    });

    test("", () => {
        expect(ageClassification(0)).toBe("Дитинство");
        expect(ageClassification(1)).toBe("Дитинство");
        expect(ageClassification(24)).toBe("Дитинство");
    });

    test("", () => {
        expect(ageClassification(24.01)).toBe("Молодість");
        expect(ageClassification(44)).toBe("Молодість");
    });

    test("", () => {
        expect(ageClassification(44.01)).toBe("Зрілість");
        expect(ageClassification(65)).toBe("Зрілість");
    });

    test("", () => {
        expect(ageClassification(65.1)).toBe("Старість");
        expect(ageClassification(75)).toBe("Старість");
    });

    test("", () => {
        expect(ageClassification(75.01)).toBe("Довголіття");
        expect(ageClassification(90)).toBe("Довголіття");
    });

    test("", () => {
        expect(ageClassification(90.01)).toBe("Рекорд");
        expect(ageClassification(122)).toBe("Рекорд");
    });
});
