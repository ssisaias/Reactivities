import { makeAutoObservable } from "mobx";

export default class ActivityStore {
    title: string = 'Hello from MobX';

    constructor() {
        makeAutoObservable(this)
    }

    setTitle = () => {
        this.title = this.title.concat('!');
    }
}