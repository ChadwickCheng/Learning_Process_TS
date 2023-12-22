/*
装饰器：一种特殊类型的声明，它能够被附加到类声明、方法、属性或参数上，可以修改类的行为。
通俗的讲装饰器就是一个方法，可以注入到类、方法、属性参数上来扩展类、属性、方法、参数的功能。
常见的装饰器有：类装饰器、属性装饰器、方法装饰器、参数装饰器。
装饰器的写法：普通装饰器（无法传参）、装饰器工厂（可传参）
*/

//#region 1.类装饰器：类装饰器在类声明之前被声明（紧靠着类声明）。类装饰器应用于类构造函数，可以用来监视，修改或替换类定义。传入一个参数
function logClass(params:any){
  console.log(params);// params就是当前类,可以扩展类的属性和方法
  params.prototype.apiUrl = '动态扩展的属性';
  params.prototype.run = function(){
    console.log('我是一个run方法');
  }// 不修改类的前提下扩展方法
}
@logClass //不加分号 普通装饰器（无法传参）
class HttpClient {
  constructor() {}
  getData() {}
}
let http:any = new HttpClient();
console.log(http.apiUrl);// 打印动态扩展的属性
http.run();// 打印我是一个run方法
//#endregion

//#region 2.类装饰器：装饰器工厂（可传参）
// 可以根据传入的参数执行对应功能
function logClass1(params:string){
  return function(target:any){
    console.log(target);// target就是当前类 HttpClient1
    console.log(params);// 传入的参数 hello
    target.prototype.apiUrl = params;// 扩展属性
  }
}
@logClass1('hello') //不加分号 装饰器工厂（可传参）
class HttpClient1 {
  constructor() {}
  getData() {}
}
let http1:any = new HttpClient1();
console.log(http1.apiUrl);// 打印hello
//#endregion

//#region 3.装饰器不仅可以扩展修改类的属性和方法，还可以修改类的构造函数
// 类装饰器表达式会在运行时当作函数被调用，类的构造函数作为其唯一的参数。如果类装饰器返回一个值，它会使用提供的构造函数来替换类的声明
function logClass2(target:any){
  console.log(target);// target就是当前类 HttpClient2
  return class extends target {
    apiUrl:any = '我是修改后的数据';
    getData() {
      this.apiUrl = this.apiUrl + '----';
      console.log(this.apiUrl);
    }
  }
}
@logClass2
class HttpClient2 {
  public apiUrl:string | undefined;
  constructor() {
    this.apiUrl = '我是构造函数里面的apiUrl';
  }
  getData() {
    console.log(this.apiUrl);
  }
}
let http2:any = new HttpClient2();
http2.getData();// 打印我是构造函数里面的apiUrl
//#endregion

//#region 4.属性装饰器：属性装饰器表达式会在运行时当作函数被调用，传入下列2个参数：1.对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。2.成员的名字。
function logClass3(params:string){
  return function(target:any){
    console.log(target);
    console.log(params);
  }
}
// 属性装饰器
function logProperty(params:any){// 装饰器工厂 params是传入的参数
  return function(target:any,attr:any){// target是类的原型对象 attr是属性名
    console.log(target);// 类的原型对象 HttpClient3 {}
    console.log(attr);// 属性名 url
    target[attr] = params;// 修改属性值
  }
}
@logClass3('xxxx')
class HttpClient3{
  @logProperty('/cd/lwq')// 装饰url
  public url:any | undefined;// 默认无值
  constructor(){}
  getData(){
    console.log(this.url);
  }
}
let http3:any = new HttpClient3();
http3.getData();// 打印/cd/lwq
//#endregion

//#region 5.方法装饰器：它会被应用到方法的 属性描述符上，可以用来监视，修改或者替换方法定义。示例代码中上半部分也修改了实例的属性和方法，之后修改了getData方法的参数。
/*
方法装饰器会在运行时传入下列3个参数：
1.对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
2.成员的名字。
3.成员的属性描述符。
*/
function logMethod(params:any){
  return function(target:any,methodName:any,desc:any){
    console.log(target);// 类的原型对象 HttpClient4 {}
    console.log(methodName);// getData
    console.log(desc);// 属性描述符 Object {value: ƒ, writable: true, enumerable: true, configurable: true} 可以在其中修改或替换方法 value就是当前getData方法
    target.apiUrl = 'xxxx';// 扩展属性
    target.run = function(){// 扩展方法
      console.log('run');
    }
    // 修改装饰器的方法 把装饰器方法里面传入的所有参数改为string类型
    // 1.保存当前的方法
    let oMethod = desc.value;
    // 2.修改当前的方法
    desc.value = function(...args:any[]){
      args = args.map((value)=>{
        return String(value);
      })
      console.log(args);// 打印[123, "xxxx"]
      oMethod.apply(this,args);
    }
  }
}
class HttpClient4{
  public url:any | undefined;
  constructor(){}
  @logMethod('/ccccd')// 也可以传入参数 即105的params
  // getData(){
  //   // console.log(this.url);
  //   console.log('我是getData里面的方法');// 不加123行，则被装饰器的方法覆盖。加了123行，执行122行，执行123行，再执行这里
  // }
  getData(...args:any[]){
    console.log(args)
    console.log('我是getData里面的方法');// 打印顺序 122 136 137
  }
}
let http4:any = new HttpClient4();
console.log(http4.apiUrl);// 打印xxxx
http4.run();// 打印run
http4.getData(123,'xxxx');
//#endregion

//#region 6.方法参数装饰器
/*
参数装饰器表达式会在运行时当作函数被调用，可以使用参数装饰器为类的原型增加一些元素数据，传入下列3个参数：
1.对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
2.方法的名字。
3.参数在函数参数列表中的索引。
*/
function logParams(params:any){
  return function(target:any,methodName:any,paramsIndex:any){
    console.log(params);// 传入的参数 xxxx
    console.log(target);// 类的原型对象 HttpClient5 {}
    console.log(methodName);// getData
    console.log(paramsIndex);// 0
    target.apiUrl = params;// 扩展属性
  }
}
class HttpClient5{
  public url:any | undefined;
  constructor(){}
  getData(@logParams('xxxx') uuid:any){
    console.log(uuid);// 打印123456
  }
}
let http:any = new HttpClient5();
http.getData(123456);
console.log(http.apiUrl);// 打印xxxx
//#endregion

//#region 7.装饰器执行顺序：属性装饰器、方法装饰器、方法参数装饰器、类装饰器（多个同类从后往前）
function logClass6(params:string){
  return function(target:any){
    console.log('类装饰器1');
  }
}
function logClass7(params:string){
  return function(target:any){
    console.log('类装饰器2');
  }
}
function logAttribute(params?:string){
  return function(target:any,attrName:any){
    console.log('属性装饰器');
  }
}
function logMethod(params?:string){
  return function(target:any,attrName:any,desc:any){
    console.log('方法装饰器');
  }
}
function logParams(params?:string){
  return function(target:any,attrName:any,desc:any){
    console.log('方法参数装饰器');
  }
}
@logClass6('http://www.baidu.com')
@logClass7('xxxx')
class HttpClient6{
  @logAttribute()
  public apiUrl:string | undefined;
  constructor(){}
  @logMethod()
  getData(){
    return true;
  }
  setData(@logParams() attr:any){
  }
}
let http6:any = new HttpClient6();
//#endregion