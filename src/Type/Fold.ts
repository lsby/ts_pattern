/**
 * 描述一个折叠结构
 * 即通过给定函数将一个可迭代的组转换为一个值
 * 一个例子是js数组的reduce
 * 需要传入以下数据来创建:
 * - 函数
 * - 初始值
 * - 可迭代组
 */

import { Check } from '../Base/Check'
import { Eq } from '../Base/Eq'
import { 取二阶类型参数1, 取二阶类型参数2 } from '../Base/K2'
import { IsArrayLike, toArray } from '../Class/ArrayLike'
import { call, IsFuncLike } from '../Class/FuncLike'

// 符号定义
const 类型: unique symbol = Symbol('类型')
const 构造子: unique symbol = Symbol('构造子')
const 参数: unique symbol = Symbol('参数')

// 类型定义
export type Fold<A, B> = {
  [类型]: 'Fold'
  [构造子]: 'Fold'
  [参数]: { f: any; defValue: B; arr: any }
}

// 构造子
export function Fold<
  BAB extends _Check,
  A_ArrayLike,
  B1 = 取二阶类型参数1<BAB>,
  AB = 取二阶类型参数2<BAB>,
  A = 取二阶类型参数1<AB>,
  B2 = 取二阶类型参数2<AB>,
  _Check = Check<[Eq<B1, B2>, IsArrayLike<A_ArrayLike>, IsFuncLike<BAB>, IsFuncLike<AB>], BAB>,
>(f: BAB, defValue: B1, arr: A_ArrayLike): Fold<A, B1> {
  return { [类型]: 'Fold' as 'Fold', [构造子]: 'Fold' as 'Fold', [参数]: { f: f as any, defValue, arr } }
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
    s = call(x, call(s, a[参数].f) as any)
  }
  return s
}
