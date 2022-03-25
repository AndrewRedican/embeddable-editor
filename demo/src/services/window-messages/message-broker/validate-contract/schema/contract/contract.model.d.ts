import { IActionDescription } from '../action/action.model';
export interface IChannelContract {
    emitted: IActionDescription[];
    accepted: IActionDescription[];
}
