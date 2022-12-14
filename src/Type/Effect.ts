/**
 * 描述一个副作用
 * 需要传入以下数据来创建:
 * - 函数: () => A
 */

import * as Functor from '../Class/Functor'
import * as Apply from '../Class/Apply'
import * as Monad from '../Class/Monad'
import * as Show from '../Class/Show'

// 符号定义
const 类型: unique symbol = Symbol('类型')
const 构造子: unique symbol = Symbol('构造子')
const 参数: unique symbol = Symbol('参数')

// 类型定义
export type Effect<A> = { [类型]: 'Effect'; [构造子]: 'Effect'; [参数]: { value: () => A } }

// 构造子
export function Effect<A>(a: () => A): Effect<A> {
  return { [类型]: 'Effect' as 'Effect', [构造子]: 'Effect' as 'Effect', [参数]: { value: a } }
}

// 扩充推导定义
declare module '../Base/K1' {
  interface 一阶类型<A1> {
    Effect: Effect<A1>
  }
}

// 函数
export function runEffect<A>(a: Effect<A>): A {
  return a[参数].value()
}
export function mapEffect<A, B>(f: (a: A) => B, a: Effect<A>): Effect<B> {
  return Effect(() => f(a[参数].value()))
}
export function applyEffect<A, B>(ff: Effect<(a: A) => B>, fa: Effect<A>): Effect<B> {
  return Effect(() => ff[参数].value()(fa[参数].value()))
}
export function bindEffect<A, B>(a: Effect<A>, f: (a: A) => Effect<B>): Effect<B> {
  return f(a[参数].value())
}

// 实现类型类
// Functor
declare module '../Class/Functor' {
  interface Functor<A> {
    Effect的实现: typeof 类型 extends keyof A ? (A[typeof 类型] extends 'Effect' ? true : false) : false
  }
}
Functor.增加实现(function <A, B>(f: (a: A) => B, a: Effect<A>): Effect<B> {
  if (a[类型] != 'Effect') return Functor.NEXT
  return mapEffect(f, a)
})

// Apply
declare module '../Class/Apply' {
  interface Apply<A> {
    Effect的实现: typeof 类型 extends keyof A ? (A[typeof 类型] extends 'Effect' ? true : false) : false
  }
}
Apply.增加实现(function <A, B>(ff: Effect<(a: A) => B>, fa: Effect<A>): Effect<B> {
  if (ff[类型] != 'Effect' || fa[类型] != 'Effect') return Apply.NEXT
  return applyEffect(ff, fa)
})

// Monad
declare module '../Class/Monad' {
  interface Monad<A> {
    Effect的实现: typeof 类型 extends keyof A ? (A[typeof 类型] extends 'Effect' ? true : false) : false
  }
}
Monad.增加实现(function <A, B>(a: Effect<A>, f: (a: A) => Effect<B>): Effect<B> {
  if (a[类型] != 'Effect') return Monad.NEXT
  return bindEffect(a, f)
})

// Show
declare module '../Class/Show' {
  interface Show<A> {
    Effect的实现: typeof 类型 extends keyof A ? (A[typeof 类型] extends 'Effect' ? true : false) : false
  }
}
Show.增加实现(function <A>(a: Effect<A>): string {
  if (a[类型] != 'Effect') return Show.NEXT
  return 'Effect'
})
