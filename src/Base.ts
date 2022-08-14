import { error } from '@lsby/ts_type_fun'

export type EQ<A, B> = A extends B ? (B extends A ? true : false) : false

type _CASE<ConditionArray, THEN, ELSE> = ConditionArray extends []
  ? THEN
  : ConditionArray extends [infer a, ...infer as]
  ? a extends true
    ? _CASE<as, THEN, ELSE>
    : ELSE
  : ELSE
export type CASE<ConditionArray extends any[], THEN, ELSE> = _CASE<ConditionArray, THEN, ELSE>

export type CHECK<ConditionArray extends any[], Value> = CASE<ConditionArray, Value, error<'CHECK检查失败'>>
