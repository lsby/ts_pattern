/**
 * 描述一个列表
 * 需要传入以下数据来创建:
 * - js一个原生数组
 */

import * as Functor from '../Class/Functor'
import * as Apply from '../Class/Apply'
import * as Monad from '../Class/Monad'
import * as Show from '../Class/Show'
import * as ArrayLike from '../Class/ArrayLike'

// 符号定义
const 类型: unique symbol = Symbol('类型')
const 构造子: unique symbol = Symbol('构造子')
const 参数: unique symbol = Symbol('参数')

// 类型定义
export type List<A> = { [类型]: 'List'; [构造子]: 'List'; [参数]: { value: A[] } }

// 构造子
export function List<A>(a: A[]): List<A> {
  return { [类型]: 'List' as 'List', [构造子]: 'List' as 'List', [参数]: { value: a } }
}

// 扩充推导定义
declare module '../Base/K1' {
  interface 一阶类型<A1> {
    List: List<A1>
  }
}

// 函数
export function mapList<A, B>(f: (a: A) => B, a: List<A>): List<B> {
  return List(a[参数].value.map(f))
}
export function applyList<A, B>(ff: List<(a: A) => B>, fa: List<A>): List<B> {
  var f = ff[参数].value[0]
  return mapList(f, fa)
}
export function bindList<A, B>(a: List<A>, f: (a: A) => List<B>): List<B> {
  return List(
    a[参数].value
      .map(f)
      .map((a) => a[参数].value)
      .flat(),
  )
}
export function toArray<A>(a: List<A>): Array<A> {
  return a[参数].value
}

// 实现类型类
// Functor
declare module '../Class/Functor' {
  interface Functor<A> {
    List的实现: typeof 类型 extends keyof A ? (A[typeof 类型] extends 'List' ? true : false) : false
  }
}
Functor.增加实现(function <A, B>(f: (a: A) => B, a: List<A>): List<B> {
  if (a[类型] != 'List') return Functor.NEXT
  return mapList(f, a)
})

// Apply
declare module '../Class/Apply' {
  interface Apply<A> {
    List的实现: typeof 类型 extends keyof A ? (A[typeof 类型] extends 'List' ? true : false) : false
  }
}
Apply.增加实现(function <A, B>(ff: List<(a: A) => B>, fa: List<A>): List<B> {
  if (ff[类型] != 'List' || fa[类型] != 'List') return Apply.NEXT
  return applyList(ff, fa)
})

// Monad
declare module '../Class/Monad' {
  interface Monad<A> {
    List的实现: typeof 类型 extends keyof A ? (A[typeof 类型] extends 'List' ? true : false) : false
  }
}
Monad.增加实现(function <A, B>(a: List<A>, f: (a: A) => List<B>): List<B> {
  if (a[类型] != 'List') return Monad.NEXT
  return bindList(a, f)
})

// Show
declare module '../Class/Show' {
  interface Show<A> {
    List的实现: typeof 类型 extends keyof A ? (A[typeof 类型] extends 'List' ? true : false) : false
  }
}
Show.增加实现(function <A>(a: List<A>): string {
  if (a[类型] != 'List') return Show.NEXT
  return JSON.stringify(a[参数].value)
})

// ArrayLike
declare module '../Class/ArrayLike' {
  interface ArrayLike<A> {
    List的实现: typeof 类型 extends keyof A ? (A[typeof 类型] extends 'List' ? true : false) : false
  }
}
ArrayLike.增加实现(function <A>(a: List<A>): Array<A> {
  if (a[类型] != 'List') return ArrayLike.NEXT
  return toArray(a)
})
