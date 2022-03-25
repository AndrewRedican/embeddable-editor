import { IChannelContract } from '../message-broker/validate-contract/schema/contract/contract.model';
import { MessageChannel } from '../message-channel/message-channel';
export interface IChannelSettings {
}
export declare enum ChannelEvent {
    Closed = "closed",
    Cancelled = "cancelled",
    Opened = "opened",
    Denied = "denied",
    Invalid = "invalid"
}
export interface IActionBase {
    type: string;
}
export interface IAction extends IActionBase {
    senderId: string;
    processId?: string;
    contract?: IChannelContract;
    data?: any;
    error?: string;
}
export interface IMessageChannelJSONObjectLiteral {
    name: string;
    id: string;
    contract: IChannelContract;
    active: boolean;
}
export declare type TEventHandler = (eventType: ChannelEvent, channel: MessageChannel, message?: MessageEvent<IAction>) => void;
export declare type TOpenEventHandler = (channel: MessageChannel, message?: MessageEvent<IAction>) => void;
export declare type TCloseEventHandler = (channel: MessageChannel, message?: MessageEvent<IAction>) => void;
export declare type TCancelEventHandler = (channel: MessageChannel, message?: MessageEvent<IAction>) => void;
export declare type TDenyEventHandler = (channel: MessageChannel, message?: MessageEvent<IAction>) => void;
export declare type TInvalidEventHandler = (channel: MessageChannel, message?: MessageEvent<IAction>) => void;
export declare type TMessageHandler<IAction = IActionBase> = (message: IAction, channel: MessageChannel) => void;
export declare type TConnectionRequestHandler = (message: MessageEvent<IAction>) => boolean;
