import { apply } from './Class/Apply'
import { map } from './Class/Functor'
import { Effect, runEffect } from './Effect'

var a = Effect(() => 1)
var x = apply(
  Effect(() => (a: number) => a + 1),
  a,
)

console.log(runEffect(x))
