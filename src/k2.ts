import { error, 联合转元组 } from '@lsby/ts_type_fun'

export interface 二阶类型<A1, A2> {
  Function: (a: A1) => A2
}

export type 构造二阶类型<构造子, 参数1, 参数2> = 构造子 extends keyof 二阶类型<any, any>
  ? 二阶类型<参数1, 参数2>[构造子]
  : error<['构造二阶类型:', '无法找到构造子', 构造子]>

type _取二阶类型构造子<A, keys> = keys extends []
  ? error<['_取二阶类型构造子:', '无法找到构造子', A]>
  : keys extends [infer key, ...infer keyTail]
  ? key extends keyof 二阶类型<any, any>
    ? A extends 二阶类型<infer a1, infer a2>[key]
      ? key
      : _取二阶类型构造子<A, keyTail>
    : error<['_取二阶类型构造子:', 'key不是二阶类型的键', key]>
  : error<['_取二阶类型构造子:', '无法解构keys', keys]>
export type 取二阶类型构造子<A> = _取二阶类型构造子<A, 联合转元组<keyof 二阶类型<any, any>>>

type _取二阶类型参数1<A, keys> = keys extends []
  ? error<['_取二阶类型参数1:', '无法找到构造子', A]>
  : keys extends [infer key, ...infer keyTail]
  ? key extends keyof 二阶类型<any, any>
    ? A extends 二阶类型<infer a1, infer a2>[key]
      ? a1
      : _取二阶类型参数1<A, keyTail>
    : error<['_取二阶类型参数1:', 'key不是二阶类型的键', key]>
  : error<['_取二阶类型参数1:', '无法解构keys', keys]>
export type 取二阶类型参数1<A> = _取二阶类型参数1<A, 联合转元组<keyof 二阶类型<any, any>>>

type _取二阶类型参数2<A, keys> = keys extends []
  ? error<['_取二阶类型参数2:', '无法找到构造子', A]>
  : keys extends [infer key, ...infer keyTail]
  ? key extends keyof 二阶类型<any, any>
    ? A extends 二阶类型<infer a1, infer a2>[key]
      ? a2
      : _取二阶类型参数2<A, keyTail>
    : error<['_取二阶类型参数2:', 'key不是二阶类型的键', key]>
  : error<['_取二阶类型参数2:', '无法解构keys', keys]>
export type 取二阶类型参数2<A> = _取二阶类型参数2<A, 联合转元组<keyof 二阶类型<any, any>>>
