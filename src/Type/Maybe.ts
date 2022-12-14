import * as Functor from '../Class/Functor'
import * as Apply from '../Class/Apply'
import * as Monad from '../Class/Monad'
import * as Show from '../Class/Show'

// 符号定义
const 类型: unique symbol = Symbol('类型')
const 构造子: unique symbol = Symbol('构造子')
const 参数: unique symbol = Symbol('参数')

// 类型定义
export type Maybe<A> =
  | { [类型]: 'Maybe'; [构造子]: 'Just'; [参数]: { value: A } }
  | { [类型]: 'Maybe'; [构造子]: 'Nothing'; [参数]: { value: A } }

// 构造子
export function Just<A>(a: A): Maybe<A> {
  return { [类型]: 'Maybe' as 'Maybe', [构造子]: 'Just' as 'Just', [参数]: { value: a } }
}
export function Nothing<A>(): Maybe<A> {
  return { [类型]: 'Maybe' as 'Maybe', [构造子]: 'Nothing' as 'Nothing', [参数]: { value: null as any } }
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
Functor.增加实现(function <A, B>(f: (a: A) => B, a: Maybe<A>): Maybe<B> {
  if (a[类型] != 'Maybe') return Functor.NEXT
  return mapMaybe(f, a)
})

// Apply
declare module '../Class/Apply' {
  interface Apply<A> {
    Maybe的实现: typeof 类型 extends keyof A ? (A[typeof 类型] extends 'Maybe' ? true : false) : false
  }
}
Apply.增加实现(function <A, B>(ff: Maybe<(a: A) => B>, fa: Maybe<A>): Maybe<B> {
  if (ff[类型] != 'Maybe' || fa[类型] != 'Maybe') return Apply.NEXT
  return applyMaybe(ff, fa)
})

// Monad
declare module '../Class/Monad' {
  interface Monad<A> {
    Maybe的实现: typeof 类型 extends keyof A ? (A[typeof 类型] extends 'Maybe' ? true : false) : false
  }
}
Monad.增加实现(function <A, B>(a: Maybe<A>, f: (a: A) => Maybe<B>): Maybe<B> {
  if (a[类型] != 'Maybe') return Monad.NEXT
  return bindMaybe(a, f)
})

// Show
declare module '../Class/Show' {
  interface Show<A> {
    Maybe的实现: typeof 类型 extends keyof A ? (A[typeof 类型] extends 'Maybe' ? true : false) : false
  }
}
Show.增加实现(function <A>(a: Maybe<A>): string {
  if (a[类型] != 'Maybe') return Show.NEXT
  if (a[构造子] == 'Nothing') return 'Nothing'
  return `(Just ${a[参数].value})`
})
