// boolean number string array tuple enum any null undefined void never

// boolean -> true || false
let isDone: boolean = false;

// number
let decLiteral: number = 6;

// string
let userName: string = "bob";

// array -> 两种方式 (类型)[] || Array<类型>
let list0: (number|string)[] = ['1', 2, 3]; // 数字或字符串数组
let list1: Array<number|string> = [1, '2', 3]; // 数字或字符串数组

// tuple
let tuple0: [string, number] = ['1', 2]; // 指定元素类型和个数的数组

// enum 处理标识符
enum Color {
  red=1,
  green=2,
  blue=3
} //默认从0开始编号 若green为5，则red为0，blue及以后依次加1
let c: Color = Color.green; // 2

// any 一般用于操作dom元素
let notSure: any = 4;
notSure = 'maybe a string instead';

// null undefined 其他数据类型的子类型，其他数据类型就是never
let u: undefined = undefined; //und是定义了但未赋值
let n: null = null; //null是定义了并赋值了，但值为空

// void 定义方法时没有返回值
function warnUser(): void {
  console.log("This is my warning message");
}

// never 包含null和undefined，代表从不会出现的值。类型为never的变量其值只能被never类型所赋值，也就是说null本身就是值为null的变量
let x: null;
x = null;
let y: never;
y = (() => {
  throw new Error('message');
})();