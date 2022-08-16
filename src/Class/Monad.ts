import { error, 联合转元组 } from '@lsby/ts_type_fun'
import { Check } from '../Base/Check'
import { Eq } from '../Base/Eq'
import { 取一阶类型参数1, 取一阶类型构造子, 构造一阶类型 } from '../Base/K1'
import { 取二阶类型参数1, 取二阶类型参数2 } from '../Base/K2'

export interface Monad<A> {}

type _IsMonad<A, keys> = keys extends []
  ? error<['Monad:', '类型', A, '没有实现', 'Monad']>
  : keys extends [infer a, ...infer as]
  ? a extends keyof Monad<A>
    ? Monad<A>[a] extends true
      ? true
      : _IsMonad<A, as>
    : error<['Monad:', '类型', A, '键判定失败']>
  : error<['Monad:', '类型', A, '解构失败']>
export type IsMonad<A> = _IsMonad<A, 联合转元组<keyof Monad<A>>>

var 实现们: any[] = []
export var NEXT: any = Symbol('NEXT')
export function 增加实现(f: (...args: any[]) => any) {
  实现们.push(f)
}

export function bind<
  MA extends MA_Check,
  AMB,
  A1 = 取一阶类型参数1<MA>,
  A2 = 取二阶类型参数1<AMB>,
  MB = 取二阶类型参数2<AMB>,
  M1 = 取一阶类型构造子<MB>,
  M2 = 取一阶类型构造子<MA>,
  MA_Check = Check<[Eq<A1, A2>, Eq<M1, M2>, IsMonad<MA>], MA>,
>(a: MA, f: AMB): MB {
  for (var 实现 of 实现们) {
    var r = 实现(a, f)
    if (r != NEXT) return r
  }
  throw new Error('没有找到实现')
}
