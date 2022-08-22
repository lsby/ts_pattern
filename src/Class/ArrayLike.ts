/**
 * 描述一种抽象, 这种抽象可以转换为js的原生数组.
 */

import { error, 联合转元组 } from '@lsby/ts_type_fun'
import { Check } from '../Base/Check'

export interface ArrayLike<A> {}

type _IsArrayLike<A, keys> = keys extends []
  ? error<['ArrayLike:', '类型', A, '没有实现类型类', 'ArrayLike']>
  : keys extends [infer a, ...infer as]
  ? a extends keyof ArrayLike<A>
    ? ArrayLike<A>[a] extends true
      ? true
      : _IsArrayLike<A, as>
    : error<['ArrayLike:', '类型', A, '键判定失败']>
  : error<['ArrayLike:', '类型', A, '解构失败']>
export type IsArrayLike<A> = _IsArrayLike<A, 联合转元组<keyof ArrayLike<A>>>

var 实现们: any[] = []
export var NEXT: any = Symbol('NEXT')
export function 增加实现(f: (...args: any[]) => any) {
  实现们.push(f)
}

export function toArray<A extends _Check, _Check = Check<[IsArrayLike<A>], A>>(a: A): A[] {
  for (var 实现 of 实现们) {
    var r = 实现(...arguments)
    if (r != NEXT) return r
  }
  throw new Error('没有找到实现')
}
