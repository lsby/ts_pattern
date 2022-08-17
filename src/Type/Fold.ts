import { Check } from '../Base/Check'
import { 取二阶类型参数1, 取二阶类型参数2 } from '../Base/K2'
import { 参数, 构造子, 类型 } from '../Base/Symbol'
import * as MapFunc from '../Class/MapFunc'
import { IsMapFunc, mapFunc } from '../Class/MapFunc'

// 类型定义
export type Fold<A, B> = { [类型]: 'Fold'; [构造子]: 'Fold'; [参数]: { f: (a: B, b: A) => B; defValue: B; arr: A[] } }

// 构造子
export function Fold<A, B>(f: (a: B, b: A) => B, defValue: B, arr: A[]): Fold<A, B> {
  return { [类型]: 'Fold', [构造子]: 'Fold', [参数]: { f, defValue, arr } }
}

// 扩充推导定义
declare module '../Base/K2' {
  interface 二阶类型<A1, A2> {
    Fold: Fold<A1, A2>
  }
}

// 函数
export function runFoldLeft<A, B>(a: Fold<A, B>): B {
  var s = a[参数].defValue
  for (var x of a[参数].arr) {
    s = a[参数].f(s, x)
  }
  return s
}
