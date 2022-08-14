import { error, 联合转元组 } from '@lsby/ts_type_fun'

export interface 一阶类型<A1> {
  Array: Array<A1>
}

export type 构造一阶类型<构造子, 参数1> = 构造子 extends keyof 一阶类型<any>
  ? 一阶类型<参数1>[构造子]
  : error<['构造一阶类型:', '无法找到构造子', 构造子]>

type _取一阶类型构造子<A, keys> = keys extends []
  ? error<['_取一阶类型构造子:', '无法找到构造子', A]>
  : keys extends [infer key, ...infer keyTail]
  ? key extends keyof 一阶类型<any>
    ? A extends 一阶类型<infer a1>[key]
      ? key
      : _取一阶类型构造子<A, keyTail>
    : error<['_取一阶类型构造子:', 'key不是一阶类型的键', key]>
  : error<['_取一阶类型构造子:', '无法解构keys', keys]>
export type 取一阶类型构造子<A> = _取一阶类型构造子<A, 联合转元组<keyof 一阶类型<any>>>

type _取一阶类型参数1<A, keys> = keys extends []
  ? error<['_取一阶类型参数1:', '无法找到构造子', A]>
  : keys extends [infer key, ...infer keyTail]
  ? key extends keyof 一阶类型<any>
    ? A extends 一阶类型<infer a1>[key]
      ? a1
      : _取一阶类型参数1<A, keyTail>
    : error<['_取一阶类型参数1:', 'key不是一阶类型的键', key]>
  : error<['_取一阶类型参数1:', '无法解构keys', keys]>
export type 取一阶类型参数1<A> = _取一阶类型参数1<A, 联合转元组<keyof 一阶类型<any>>>
