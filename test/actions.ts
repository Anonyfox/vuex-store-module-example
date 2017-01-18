// default imports for testing
import { expect } from 'chai'
import { suite, test } from 'mocha-typescript'

// setup Vuex
import * as Vue from 'vue'
import * as Vuex from 'vuex'
Vue.use(Vuex)

// import own code
import { State } from '../src/state'
import { Persons } from '../src/index'

let store

@suite ('ACTIONS')
class Functional {

    before () {
        store = new Vuex.Store({ 
            modules: { persons: new Persons() } 
        })
    }

    @test('increment/decrement works basically')
    public incrementWorks() {
        store.dispatch('persons/dec', 'adults')
        store.dispatch('persons/inc', 'juveniles')
        store.dispatch('persons/inc', 'children')
        const { adults, juveniles, children } = store.state.persons
        expect(adults).to.be.equal(1)
        expect(juveniles).to.be.equal(1)
        expect(children).to.be.equal(1)
    }

    @test('increment checks maximum constraint of 4 persons')
    public incrementWithValidationWorks() {
        store.dispatch('persons/inc', 'juveniles')
        store.dispatch('persons/inc', 'juveniles')
        let result = store.getters['persons/total']
        expect(result).to.be.equal(4)

        store.dispatch('persons/inc', 'juveniles') // must not trigger mutation
        result = store.getters['persons/total']
        expect(result).to.be.equal(4)
    }

    @test('decrement ensures one full aged person')
    public decrementEnsuresFullAgedPerson() {
        store.dispatch('persons/dec', 'adults')
        store.dispatch('persons/dec', 'adults')
        let result = store.getters['persons/all']
        expect(result.adults).to.be.equal(0)
        expect(result.juveniles).to.be.equal(1)
        expect(result.children).to.be.equal(0)

        store.dispatch('persons/inc', 'children')
        store.dispatch('persons/dec', 'juveniles')
        result = store.getters['persons/all']
        expect(result.adults).to.be.equal(1)
        expect(result.juveniles).to.be.equal(0)
        expect(result.children).to.be.equal(1)
    }

}
