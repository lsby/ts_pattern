import * as MapFunc from '../Class/MapFunc'

// 实现类型类
// MapFunc
declare module '../Class/MapFunc' {
  interface MapFunc<A> {
    Function的实现: A extends (a: any) => any ? true : false
  }
}
MapFunc.增加实现(function <A, B>(x: A, a: (a: A) => B): B {
  if (typeof a != 'function') return MapFunc.NEXT
  return a(x)
})
