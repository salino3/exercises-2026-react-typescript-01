export class Person {
  protected name: string;
  protected surname: string;
  age: number;
  goods?: string;

  constructor(name: string, surname: string, age: number, goods?: string) {
    this.name = name;
    this.surname = surname;
    this.age = age;
    this.goods = goods;
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
    goods?: string,
  ) {
    super(name, surname, age, goods);
    this.work = work;
    this.salary = salary;
  }
}
