import { Check } from '../src/Base/Check'
import { 取一阶类型参数1 } from '../src/Base/K1'
import { apply } from '../src/Class/Apply'
import { IsFunctor, map } from '../src/Class/Functor'
import { bind } from '../src/Class/Monad'
import { List, toArray } from '../src/Type/Array'
import { Effect, runEffect } from '../src/Type/Effect'
import { addFlowNode, Flow, runFlow } from '../src/Type/Flow'
import { fromMaybe, Just, Maybe } from '../src/Type/Maybe'
import '../src/TypeEx/Function'

function eq(a: any, b: any) {
  return JSON.stringify(a) == JSON.stringify(b)
}

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

function List测试() {
  var List_data = List([1, 2, 3])

  var List_map = map((a: number) => a + 1, List_data)
  var List_apply = apply(List([(a: number) => a + 1]), List_data)
  var List_monad = bind(List_data, (a: number) => List([a + 1]))
  var List_monad2 = bind(List([1, 2, 3]), (a: number) => bind(List([2, 3, 4]), (b: number) => List([[a, b]])))

  console.log(eq(toArray(List_map), [2, 3, 4]))
  console.log(eq(toArray(List_apply), [2, 3, 4]))
  console.log(eq(toArray(List_monad), [2, 3, 4]))
  console.log(
    eq(toArray(List_monad2), [
      [1, 2],
      [1, 3],
      [1, 4],
      [2, 2],
      [2, 3],
      [2, 4],
      [3, 2],
      [3, 3],
      [3, 4],
    ]),
  )
}
List测试()

function Flow测试() {
  var f1 = Flow((a: number) => a + 1)
  var f2 = addFlowNode((a: number) => a + 1, f1)
  var f3 = addFlowNode(
    Flow((a: number) => a + 1),
    f1,
  )

  console.log(eq(runFlow(1, f2), 3))
  console.log(eq(runFlow(1, f3), 3))
}
Flow测试()
