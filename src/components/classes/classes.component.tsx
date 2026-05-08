export class Person {
  protected name: string;
  protected surname: string;
  age: number;

  constructor(name: string, surname: string, age: number) {
    this.name = name;
    this.surname = surname;
    this.age = age;
  }

  getName = (): string => {
    return this.name;
  };
}

export class Worker extends Person {
  work: string;
  salary: number;

  constructor(
    name: string,
    surname: string,
    age: number,
    work: string,
    salary: number,
  ) {
    super(name, surname, age);
    this.work = work;
    this.salary = salary;
  }
}
