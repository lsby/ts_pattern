import { CHECK, EQ } from '../../src/Base'
import { 取一阶类型参数1, 构造一阶类型 } from '../../src/k1'
import { 取二阶类型参数1, 取二阶类型参数2 } from '../../src/k2'

function bind<
  MA extends MA_CHECK,
  AMB,
  A1 = 取一阶类型参数1<MA>,
  A2 = 取二阶类型参数1<AMB>,
  MB = 取二阶类型参数2<AMB>,
  M1 = 取一阶类型参数1<MB>,
  M2 = 取一阶类型参数1<MA>,
  MA_CHECK = CHECK<[EQ<A1, A2>, EQ<M1, M2>], MA>,
>(a: MA, f: AMB): MB {
  return 1 as any
}
