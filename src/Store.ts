import {Subject} from "rxjs";

import {IEvent, IState} from "./interfaces";
import {Reducer} from "./Reducer";

export class Store {
    private subject:Subject<IState> = new Subject();
    constructor(private reducerMap: {[reducerName: string]: Reducer}){}

    public dispatch(event: IEvent){
        for (const reducerName in this.reducerMap) {
            if (this.reducerMap.hasOwnProperty(reducerName)) {
                this.reducerMap[reducerName].handleEvent(event);
            }
        }
        this.subject.next(this.getState())
    }

    public subscribe(subscriber) {
        this.subject.subscribe(subscriber);
    }
    private getState(): IState {
        const state = {};
        for (const reducerName in this.reducerMap) {
            if (this.reducerMap.hasOwnProperty(reducerName)) {
                state[reducerName] = this.reducerMap[reducerName].getLatestState();
            }
        }
        return state;
    }
}
