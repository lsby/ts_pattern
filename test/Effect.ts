import { TYPE } from './Base/Type'
import * as Functor from './Class/Functor'
import * as Apply from './Class/Apply'

// 类型定义
export type Effect<A> = { [TYPE]: 'Effect' }
class _Effect<A> {
  constructor(public value: () => A) {}
}

// 扩充推导定义
declare module '../src/k1' {
  interface 一阶类型<A1> {
    Effect: Effect<A1>
  }
}

// 打包解包
function 打包<A>(a: _Effect<A>): Effect<A> {
  return a as any
}
function 解包<A>(a: Effect<A>): _Effect<A> {
  return a as any
}

// 实现类型类
Functor.增加实现(function (f, a) {
  if (a instanceof _Effect) return mapEffect(f, a as any)
  return Functor.NEXT
})
Apply.增加实现(function (ff, fa) {})

// 构造子
export function Effect<A>(a: () => A): Effect<A> {
  return 打包(new _Effect(a))
}

// 函数
export function runEffect<A>(a: Effect<A>): A {
  return 解包(a).value()
}
export function mapEffect<A, B>(f: (a: A) => B, a: Effect<A>): Effect<B> {
  return Effect(() => f(解包(a).value()))
}
