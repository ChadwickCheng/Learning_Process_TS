// 泛型 解决类，接口，方法的复用性，以及对不特定数据类型的支持
function getData<T>(value: T): T { // T表示泛型，具体什么类型是调用这个方法的时候决定的
  return value
}
getData<number>(123)

// 泛型类 比如有个最小堆算法，需要同时支持返回数字和字符串两种类型，通过类的泛型来实现
class MinClass<T> {
  public list: T[] = []
  add(value: T): void {
      this.list.push(value)
  }
  min(): T {
      let minNum = this.list[0]
      for (let i = 0; i < this.list.length; i++) {
          if (minNum > this.list[i]) {
              minNum = this.list[i]
          }
      }
      return minNum
  }
}
let m = new MinClass<number>()
m.add(1)
m.add(2)
m.min()

// 泛型接口
// 1.
interface ConfigFn {
  <T>(value: T): T
}
let getData2: ConfigFn = function<T>(value: T): T {
  return value
}
getData2<string>('123')
// 2.
interface ConfigFn2<T> {
  (value: T): T
}
function getData3<T>(value: T): T {
  return value
}
let myGetData: ConfigFn2<string> = getData3

// 把类作为参数的泛型类
// 1.定义类 2.把类作为参数来约束数据传入的类型
class User {
  username: string | undefined
  password: string | undefined
}
class ArticleCate{
  title: string | undefined
  desc: string | undefined
  status: number | undefined
}
class MysqlDb {
  add(user:User):boolean {
    console.log(user)
    return true
  }
  addArticleCate(articleCate:ArticleCate):boolean {
    console.log(articleCate)
    return true
  }
}
let u1 = new User()
u1.username = '张三'
u1.password = '123456'
let Db = new MysqlDb()
Db.add(u1)
// 这太麻烦了，我们可以这样
class MysqlDb2<T> {
  add(info:T):boolean {
    console.log(info)
    return true
  }
}
let u2 = new User()
u2.username = '张三'
u2.password = '123456'
let Db2 = new MysqlDb2<User>()
Db2.add(u2)

// 案例
// 定义一个操作数据库的库 支持 Mysql Mssql MongoDb
// 要求：Mysql MsSql MongoDb功能一样 都有 add update delete get方法
// 注意：约束统一的规范，以及代码重用
interface DBI<T> {
  add(info:T):boolean
  update(info:T, id:number):boolean
  delete(id:number):boolean
  get(id:number):any[]
}
// 定义一个操作mysql数据库的类 注意：要实现泛型接口 这个类也应该是一个泛型类
class MysqlDb3<T> implements DBI<T> {
  add(info: T): boolean {
    console.log(info)
    return true
  }
  update(info: T, id: number): boolean {
    throw new Error("Method not implemented.")
  }
  delete(id: number): boolean {
    throw new Error("Method not implemented.")
  }
  get(id: number): any[] {
    throw new Error("Method not implemented.")
  }
}
// 操作用户表 定义一个User类和数据表做映射
class User3 {
  username: string | undefined
  password: string | undefined
}
let u3 = new User3()
u3.username = '张三'
u3.password = '123456'
let Db3 = new MysqlDb3<User3>()
Db3.add(u3)