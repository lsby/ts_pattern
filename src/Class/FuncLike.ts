/**
 * 描述一种抽象, 这种抽象类似于函数, 输入一个A类型的值, 返回一个B类型的值.
 */

import { error, 联合转元组 } from '@lsby/ts_type_fun'
import { Check } from '../Base/Check'

export interface FuncLike<A> {}

type _IsFuncLike<A, keys> = keys extends []
  ? error<['FuncLike:', '类型', A, '没有实现类型类', 'FuncLike']>
  : keys extends [infer a, ...infer as]
  ? a extends keyof FuncLike<A>
    ? FuncLike<A>[a] extends true
      ? true
      : _IsFuncLike<A, as>
    : error<['FuncLike:', '类型', A, '键判定失败']>
  : error<['FuncLike:', '类型', A, '解构失败']>
export type IsFuncLike<A> = _IsFuncLike<A, 联合转元组<keyof FuncLike<A>>>

var 实现们: any[] = []
export var NEXT: any = Symbol('NEXT')
export function 增加实现(f: (...args: any[]) => any) {
  实现们.push(f)
}

export function call<A, AB extends _Check, B, _Check = Check<[IsFuncLike<AB>], AB>>(x: A, f: AB): B {
  for (var 实现 of 实现们) {
    var r = 实现(...arguments)
    if (r != NEXT) return r
  }
  throw new Error('没有找到实现')
}
