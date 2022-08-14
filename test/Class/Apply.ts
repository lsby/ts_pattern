import { EQ, CASE, CHECK } from '../../src/Base'
import { 取一阶类型参数1, 取一阶类型构造子, 构造一阶类型 } from '../../src/k1'
import { 取二阶类型参数1, 取二阶类型参数2, 构造二阶类型 } from '../../src/k2'

var 实现: any[] = []
export var NEXT = Symbol('NEXT')
export function 增加实现(ff: (f: any, a: any) => any) {
  实现.push(ff)
}

export function apply<
  FAB,
  FA extends FA_CHECK,
  F1 = 取一阶类型构造子<FA>,
  F2 = 取一阶类型构造子<FAB>,
  AB = 取一阶类型参数1<FAB>,
  A1 = 取一阶类型参数1<FA>,
  A2 = 取二阶类型参数1<取一阶类型参数1<FAB>>,
  B = 取二阶类型参数2<AB>,
  FB = 构造一阶类型<F1, B>,
  FA_CHECK = CHECK<[EQ<F1, F2>, EQ<A1, A2>], FA>,
>(f: FAB, a: FA): FB {
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
