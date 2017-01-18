import { Mutation, MutationTree } from 'vuex'
import { State } from './state'

export type personIdentifier = 'adults' | 'juveniles' | 'children'

export function INC (state: State, key: personIdentifier) {
    state[key]++
}

// decrement the chosen persons type by one
export function DEC (state: State, key: personIdentifier) {
    state[key]--
}

// swaps the persons amounts of adults and juveniles
export function SWAP (state: State) {
    const { adults, juveniles } = state
    state.juveniles = adults 
    state.adults = juveniles
}

// export everything compliant to the vuex specification for getters
export default <MutationTree<State>> {
    INC, DEC, SWAP
}