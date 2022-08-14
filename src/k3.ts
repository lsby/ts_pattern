import { error, 联合转元组 } from '@lsby/ts_type_fun'

export type 三阶类型<A1, A2, A3> = {}

export type 构造三阶类型<构造子, 参数1, 参数2, 参数3> = 构造子 extends keyof 三阶类型<any, any, any>
  ? 三阶类型<参数1, 参数2, 参数3>[构造子]
  : error<['构造三阶类型:', '无法找到构造子', 构造子]>

type _取三阶类型构造子<A, keys> = keys extends []
  ? error<['_取三阶类型构造子:', '无法找到构造子', A]>
  : keys extends [infer key, ...infer keyTail]
  ? key extends keyof 三阶类型<any, any, any>
    ? A extends 三阶类型<infer a1, infer a2, infer a3>[key]
      ? key
      : _取三阶类型构造子<A, keyTail>
    : error<['_取三阶类型构造子:', 'key不是三阶类型的键', key]>
  : error<['_取三阶类型构造子:', '无法解构keys', keys]>
export type 取三阶类型构造子<A> = _取三阶类型构造子<A, 联合转元组<keyof 三阶类型<any, any, any>>>

type _取三阶类型参数1<A, keys> = keys extends []
  ? error<['_取三阶类型参数1:', '无法找到构造子', A]>
  : keys extends [infer key, ...infer keyTail]
  ? key extends keyof 三阶类型<any, any, any>
    ? A extends 三阶类型<infer a1, infer a2, infer a3>[key]
      ? a1
      : _取三阶类型参数1<A, keyTail>
    : error<['_取三阶类型参数1:', 'key不是三阶类型的键', key]>
  : error<['_取三阶类型参数1:', '无法解构keys', keys]>
export type 取三阶类型参数1<A> = _取三阶类型参数1<A, 联合转元组<keyof 三阶类型<any, any, any>>>

type _取三阶类型参数2<A, keys> = keys extends []
  ? error<['_取三阶类型参数2:', '无法找到构造子', A]>
  : keys extends [infer key, ...infer keyTail]
  ? key extends keyof 三阶类型<any, any, any>
    ? A extends 三阶类型<infer a1, infer a2, infer a3>[key]
      ? a2
      : _取三阶类型参数2<A, keyTail>
    : error<['_取三阶类型参数2:', 'key不是三阶类型的键', key]>
  : error<['_取三阶类型参数2:', '无法解构keys', keys]>
export type 取三阶类型参数2<A> = _取三阶类型参数2<A, 联合转元组<keyof 三阶类型<any, any, any>>>

type _取三阶类型参数3<A, keys> = keys extends []
  ? error<['_取三阶类型参数3:', '无法找到构造子', A]>
  : keys extends [infer key, ...infer keyTail]
  ? key extends keyof 三阶类型<any, any, any>
    ? A extends 三阶类型<infer a1, infer a2, infer a3>[key]
      ? a3
      : _取三阶类型参数3<A, keyTail>
    : error<['_取三阶类型参数3:', 'key不是三阶类型的键', key]>
  : error<['_取三阶类型参数3:', '无法解构keys', keys]>
export type 取三阶类型参数3<A> = _取三阶类型参数3<A, 联合转元组<keyof 三阶类型<any, any, any>>>
