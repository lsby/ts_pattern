import * as Check from './Base/Check'
import * as Eq from './Base/Eq'
import * as K1 from './Base/K1'
import * as K2 from './Base/K2'
import * as K3 from './Base/K3'
import * as K4 from './Base/K4'
import * as K5 from './Base/K5'
export var Base = { Check, Eq, K1, K2, K3, K4, K5 }

import * as Apply from './Class/Apply'
import * as ArrayLike from './Class/ArrayLike'
import * as FuncLike from './Class/FuncLike'
import * as Functor from './Class/Functor'
import * as Monad from './Class/Monad'
import * as Show from './Class/Show'
export var Class = { Apply, ArrayLike, FuncLike, Functor, Monad, Show }

import * as Array from './Type/Array'
import * as Effect from './Type/Effect'
import * as Flow from './Type/Flow'
import * as Fold from './Type/Fold'
import * as Maybe from './Type/Maybe'
export var Type = { Array, Effect, Flow, Fold, Maybe }

import * as Array_Ex from './TypeEx/Array'
import * as Function_Ex from './TypeEx/Function'
export var TypeEx = { Array: Array_Ex, Function: Function_Ex }
