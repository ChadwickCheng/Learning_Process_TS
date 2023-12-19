// ts中定义函数 传参，返回值都指定类型
function getInfo(name: string, age: number): string {
  return `${name} --- ${age}`;
}
let getInfo1 = function (name: string, age: number): string {
  return `${name} --- ${age}`;
}

// 可选参数 ? 可选参数必须配置到参数最后面
function getInfo2(name: string, age?: number): string {
  if (age) {
      return `${name} --- ${age}`;
  } else {
      return `${name} --- 年龄保密`;
  }
}

// 默认参数 
function getInfo3(name: string, age: number = 20): string {
  if (age) {
      return `${name} --- ${age}`;
  } else {
      return `${name} --- 年龄保密`;
  }
}

// 剩余参数
function sum(a: number, b: number, c: number, d: number): number {
  return a + b + c + d;
} // 参数个数固定，不灵活
// 三点运算符 接收形参传过来的值
function sum2(a:number,b:number,...result: number[]): number {
  let sum = a+b;
  for (let i = 0; i < result.length; i++) {
      sum += result[i];
  }
  return sum;
}

// 函数重载
// java中方法重载，重载指的是两个或者两个以上同名函数，但他们的参数不一样，这时会出现函数重载的情况
// typescript中的重载，通过为同一个函数提供多个函数类型定义来试下多种功能的目的
// ts为了兼容es5 以及 es6 重载的写法和java中有区别
// es5中出现同名方法，下面的会替换上面的方法
// ts中的重载，要求先定义好多个函数声明，然后在一个类型最宽泛的函数中实现重载
function s1(name: string): string;
function s1(age: number): string;
function s1(str: any): any {
    if (typeof str === 'string') {
        return `我叫${str}`;
    } else {
        return `我的年龄是${str}`;
    }
}