import React, { Component } from 'react'
import { AsyncStorage, Text, View, Button, Platform } from 'react-native'
import { create } from 'mobx-persist'
import { action } from 'mobx'
import codePush from "react-native-code-push"
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from "react-native-fcm"
import { testStore, pushStore } from './stores'
import Router from './router'

const hydrate = create({
    storage: AsyncStorage,
    jsonify: true
})

@codePush({checkFrequency: codePush.CheckFrequency.ON_APP_RESUME})
export default class App extends Component {
    state = { rehydrated: false }

    componentWillMount() {
        hydrate('test', testStore)
            .then(() => this.setState({ rehydrated: true }))
    }
    componentDidMount() {
        FCM.requestPermissions()
        FCM.getFCMToken().then(this._setToken)
        FCM.getInitialNotification().then(notif => {
            console.log("INITIAL NOTIFICATION", notif)
        })
        this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, this._setToken)
        this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
            console.log(notif)
            if(notif.local_notification || notif.opened_from_tray)
                return
            console.log('persist')
            if(Platform.OS === 'ios') {
              switch(notif._notificationType) {
                case NotificationType.Remote:
                  notif.finish(RemoteNotificationResult.NewData)
                  break;
                case NotificationType.NotificationResponse:
                  notif.finish();
                  break;
                case NotificationType.WillPresent:
                  notif.finish(WillPresentNotificationResult.All)
                  break;
              }
            }
            FCM.presentLocalNotification({
                title: notif.title,
                body: notif.body,
                priority: "high",
                click_action: notif.click_action,
                show_in_foreground: true,
                local: true
            })
        })
    }
    @action _setToken(token) {
        pushStore.token = token
    }
    componentWillUnmount() {
        this.refreshTokenListener.remove()
        this.notificationListener.remove()
    }
    render() {
        if (!this.state.rehydrated) {
            return <Text>Loading...</Text>
        }
        return <Router />
    }
}