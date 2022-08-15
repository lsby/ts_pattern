import { Check } from '../src/Base/Check'
import { apply } from '../src/Class/Apply'
import { IsFunctor, map } from '../src/Class/Functor'
import { bind } from '../src/Class/Monad'
import { Effect, runEffect } from '../src/Type/Effect'

var a = Effect(() => 1)
var x = map((a: number) => a + 1, a)

console.log(runEffect(x))
