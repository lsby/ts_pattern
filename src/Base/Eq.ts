import { error } from '@lsby/ts_type_fun'

export type Eq<A, B> = A extends B ? (B extends A ? true : error<[A, '不等于', B]>) : error<[A, '不等于', B]>
