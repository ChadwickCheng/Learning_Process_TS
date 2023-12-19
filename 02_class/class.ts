// 类的声明
class Person{
  name: string;
  constructor(name: string){
    this.name = name;
  }
  run(): void{
    console.log(this.name);
  }
}
let p = new Person('张三');
p.run();

// 继承 extends super
class Person1 extends Person{
  constructor(name: string){
    super(name);
  }
  run(): void{
    console.log(this.name + '子类');
  }
}

// 修饰符 修饰属性和方法
// public 公有的，可以在类内外被调用。默认
// protected 受保护的，可以在类内及继承的子类中被调用
// private 私有的，只能在类内被调用
class Person2{
  public name: string;
  protected age: number;
  private money: number;
  constructor(name: string, age: number, money: number){
    this.name = name;
    this.age = age;
    this.money = money;
  }
  run(): void{
    console.log(this.name);
  }
  getMoney(): number{
    return this.money;
  }
}

// 静态属性和方法
class Person3{
  public name: string;
  static age: number = 20;
  constructor(name: string){
    this.name = name;
  }
  run(): void{
    console.log(this.name);
  }
  static getAge(): number{ // 静态方法只能调用静态属性
    return this.age;
  }
}

// 多态 父类定义一个方法不去实现，让继承他的子类去实现，每个子类有不同的表现
// 多态属于继承 实质上就是新方法覆盖旧方法
class Animal{
  name: string;
  constructor(name: string){
    this.name = name;
  }
  eat(): void{
    console.log('吃的方法');
  }
}
class Dog extends Animal{
  constructor(name: string){
    super(name);
  }
  eat(): string{
    return this.name + '吃肉';
  }
}

// abstract 抽象类 不能被实例化，只能被继承。抽象类的抽象方法不包含具体实现。
// 抽象方法只能放在抽象类中，子类必须实现抽象方法。一般用来定义标准。
abstract class Animal1{
  name: string;
  constructor(name: string){
    this.name = name;
  }
  abstract eat(): void;
}
class Dog1 extends Animal1{
  constructor(name: string){
    super(name);
  }
  eat(): void{
    console.log(this.name + '吃肉');
  }
}

// 接口 相当于自定义类型
// 1.属性接口：对json的约束
function printLabel(label: {label: string}): void{
  console.log(label.label);
}
printLabel({label: '123'});
// 对批量方法传入参数进行约束
interface FullName{
  firstName: string;
  secondName: string;
}
function printName(name: FullName): void{
  console.log(name.firstName + name.secondName);
}
let obj = { //写外面可以带其他属性，直接写在括号里只能有接口里的属性
  firstName: '张',
  secondName: '三'
}
printName(obj);

// 可选属性接口
interface FullName1{
  firstName: string;
  secondName?: string;
}
function printName1(name: FullName1): void{
  console.log(name.firstName + name.secondName);
}
let obj1 = {
  firstName: '张',
  // secondName: '三'
}
printName1(obj1); // 可选属性可以不传

// 函数类型接口 对方法传入的参数以及返回值进行约束
interface encrypt{
  (key: string, value: string): string;
}
let md5: encrypt = function(key: string, value: string): string{
  return key + value;
}

// 可索引接口 对数组和对象进行约束，不常用
// 数组
interface UserArr{
  [index: number]: string; // 索引是数字，值是字符串
}
let arr: UserArr = ['1', '2'];
// 对象
interface UserObj{
  [index: string]: string; // 索引是字符串，值是字符串
}
let obj2: UserObj = {name: '张三'};
// 类
interface Animal2{
  name: string;
  eat(str: string): void;
}
class Dog2 implements Animal2{
  name: string;
  constructor(name: string){
    this.name = name;
  }
  eat(): void{ //可以不传参数
    console.log(this.name + '吃肉');
  }
}

// 接口扩展：接口可以继承接口
interface Animal3{
  eat(): void;
}
interface Person4 extends Animal3{
  work(): void;
}
class Web implements Person4{ //还可以同时继承类
  name: string;
  constructor(name: string){
    this.name = name;
  }
  eat(): void{
    console.log(this.name + '吃肉');
  }
  work(): void{
    console.log(this.name + '写代码');
  }
}