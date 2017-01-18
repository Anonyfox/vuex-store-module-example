import { Store, ActionTree, ActionContext } from 'vuex'
import { State } from './state'
import { personIdentifier } from './mutations'


// increment a person type by one if possible
export function inc (store: ActionContext<State, any>, key: personIdentifier) {
    if (store.getters['canInc']) {
        store.commit('INC', key)
    }
}

// decrements a person type by one if possible, but keeps 1 fullAged person
export function dec (store: ActionContext<State, any>, key: personIdentifier) {
    if (store.getters['fullAged'] === 1) {
        if (key === 'adults' && store.state.adults === 1) {
            store.commit('SWAP')
        } else if (key === 'juveniles' && store.state.juveniles === 1) {
            store.commit('SWAP')
        } else {
            store.commit('DEC', key)
        }
    } else {
        store.commit('DEC', key)
    }
}

// export everything compliant to the vuex specification for actions
export default <ActionTree<State, any>> {
    inc, dec
}