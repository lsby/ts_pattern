import { 取一阶类型参数1, 构造一阶类型 } from '../../src/k1'
import { 取二阶类型参数1, 取二阶类型参数2 } from '../../src/k2'

function bind<
  AMB,
  A = 取二阶类型参数1<AMB>,
  MB = 取二阶类型参数2<AMB>,
  M = 取一阶类型参数1<MB>,
  MA = 构造一阶类型<M, A>,
>(a: MA, f: AMB): MB {
  return 1 as any
}
