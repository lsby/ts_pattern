import { error, 联合转元组 } from '@lsby/ts_type_fun'
import { Check } from '../Base/Check'

export interface MapFunc<A> {}

type _IsMapFunc<A, keys> = keys extends []
  ? error<['MapFunc:', '类型', A, '没有实现类型类', 'MapFunc']>
  : keys extends [infer a, ...infer as]
  ? a extends keyof MapFunc<A>
    ? MapFunc<A>[a] extends true
      ? true
      : _IsMapFunc<A, as>
    : error<['MapFunc:', '类型', A, '键判定失败']>
  : error<['MapFunc:', '类型', A, '解构失败']>
export type IsMapFunc<A> = _IsMapFunc<A, 联合转元组<keyof MapFunc<A>>>

var 实现们: any[] = []
export var NEXT: any = Symbol('NEXT')
export function 增加实现(f: (...args: any[]) => any) {
  实现们.push(f)
}

export function mapFunc<A, AB extends _Check, B, _Check = Check<[IsMapFunc<AB>], AB>>(x: A, f: AB): B {
  for (var 实现 of 实现们) {
    var r = 实现(...arguments)
    if (r != NEXT) return r
  }
  throw new Error('没有找到实现')
}
