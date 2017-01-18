// default imports for testing
import { expect } from 'chai'
import { suite, test } from 'mocha-typescript'

// import own code
import { State } from '../src/state'
import * as mutations from '../src/mutations'

@suite ('MUTATIONS')
class Unit {

    @test('increment/decrement works')
    public incrementWorks() {
        const state = new State() // default is 2 adults, 0 juveniles, 0 children
        mutations.DEC(state, 'adults')
        mutations.INC(state, 'juveniles')
        mutations.INC(state, 'children')
        expect(state.adults).to.be.equal(1)
        expect(state.juveniles).to.be.equal(1)
        expect(state.children).to.be.equal(1)
    }

    @test('swapping adults <-> juveniles works')
    public swapWorks() {
        const state = new State() // default is 2 adults, 0 juveniles, 0 children
        mutations.SWAP(state)
        expect(state.adults).to.be.equal(0)
        expect(state.juveniles).to.be.equal(2)
        expect(state.children).to.be.equal(0)
    }

}