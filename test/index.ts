import { apply } from './Class/Apply'
import { map } from './Class/Functor'
import { Effect, runEffect } from './Effect'

var a = Effect(() => 1)
var x = apply(
  // 这里有问题 应该报错的
  Effect(() => (a: string) => a + 1),
  a,
)

console.log(runEffect(x))
