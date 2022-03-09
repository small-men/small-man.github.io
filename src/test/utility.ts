export type Person = {
  name: string;
  age: number;
};

const xiaoMi: Partial<Person> = {
  name: "小米",
};
const huaWei: Omit<Person, "age"> = {
  name: "华为",
};

type PersonKeys = keyof Person;
type PersonOnlyName = Pick<Person, "name">;
type Age = Exclude<PersonKeys, "name">;
