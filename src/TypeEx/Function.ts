import * as FuncLike from '../Class/FuncLike'

// 实现类型类
// FuncLike
declare module '../Class/FuncLike' {
  interface FuncLike<A> {
    Function的实现: A extends (a: any) => any ? true : false
  }
}
FuncLike.增加实现(function <A, B>(x: A, a: (a: A) => B): B {
  if (typeof a != 'function') return FuncLike.NEXT
  return a(x)
})
