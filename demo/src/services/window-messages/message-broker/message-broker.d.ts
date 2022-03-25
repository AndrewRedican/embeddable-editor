import { IChannelContract } from './validate-contract/schema/contract/contract.model';
import { IChannelSettings, TConnectionRequestHandler } from '../message-channel/message-channel.model';
import { MessageChannel } from '../message-channel/message-channel';
export declare class MessageBroker {
    static id: string;
    static contract: IChannelContract;
    static window: Window;
    static acceptedActionTypes: string[];
    static allowConnection: TConnectionRequestHandler;
    constructor(name: string, contract: IChannelContract);
    addChannel: (name: string, target: Window, settings?: IChannelSettings) => MessageChannel;
    getChannel: (reference: string | Window) => MessageChannel | null;
    readonly setSecurityPolicy: (connectionRequestPolicy: TConnectionRequestHandler) => MessageBroker;
    private onMessage;
    private readonly handleRequestConnection;
    private readonly handleCancelConnection;
    private readonly handleCancelConnectionAcknowledged;
    private readonly handleAcceptConnection;
    private readonly handleDeniedConnection;
    private readonly handleOpenedConnection;
    private readonly handleCloseConnection;
    private readonly handleCloseConnectionAcknowledged;
    private readonly handleDestroyConnection;
    private readonly handleNewMessage;
    private readonly handleInvalidRequest;
}
