import { IActionBase, TMessageHandler } from '../message-channel/message-channel.model';
export declare const filter: <IAction extends object = object>(actionType: string, callback: TMessageHandler<IAction & IActionBase>) => TMessageHandler<IAction & IActionBase>;
