/**
 * 描述一种抽象, 这种抽象可以被转换为字符串.
 */

import { error, 联合转元组 } from '@lsby/ts_type_fun'
import { Check } from '../Base/Check'

export interface Show<A> {}

type _IsShow<A, keys> = keys extends []
  ? error<['Show:', '类型', A, '没有实现类型类', 'Show']>
  : keys extends [infer a, ...infer as]
  ? a extends keyof Show<A>
    ? Show<A>[a] extends true
      ? true
      : _IsShow<A, as>
    : error<['Show:', '类型', A, '键判定失败']>
  : error<['Show:', '类型', A, '解构失败']>
export type IsShow<A> = _IsShow<A, 联合转元组<keyof Show<A>>>

var 实现们: any[] = []
export var NEXT: any = Symbol('NEXT')
export function 增加实现(f: (...args: any[]) => any) {
  实现们.push(f)
}

export function show<A extends _Check, _Check = Check<[IsShow<A>], A>>(a: A): string {
  for (var 实现 of 实现们) {
    var r = 实现(...arguments)
    if (r != NEXT) return r
  }
  throw new Error('没有找到实现')
}
