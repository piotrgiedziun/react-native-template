import { Scene } from 'react-native-router-flux'
import { Platform } from 'react-native'

export default class SceneNavBar extends Scene { }

SceneNavBar.defaultProps = {
    hideNavBar: false,
    sceneStyle: {paddingTop: (Platform.OS === 'ios') ? 64 : 54}
}