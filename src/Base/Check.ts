import { error } from '@lsby/ts_type_fun'

export type Eq<A, B> = A extends B ? (B extends A ? true : error<[A, '不等于', B]>) : error<[A, '不等于', B]>
export type Check<条件组 extends any[], 正确值> = 条件组 extends []
  ? 正确值
  : 条件组 extends [infer a, ...infer as]
  ? a extends true
    ? Check<as, 正确值>
    : a
  : error<['Check:', '解构失败', 条件组]>
