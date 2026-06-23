function sumArray(numbers: number[]): number {
  return numbers.reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0);
}

function doubleArrayElements(numbers: number[]): number[] {
  return numbers.map((number: number) => number * 2);
}

class SkillsManager {
  private skills: string[];

  constructor() {
    this.skills = [];
  }

  addSkill(skill: string): string | null {
    if (typeof skill === 'string' && skill.length >= 2) {
      this.skills.push(skill);
      return skill;
    }
    return null;
  }

  getAllSkills(): string[] {
    return this.skills;
  }
}

interface IDateCalculator {
  addDays(days: number): number;
  subtractDays(days: number): number;
  getResult(): string;
}

class DateCalculator implements IDateCalculator {
  private date: Date;

  constructor(initialDate: string) {
    this.date = new Date(initialDate);
  }

  addDays(days: number): number {
    return this.date.setDate(this.date.getDate() + days);
  }

  subtractDays(days: number): number {
    return this.date.setDate(this.date.getDate() - days);
  }

  getResult(): string {
    const year: number = this.date.getFullYear();
    const month: string = String(this.date.getMonth() + 1).padStart(2, '0');
    const day: string = String(this.date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
}

const dateCalculator = new DateCalculator('2023-01-01');
dateCalculator.addDays(5);
console.log(dateCalculator.getResult());

dateCalculator.subtractDays(3);
console.log(dateCalculator.getResult());

export = { doubleArrayElements, sumArray, SkillsManager, DateCalculator };