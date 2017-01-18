import { Getter, GetterTree } from 'vuex'
import { State } from './state'

// returns the complete state as-is
export function all (state: State): State {
    return state
}

// can any person be removed from the state, minimum is 0
export function canDec (state: State): boolean {
    return total(state) > 0
}

// can any person be added to the state, limit is 4
export function canInc (state: State): boolean {
    return total(state) < 4
}

// sum of all persons that are considered full-aged (~ above 18)
export function fullAged (state: State): number {
    return state.adults + state.juveniles
}

// is the current state a valid combination
export function isValid (state: State): boolean {
    return fullAged(state) > 0 && total(state) <= 4
}

// sum of all persons
export function total (state: State): number {
    return state.adults + state.juveniles + state.children
}

// export everything compliant to the vuex specification for getters
export default <GetterTree<State, any>> {
    all, canDec, canInc, fullAged, isValid, total
}