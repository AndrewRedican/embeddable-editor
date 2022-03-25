import { Schema } from 'jsonschema';
import { IActionDescription } from '../message-broker/validate-contract/schema/action/action.model';
export declare const NO_TYPE = "An action schema requires a unique string as type property.";
export declare const RESERVED_KEYWORD = "'type' is a reserved property which refers an the action type. Use a different name or nest without another property.";
/**
 * Use actionSchema to generate a valid action description with minimal boilerplate.
 * @param type Action type - A unique string that identifies the action
 * @param schema A description of said action
 */
export declare const actionSchema: (type: string, schema?: Schema) => IActionDescription;
