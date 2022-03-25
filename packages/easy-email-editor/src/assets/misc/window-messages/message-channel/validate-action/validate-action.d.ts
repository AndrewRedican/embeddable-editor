import { IActionDescription } from '../../message-broker/validate-contract/schema/action/action.model';
import { IActionBase } from '../message-channel.model';
export declare const validateAction: (action: IActionBase, actionList: IActionDescription[]) => void | never;
