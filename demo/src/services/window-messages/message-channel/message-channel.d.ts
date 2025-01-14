import { IActionBase, IChannelSettings, IMessageChannelJSONObjectLiteral, TEventHandler, TMessageHandler } from './message-channel.model';
export declare class MessageChannel {
    static names: Set<string>;
    static ids: Set<string>;
    static windows: WeakSet<Window>;
    static windowNames: WeakMap<Window, string>;
    static windowIds: WeakMap<Window, string>;
    static windowChannels: WeakMap<Window, MessageChannel>;
    static idChannels: Map<string, MessageChannel>;
    static idNames: Map<string, string>;
    static nameChannels: Map<string, MessageChannel>;
    static channelIds: WeakMap<MessageChannel, string>;
    static channelNames: WeakMap<MessageChannel, string>;
    static processChannel: Map<string, MessageChannel>;
    readonly name: string;
    readonly target: Window;
    readonly readonly: string;
    readonly settings: IChannelSettings;
    private eventSubscriptions;
    private messageSubscriptions;
    private active;
    private id;
    private contract;
    private acceptedActions;
    private notifyEventSpy;
    private notifyMessageReceivedSpy;
    constructor(name: string, target: Window, settings?: IChannelSettings);
    get open(): boolean;
    get closed(): boolean;
    readonly connect: () => void;
    readonly cancel: (notifyTarget?: boolean) => void;
    readonly close: (notifyTarget?: boolean) => void;
    readonly destroy: (notifyTarget?: boolean) => void;
    readonly on: (eventHandler: TEventHandler) => MessageChannel;
    readonly onMessage: <IAction_1 = IActionBase>(messageHandler: TMessageHandler<IAction_1>) => MessageChannel;
    private readonly setActive;
    private readonly setInactive;
    private readonly sendAction;
    readonly sendMessage: (action: {
        [key: string]: any;
    } & IActionBase) => void;
    private readonly validateMessage;
    private readonly notifyEvent;
    private readonly notifyMessageReceived;
    private readonly createProcess;
    private readonly trackProcess;
    private readonly terminateProcess;
    readonly toJSON: () => IMessageChannelJSONObjectLiteral;
}
