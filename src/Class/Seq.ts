import { error, 联合转元组 } from '@lsby/ts_type_fun'
import { Check } from '../Base/Check'

export interface Seq<A> {}

type _IsSeq<A, keys> = keys extends []
  ? error<['Seq:', '类型', A, '没有实现', 'Seq']>
  : keys extends [infer a, ...infer as]
  ? a extends keyof Seq<A>
    ? Seq<A>[a] extends true
      ? true
      : _IsSeq<A, as>
    : error<['Seq:', '类型', A, '键判定失败']>
  : error<['Seq:', '类型', A, '解构失败']>
export type IsSeq<A> = _IsSeq<A, 联合转元组<keyof Seq<A>>>

var 实现们: any[] = []
export var NEXT: any = Symbol('NEXT')
export function 增加实现(f: (...args: any[]) => any) {
  实现们.push(f)
}

export function toArray<A extends _Check, _Check = Check<[IsSeq<A>], A>>(a: A): A[] {
  for (var 实现 of 实现们) {
    var r = 实现(...arguments)
    if (r != NEXT) return r
  }
  throw new Error('没有找到实现')
}
