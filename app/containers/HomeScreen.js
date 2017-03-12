import React, { Component } from 'react'
import { Text, TextInput, ScrollView, View, Button, StyleSheet } from 'react-native'
import { observer } from 'mobx-react/native'
import { Actions } from 'react-native-router-flux'
import { testStore, pushStore } from '../stores'
import colors from '../constants/colors'

@observer
export default class HomeScreen extends Component {
    render() {
        return (
            <ScrollView style={styles.viewContainer}>
                <Text style={styles.text}>
                    {testStore.customLogic}
                </Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    value={pushStore.token}
                />
                <Button onPress={() => testStore.inc()} title="+1" />
                <Button onPress={() => testStore.dec()} title="-1" />
                <Button onPress={() => Actions.about()} title="About" />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: colors.BACKGROUND_COLOR
  },
  text: {
      alignSelf: 'center',
      fontSize: 20
  }
})