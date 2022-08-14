import { apply } from './Class/Apply'
import { map } from './Class/Functor'
import { bind } from './Class/Monad'
import { Effect, runEffect } from './Effect'

var a = Effect(() => 1)
var x = bind(a, (a: number) => Effect(() => a + 1))

console.log(runEffect(x))
