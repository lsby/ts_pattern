import { CHECK, EQ } from '../../src/Base'
import { 取一阶类型参数1 } from '../../src/k1'
import { 取二阶类型参数1, 取二阶类型参数2 } from '../../src/k2'

var 实现: any[] = []
export var NEXT = Symbol('NEXT')
export function 增加实现(ff: (...args: any[]) => any) {
  实现.push(ff)
}

export function bind<
  MA extends MA_CHECK,
  AMB,
  A1 = 取一阶类型参数1<MA>,
  A2 = 取二阶类型参数1<AMB>,
  MB = 取二阶类型参数2<AMB>,
  M1 = 取一阶类型参数1<MB>,
  M2 = 取一阶类型参数1<MA>,
  MA_CHECK = CHECK<[EQ<A1, A2>, EQ<M1, M2>], MA>,
>(a: MA, f: AMB): MB {
  var r = NEXT
  for (var ff of 实现) {
    r = (ff as any)(f, a)
    if (r == NEXT) continue
    break
  }
  if (r == NEXT) {
    throw new Error('没有找到实现')
  }
  return r as any
}
