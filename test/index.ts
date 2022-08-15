import { Check } from '../src/Base/Check'
import { 取一阶类型参数1 } from '../src/Base/K1'
import { apply } from '../src/Class/Apply'
import { IsFunctor, map } from '../src/Class/Functor'
import { bind } from '../src/Class/Monad'
import { Effect, runEffect } from '../src/Type/Effect'
import { fromMaybe, Just, Maybe } from '../src/Type/Maybe'

function Effect测试() {
  var effect_data = Effect(() => 1)

  var effect_map = map((a: number) => a + 1, effect_data)
  var effect_apply = apply(
    Effect(() => (a: number) => a + 1),
    effect_data,
  )
  var effect_monad = bind(effect_data, (a: number) => Effect(() => a + 1))

  console.log(runEffect(effect_map) == 2)
  console.log(runEffect(effect_apply) == 2)
  console.log(runEffect(effect_monad) == 2)
}
Effect测试()

function Maybe测试() {
  var Maybe_data = Just(1)

  var Maybe_map = map((a: number) => a + 1, Maybe_data)
  var Maybe_apply = apply(
    Just((a: number) => a + 1),
    Maybe_data,
  )
  var Maybe_monad = bind(Maybe_data, (a: number) => Just(a + 1))

  console.log(fromMaybe(Maybe_map, 0) == 2)
  console.log(fromMaybe(Maybe_apply, 0) == 2)
  console.log(fromMaybe(Maybe_monad, 0) == 2)
}
Maybe测试()
