export class EventChannel {
    private subscribers = new Map<string, Array<(event: any) => void>>();

    subscribe<T extends BusinessEvent>(eventName: string, handler: (event: T) => void) {
        if (!this.subscribers.has(eventName))
            this.subscribers.set(eventName, [])
        this.subscribers.get(eventName)
            ?.push(handler);
    }

    raise<T extends BusinessEvent>(event: T) {
        this.subscribers.get(event.constructor.name)
            ?.forEach(value => value(event))
    }
}

export const eventChannel = new EventChannel();

export interface BusinessEvent {
}

export class GetLocation implements BusinessEvent {

}
