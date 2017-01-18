import { Module, GetterTree, MutationTree, ActionTree, Plugin } from 'vuex'
import { State } from './state'
import Mutations from './mutations'
import Getters from './getters'
import Actions from './actions'

export class Persons implements Module<State, any> {

    // resolve namespacing, applies "foo/bar/..." stuff automatically
    namespaced: boolean = true

    // default properties required for vuex stores/modules
    state: State
    mutations = Mutations
    getters = Getters
    actions = Actions
    plugins: Plugin<State>[] = []

    // create everything
    constructor(plugins?: Plugin<State>[]) {
        this.state = new State()
        this.plugins = plugins
    }
}
