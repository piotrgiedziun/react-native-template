import React from 'react'
import { Platform } from 'react-native'
import { Scene, ActionConst, Router } from 'react-native-router-flux'
import { AboutScreen, HomeScreen } from './containers'
import { SceneNavBar } from './components'

export default () => {
    return (
        <Router>
            <Scene key='root'>
                <SceneNavBar
                    key={'about'}
                    title={'About'}
                    component={AboutScreen}
                />
                <SceneNavBar
                    key={'home'}
                    title={'Home'}
                    component={HomeScreen}
                    initial
                />
            </Scene>
        </Router>
    )
}