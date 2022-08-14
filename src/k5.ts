import { error, 联合转元组 } from '@lsby/ts_type_fun'

export interface 五阶类型<A1, A2, A3, A4, A5> {}

export type 构造五阶类型<构造子, 参数1, 参数2, 参数3, 参数4, 参数5> = 构造子 extends keyof 五阶类型<
  any,
  any,
  any,
  any,
  any
>
  ? 五阶类型<参数1, 参数2, 参数3, 参数4, 参数5>[构造子]
  : error<['构造五阶类型:', '无法找到构造子', 构造子]>

type _取五阶类型构造子<A, keys> = keys extends []
  ? error<['_取五阶类型构造子:', '无法找到构造子', A]>
  : keys extends [infer key, ...infer keyTail]
  ? key extends keyof 五阶类型<any, any, any, any, any>
    ? A extends 五阶类型<infer a1, infer a2, infer a3, infer a4, infer a5>[key]
      ? key
      : _取五阶类型构造子<A, keyTail>
    : error<['_取五阶类型构造子:', 'key不是五阶类型的键', key]>
  : error<['_取五阶类型构造子:', '无法解构keys', keys]>
export type 取五阶类型构造子<A> = _取五阶类型构造子<A, 联合转元组<keyof 五阶类型<any, any, any, any, any>>>

type _取五阶类型参数1<A, keys> = keys extends []
  ? error<['_取五阶类型参数1:', '无法找到构造子', A]>
  : keys extends [infer key, ...infer keyTail]
  ? key extends keyof 五阶类型<any, any, any, any, any>
    ? A extends 五阶类型<infer a1, infer a2, infer a3, infer a4, infer a5>[key]
      ? a1
      : _取五阶类型参数1<A, keyTail>
    : error<['_取五阶类型参数1:', 'key不是五阶类型的键', key]>
  : error<['_取五阶类型参数1:', '无法解构keys', keys]>
export type 取五阶类型参数1<A> = _取五阶类型参数1<A, 联合转元组<keyof 五阶类型<any, any, any, any, any>>>

type _取五阶类型参数2<A, keys> = keys extends []
  ? error<['_取五阶类型参数2:', '无法找到构造子', A]>
  : keys extends [infer key, ...infer keyTail]
  ? key extends keyof 五阶类型<any, any, any, any, any>
    ? A extends 五阶类型<infer a1, infer a2, infer a3, infer a4, infer a5>[key]
      ? a2
      : _取五阶类型参数2<A, keyTail>
    : error<['_取五阶类型参数2:', 'key不是五阶类型的键', key]>
  : error<['_取五阶类型参数2:', '无法解构keys', keys]>
export type 取五阶类型参数2<A> = _取五阶类型参数2<A, 联合转元组<keyof 五阶类型<any, any, any, any, any>>>

type _取五阶类型参数3<A, keys> = keys extends []
  ? error<['_取五阶类型参数3:', '无法找到构造子', A]>
  : keys extends [infer key, ...infer keyTail]
  ? key extends keyof 五阶类型<any, any, any, any, any>
    ? A extends 五阶类型<infer a1, infer a2, infer a3, infer a4, infer a5>[key]
      ? a3
      : _取五阶类型参数3<A, keyTail>
    : error<['_取五阶类型参数3:', 'key不是五阶类型的键', key]>
  : error<['_取五阶类型参数3:', '无法解构keys', keys]>
export type 取五阶类型参数3<A> = _取五阶类型参数3<A, 联合转元组<keyof 五阶类型<any, any, any, any, any>>>

type _取五阶类型参数4<A, keys> = keys extends []
  ? error<['_取五阶类型参数4:', '无法找到构造子', A]>
  : keys extends [infer key, ...infer keyTail]
  ? key extends keyof 五阶类型<any, any, any, any, any>
    ? A extends 五阶类型<infer a1, infer a2, infer a3, infer a4, infer a5>[key]
      ? a4
      : _取五阶类型参数4<A, keyTail>
    : error<['_取五阶类型参数4:', 'key不是五阶类型的键', key]>
  : error<['_取五阶类型参数4:', '无法解构keys', keys]>
export type 取五阶类型参数4<A> = _取五阶类型参数4<A, 联合转元组<keyof 五阶类型<any, any, any, any, any>>>

type _取五阶类型参数5<A, keys> = keys extends []
  ? error<['_取五阶类型参数5:', '无法找到构造子', A]>
  : keys extends [infer key, ...infer keyTail]
  ? key extends keyof 五阶类型<any, any, any, any, any>
    ? A extends 五阶类型<infer a1, infer a2, infer a3, infer a4, infer a5>[key]
      ? a5
      : _取五阶类型参数5<A, keyTail>
    : error<['_取五阶类型参数5:', 'key不是五阶类型的键', key]>
  : error<['_取五阶类型参数5:', '无法解构keys', keys]>
export type 取五阶类型参数5<A> = _取五阶类型参数5<A, 联合转元组<keyof 五阶类型<any, any, any, any, any>>>
