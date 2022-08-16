import { error, 联合转元组 } from '@lsby/ts_type_fun'
import { Check } from '../Base/Check'
import { Eq } from '../Base/Eq'
import { 取一阶类型参数1, 取一阶类型构造子, 构造一阶类型 } from '../Base/K1'
import { 取二阶类型参数1, 取二阶类型参数2 } from '../Base/K2'

export interface Apply<A> {}

type _IsApply<A, keys> = keys extends []
  ? error<['Apply:', '类型', A, '没有实现', 'Apply']>
  : keys extends [infer a, ...infer as]
  ? a extends keyof Apply<A>
    ? Apply<A>[a] extends true
      ? true
      : _IsApply<A, as>
    : error<['Apply:', '类型', A, '键判定失败']>
  : error<['Apply:', '类型', A, '解构失败']>
export type IsApply<A> = _IsApply<A, 联合转元组<keyof Apply<A>>>

var 实现们: any[] = []
export var NEXT: any = Symbol('NEXT')
export function 增加实现(f: (...args: any[]) => any) {
  实现们.push(f)
}

export function apply<
  FAB,
  FA extends FA_Check,
  F1 = 取一阶类型构造子<FA>,
  F2 = 取一阶类型构造子<FAB>,
  AB = 取一阶类型参数1<FAB>,
  A1 = 取一阶类型参数1<FA>,
  A2 = 取二阶类型参数1<取一阶类型参数1<FAB>>,
  B = 取二阶类型参数2<AB>,
  FB = 构造一阶类型<F1, B>,
  FA_Check = Check<[Eq<F1, F2>, Eq<A1, A2>, IsApply<FA>, IsApply<FAB>], FA>,
>(f: FAB, a: FA): FB {
  for (var 实现 of 实现们) {
    var r = 实现(f, a)
    if (r != NEXT) return r
  }
  throw new Error('没有找到实现')
}
