import * as Seq from '../Class/Seq'

// 实现类型类
// Seq
declare module '../Class/Seq' {
  interface Seq<A> {
    Array的实现: A extends Array<any> ? true : false
  }
}
Seq.增加实现(function <A>(a: Array<A>): Array<A> {
  if (!Array.isArray(a)) return Seq.NEXT
  return a
})
