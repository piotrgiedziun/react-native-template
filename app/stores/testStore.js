import { observable, action, computed } from 'mobx'
import { persist } from 'mobx-persist'

class TestStore {
    @persist @observable counter = 0

    @action inc() {
        this.counter += 1
    }

    @action dec() {
        this.counter -= 1
    }

    @computed get customLogic() {
        if(this.counter<0)
            return 'negative '+this.counter
        return 'positive '+this.counter
    }
 }

const testStore = new TestStore()

export default testStore