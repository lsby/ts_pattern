/**
 * 描述一个线性流
 * 由很多节点组成, 最后形成一个流.
 * 对这个流输入一个值, 这个值会依次流经所有节点, 最终取得结果.
 * 需要传入以下数据来创建:
 * - 函数: FuncLike<A,B>
 * 可以通过addFlowNode增加新的节点
 */

import { Check } from '../Base/Check'
import { 取二阶类型参数1, 取二阶类型参数2 } from '../Base/K2'
import * as FuncLike from '../Class/FuncLike'
import { IsFuncLike, call } from '../Class/FuncLike'

// 符号定义
const 类型: unique symbol = Symbol('类型')
const 构造子: unique symbol = Symbol('构造子')
const 参数: unique symbol = Symbol('参数')

// 类型定义
export type Flow<A, B> = { [类型]: 'Flow'; [构造子]: 'Flow'; [参数]: { value: any } }

// 构造子
export function Flow<
  AB extends _Check,
  A = 取二阶类型参数1<AB>,
  B = 取二阶类型参数2<AB>,
  _Check = Check<[IsFuncLike<AB>], AB>,
>(a: AB): Flow<A, B> {
  return { [类型]: 'Flow' as 'Flow', [构造子]: 'Flow' as 'Flow', [参数]: { value: a } }
}

// 扩充推导定义
declare module '../Base/K2' {
  interface 二阶类型<A1, A2> {
    Flow: Flow<A1, A2>
  }
}

// 函数
export function addFlowNode<
  A,
  BC extends _Check,
  B = 取二阶类型参数1<BC>,
  C = 取二阶类型参数2<BC>,
  _Check = Check<[IsFuncLike<BC>], BC>,
>(f: BC, a: Flow<A, B>): Flow<A, C> {
  return Flow((x: A) => call(call(x, a[参数].value), f as any))
}
export function runFlow<A, B>(x: A, a: Flow<A, B>): B {
  return call(x, a[参数].value)
}

// 实现类型类
// FuncLike
declare module '../Class/FuncLike' {
  interface FuncLike<A> {
    Flow的实现: typeof 类型 extends keyof A ? (A[typeof 类型] extends 'Flow' ? true : false) : false
  }
}
FuncLike.增加实现(function <A, B>(x: A, a: Flow<A, B>): B {
  if (a[类型] != 'Flow') return FuncLike.NEXT
  return runFlow(x, a)
})
