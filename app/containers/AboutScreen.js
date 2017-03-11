import React, { Component } from 'react';
import { Text, ScrollView, StyleSheet } from 'react-native';
import colors from '../constants/colors'

export default class AboutScreen extends Component {
    render() {
        return (
            <ScrollView style={styles.viewContainer}>
                <Text style={styles.text}>
                    About page
                </Text>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: colors.BACKGROUND_COLOR,
  }
})