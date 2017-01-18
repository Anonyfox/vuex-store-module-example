# vuex-store-module-example

Vuex-Module for "Persons" configuration. Persons can be any combination of (adults, 
juveniles, children) with a sum between 1 and 4. In addition, there must be exactly 
one person that could be 18 (so: 1 adult or 1 juvenile must exist). 

# Features

The default configuration is: 

````javascript
{
    adults: 2,
    juveniles: 0,
    children: 0
}
````

If you try to decrease the last adult, when juveniles already is 0, juveniles will 
be increased to 1 to satisfy the constraint. The same applies vice versa when adults 
is 0 and you decrease the last juvenile. 

This module is [auto-namespaced](http://vuex.vuejs.org/en/modules.html) by default.

# Installation

`npm install --save vuex-store-module-example`

# Usage 

````javascript
// import your functions as needed
import { Persons } from 'vuex-store-module-example'

// initialize it within a store, because it's a class you can instantiate multiples
new Vuex.Store({
    //...
    modules: {
        foo: {
            persons: new Persons()
        },
        bar: {
            persons: new Persons()
        }
    }
    //...
})
````

# Extending/Change events

The functionality within the package is tested and works as-is. But sometimes you 
might want to do something if the state of this module changes internally through 
a mutation. In this case, vuex provides a simple mechanism to interact with such 
encapsulated stores/modules: [Plugins](http://vuex.vuejs.org/en/plugins.html). 

With these plugin-functions you can subscribe to the internal store's state changes
(aka: mutations) and do something when stuff happens. This module can take an 
array of plugins on instantiation, so high-level code can orchestrate business-rules 
on low-level modules easily and cleary separated. 

Example: 

````javascript
import { Persons } from 'vuex-store-module-example'

// create a plugin, which is basically just a function that receives the store
const myPlugin = (store) => {
    store.subscribe(mutation, state) => {
        if (mutation.type === 'DEC') {
            // do something, for example update another store somewhere
        }
    }
}

// initialize a store with the module, including the plugin from above
new Vuex.Store({
    //...
    modules: {
        foo: {
            persons: new Persons([myPlugin])
        }
    }
    //...
})

// if you now dispatch 'foo/persons/dec' somewhere, the plugin code will fire
````
