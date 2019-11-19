import {IEvent, IState, IUpdaterMap} from "./interfaces";

export class Reducer {
    private stateHistory: IState[] = [];
    constructor(
        private updaterMap: IUpdaterMap
    ){
        this.stateHistory.push(null);
    }

    public handleEvent(event: IEvent){
        const updaterFunc = this.updaterMap[event.eventName];
        const mostRecentState = this.stateHistory[this.stateHistory.length - 1];
        if(updaterFunc){
            this.stateHistory.push(updaterFunc(event, mostRecentState))
        }
    }

    public getLatestState():IState {
        return this.stateHistory[this.stateHistory.length - 1];
    }
}
