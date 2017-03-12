import { observable, action, computed, when } from 'mobx'

class PushStore {
    @observable token = null
    constructor() {
        when(
            () => this.token,
            () => this.submitToken()
        )
    }
    submitToken() {
        console.log(this.token)
    }
 }

const pushStore = new PushStore()

export default pushStore