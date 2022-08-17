import { Check } from '../Base/Check'
import { 取二阶类型参数1, 取二阶类型参数2 } from '../Base/K2'
import { 参数, 构造子, 类型 } from '../Base/Symbol'
import * as MapFunc from '../Class/MapFunc'
import { IsMapFunc, mapFunc } from '../Class/MapFunc'

// 类型定义
export type Flow<A, B> = { [类型]: 'Flow'; [构造子]: 'Flow'; [参数]: { value: any } }

// 构造子
export function Flow<
  AB extends AB_Check,
  A = 取二阶类型参数1<AB>,
  B = 取二阶类型参数2<AB>,
  AB_Check = Check<[IsMapFunc<AB>], AB>,
>(a: AB): Flow<A, B> {
  return { [类型]: 'Flow', [构造子]: 'Flow', [参数]: { value: a } }
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
  BC extends BC_Check,
  B = 取二阶类型参数1<BC>,
  C = 取二阶类型参数2<BC>,
  BC_Check = Check<[IsMapFunc<BC>], BC>,
>(f: BC, a: Flow<A, B>): Flow<A, C> {
  return Flow((x: A) => mapFunc(mapFunc(x, a[参数].value), f as any))
}
export function runFlow<A, B>(x: A, a: Flow<A, B>): B {
  return mapFunc(x, a[参数].value)
}

// 实现类型类
// MapFunc
declare module '../Class/MapFunc' {
  interface MapFunc<A> {
    Flow的实现: typeof 类型 extends keyof A ? (A[typeof 类型] extends 'Flow' ? true : false) : false
  }
}
MapFunc.增加实现(function <A, B>(x: A, a: Flow<A, B>): B {
  if (a[类型] != 'Flow') return MapFunc.NEXT
  return runFlow(x, a)
})
