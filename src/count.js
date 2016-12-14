import xs from 'xstream'
import {dispatch, stream, handle, action} from './dispatcher'

export const {INCR, DECR} = action('INCR', 'DECR')
export const doIncr = (v) => dispatch(INCR, v)
export const doDecr = (v) => dispatch(DECR, v)

const incr = handle(INCR, v => v)
const decr = handle(DECR, v => -v)

export const count = xs.merge(incr, decr).fold((acc, v) => acc + v, 0)
