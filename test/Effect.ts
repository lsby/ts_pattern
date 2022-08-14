import { TYPE } from './Base/Type'
import * as Functor from './Class/Functor'
import * as Apply from './Class/Apply'
import * as Monad from './Class/Monad'

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
  if (!(a instanceof _Effect)) return Functor.NEXT
  return mapEffect(f, a as any)
})
Apply.增加实现(function (ff, fa) {
  if (!(fa instanceof _Effect && ff instanceof _Effect)) return Apply.NEXT
  return applyEffect(ff as any, fa as any)
})
Monad.增加实现(function (a, f) {
  if (!(a instanceof _Effect)) return Monad.NEXT
  return bindEffect(a as any, f)
})

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
export function applyEffect<A, B>(ff: Effect<(a: A) => B>, fa: Effect<A>): Effect<B> {
  return Effect(() => 解包(ff).value()(解包(fa).value()))
}
export function bindEffect<A, B>(a: Effect<A>, f: (a: A) => Effect<B>): Effect<B> {
  return f(解包(a).value())
}
