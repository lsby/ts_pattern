import { 参数, 构造子, 类型 } from '../Base/Symbol'
import * as Functor from '../Class/Functor'
import * as Apply from '../Class/Apply'
import * as Monad from '../Class/Monad'
import * as Show from '../Class/Show'

// 类型定义
export type Maybe<A> =
  | { [类型]: 'Maybe'; [构造子]: 'Just'; [参数]: { value: A } }
  | { [类型]: 'Maybe'; [构造子]: 'Nothing'; [参数]: { value: A } }

// 构造子
export function Just<A>(a: A): Maybe<A> {
  return { [类型]: 'Maybe', [构造子]: 'Just', [参数]: { value: a } }
}
export function Nothing<A>(): Maybe<A> {
  return { [类型]: 'Maybe', [构造子]: 'Nothing', [参数]: { value: null as any } }
}

// 扩充推导定义
declare module '../Base/K1' {
  interface 一阶类型<A1> {
    Maybe: Maybe<A1>
  }
}

// 函数
export function mapMaybe<A, B>(f: (a: A) => B, a: Maybe<A>): Maybe<B> {
  if (a[构造子] == 'Just') {
    return Just(f(a[参数].value))
  }
  return Nothing()
}
export function applyMaybe<A, B>(ff: Maybe<(a: A) => B>, fa: Maybe<A>): Maybe<B> {
  if (fa[构造子] == 'Just' && ff[构造子] == 'Just') {
    return Just(ff[参数].value(fa[参数].value))
  }
  return Nothing()
}
export function bindMaybe<A, B>(a: Maybe<A>, f: (a: A) => Maybe<B>): Maybe<B> {
  if (a[构造子] == 'Just') {
    return f(a[参数].value)
  }
  return Nothing()
}
export function fromMaybe<A>(a: Maybe<A>, def: A): A {
  if (a[构造子] == 'Nothing') return def
  return a[参数].value
}

// 实现类型类
// Functor
declare module '../Class/Functor' {
  interface Functor<A> {
    Maybe的实现: typeof 类型 extends keyof A ? (A[typeof 类型] extends 'Maybe' ? true : false) : false
  }
}
Functor.增加实现(function (f, a) {
  if (a[类型] != 'Maybe') return Functor.NEXT
  return mapMaybe(f, a as any)
})

// Apply
declare module '../Class/Apply' {
  interface Apply<A> {
    Maybe的实现: typeof 类型 extends keyof A ? (A[typeof 类型] extends 'Maybe' ? true : false) : false
  }
}
Apply.增加实现(function (ff, fa) {
  if (ff[类型] != 'Maybe' || fa[类型] != 'Maybe') return Apply.NEXT
  return applyMaybe(ff as any, fa as any)
})

// Monad
declare module '../Class/Monad' {
  interface Monad<A> {
    Maybe的实现: typeof 类型 extends keyof A ? (A[typeof 类型] extends 'Maybe' ? true : false) : false
  }
}
Monad.增加实现(function (a, f) {
  if (a[类型] != 'Maybe') return Monad.NEXT
  return bindMaybe(a as any, f)
})

// Show
declare module '../Class/Show' {
  interface Show<A> {
    Maybe的实现: typeof 类型 extends keyof A ? (A[typeof 类型] extends 'Maybe' ? true : false) : false
  }
}
Show.增加实现(function (a) {
  if (a[类型] != 'Maybe') return Show.NEXT
  return 'Maybe'
})
