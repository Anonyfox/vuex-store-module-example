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

let store: Vuex.Store<State>

@suite ('GETTERS')
class Functional {

    before() {
        store = new Vuex.Store({ 
            modules: { persons: new Persons() } 
        })
    }

    @test('returning complete state works')
    public allWorks() {
        const result: State = store.getters['persons/all']
        expect(result).to.be.an('object')
        expect(result.adults).to.be.equal(2)
        expect(result.juveniles).to.be.equal(0)
        expect(result.children).to.be.equal(0)
    }

    @test('canDec works')
    public canDecWorks () {
        let result = store.getters['persons/canDec']
        expect(result).to.be.true
        store.commit('persons/DEC', 'adults')
        store.commit('persons/DEC', 'adults')
        result = store.getters['persons/canDec']
        expect(result).to.be.false
    }

    @test('canInc works')
    public canIncWorks () {
        let result = store.getters['persons/canInc']
        expect(result).to.be.true
        store.commit('persons/INC', 'adults')
        store.commit('persons/INC', 'adults')
        result = store.getters['persons/canInc']
        expect(result).to.be.false
    }

    @test('returns the number of full aged persons')
    public fullAgedWorks() {
        store.dispatch('persons/inc', 'children')
        const result = store.getters['persons/fullAged']
        expect(result).to.be.equal(2)
    }

    @test('returns validity of the current state')
    public isValidWorks() {
        let result = store.getters['persons/isValid']
        expect(result).to.be.true

        store.commit('persons/DEC', 'adults')
        store.commit('persons/DEC', 'adults')
        result = store.getters['persons/isValid']
        expect(result).to.be.false
        
        store.commit('persons/INC', 'juveniles')
        result = store.getters['persons/isValid']
        expect(result).to.be.true
    }

    @test('returns the total amount of persons within the state')
    public totalWorks() {
        let result = store.getters['persons/total']
        expect(result).to.be.equal(2)
        
        store.commit('persons/INC', 'children')
        result = store.getters['persons/total']
        expect(result).to.be.equal(3)
    }
}