class Person {
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
