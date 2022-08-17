import { Check } from '../Base/Check'
import { Eq } from '../Base/Eq'
import { 取二阶类型参数1, 取二阶类型参数2 } from '../Base/K2'
import { 取三阶类型参数1, 取三阶类型参数2, 取三阶类型参数3 } from '../Base/K3'
import { 参数, 构造子, 类型 } from '../Base/Symbol'
import * as MapFunc from '../Class/MapFunc'
import { IsMapFunc, mapFunc } from '../Class/MapFunc'
import { IsSeq, toArray } from '../Class/Seq'

// 类型定义
export type Fold<A, B> = {
  [类型]: 'Fold'
  [构造子]: 'Fold'
  [参数]: { f: any; defValue: B; arr: any }
}

// 构造子
export function Fold<
  BAB extends _Check,
  A_Seq,
  B1 = 取二阶类型参数1<BAB>,
  AB = 取二阶类型参数2<BAB>,
  A = 取二阶类型参数1<AB>,
  B2 = 取二阶类型参数2<AB>,
  _Check = Check<[Eq<B1, B2>, IsSeq<A_Seq>, IsMapFunc<BAB>, IsMapFunc<AB>], BAB>,
>(f: BAB, defValue: B1, arr: A_Seq): Fold<A, B1> {
  return { [类型]: 'Fold', [构造子]: 'Fold', [参数]: { f: f as any, defValue, arr } }
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
  for (var x of toArray(a[参数].arr)) {
    s = mapFunc(x, mapFunc(s, a[参数].f) as any)
  }
  return s
}
