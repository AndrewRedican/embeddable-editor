import { TCancelEventHandler, TCloseEventHandler, TDenyEventHandler, TEventHandler, TInvalidEventHandler, TOpenEventHandler } from '../message-channel/message-channel.model';
export declare const open: (callback: TOpenEventHandler) => TEventHandler;
export declare const close: (callback: TCloseEventHandler) => TEventHandler;
export declare const cancel: (callback: TCancelEventHandler) => TEventHandler;
export declare const deny: (callback: TDenyEventHandler) => TEventHandler;
export declare const invalid: (callback: TInvalidEventHandler) => TEventHandler;
