import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";

export default class ActivityStore {
    activities: Activity[] = [];
    selectedActivity: Activity | null = null;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    loadActivities = async () => {
        this.setLoadingInitialState(true);
        try {
            const activites = await agent.Activities.list();
            
            activites.forEach(act => {
                act.date = act.date.split('T')[0];
                this.activities.push(act);
            });

            this.setLoadingInitialState(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitialState(false);
            
        }
    }

    setLoadingInitialState = (state: boolean) => {
        this.loadingInitial = state;
    }
}
