
export interface IEvent {
    eventName: string;
    payload: any;
}

export interface IState {
    [stateKey: string]: any;
}

export type updaterFunc = (event: IEvent, state: IState) => IState;

export interface IUpdaterMap {
    [eventName: string]: updaterFunc
}
