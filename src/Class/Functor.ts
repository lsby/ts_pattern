import { Check } from '../Base/Check'
import { 取一阶类型参数1, 取一阶类型构造子, 构造一阶类型 } from '../Base/K1'
import { 取二阶类型参数1, 取二阶类型参数2 } from '../Base/K2'
import { 联合转元组, error } from '@lsby/ts_type_fun'
import { Eq } from '../Base/Eq'

export interface Functor<A> {}

type _IsFunctor<A, keys> = keys extends []
  ? error<['Functor:', '类型', A, '没有实现', 'Functor']>
  : keys extends [infer a, ...infer as]
  ? a extends keyof Functor<A>
    ? Functor<A>[a] extends true
      ? true
      : _IsFunctor<A, as>
    : error<['Functor:', '类型', A, '键判定失败']>
  : error<['Functor:', '类型', A, '解构失败']>
export type IsFunctor<A> = _IsFunctor<A, 联合转元组<keyof Functor<A>>>

var 实现们: any[] = []
export var NEXT: any = Symbol('NEXT')
export function 增加实现(f: (...args: any[]) => any) {
  实现们.push(f)
}

export function map<
  AB,
  FA extends FA_Check,
  F = 取一阶类型构造子<FA>,
  A1 = 取二阶类型参数1<AB>,
  A2 = 取一阶类型参数1<FA>,
  B = 取二阶类型参数2<AB>,
  FB = 构造一阶类型<F, B>,
  FA_Check = Check<[Eq<A1, A2>, IsFunctor<FA>], FA>,
>(f: AB, a: FA): FB {
  for (var 实现 of 实现们) {
    var r = 实现(f, a)
    if (r != NEXT) return r
  }
  throw new Error('没有找到实现')
}
