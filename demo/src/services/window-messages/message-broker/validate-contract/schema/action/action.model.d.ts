import { Schema } from 'jsonschema';
export interface IActionDescription {
    type: string;
    data?: Schema;
}
