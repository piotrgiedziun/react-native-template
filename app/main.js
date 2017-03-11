import React, { Component } from 'react';
import { AsyncStorage, Text, View, Button, Platform } from 'react-native';
import { create } from 'mobx-persist'
import { testStore } from './stores'
import Router from './router'

const hydrate = create({
    storage: AsyncStorage,
    jsonify: true
})

export default class App extends Component {
    state = { rehydrated: false }

    componentWillMount() {
        hydrate('test', testStore)
            .then(() => this.setState({ rehydrated: true }))
    }

    render() {
        if (!this.state.rehydrated) {
            return <Text>Loading...</Text>
        }
        return <Router />
    }
}