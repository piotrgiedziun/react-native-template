import React, { Component } from 'react';
import { AsyncStorage, Text, View, Button, Platform } from 'react-native';
import { create } from 'mobx-persist'
import { StackNavigator } from 'react-navigation';
import { testStore } from './stores'
import { HomeScreen, AboutScreen } from './containers'

const hydrate = create({
    storage: AsyncStorage,
    jsonify: true
})

const AppNavigator = StackNavigator({
    Home: { screen: HomeScreen },
    About: { screen: AboutScreen },
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
        return <AppNavigator />
    }
}