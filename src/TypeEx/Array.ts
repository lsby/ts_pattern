import * as ArrayLike from '../Class/ArrayLike'

// 实现类型类
// ArrayLike
declare module '../Class/ArrayLike' {
  interface ArrayLike<A> {
    Array的实现: A extends Array<any> ? true : false
  }
}
ArrayLike.增加实现(function <A>(a: Array<A>): Array<A> {
  if (!Array.isArray(a)) return ArrayLike.NEXT
  return a
})
