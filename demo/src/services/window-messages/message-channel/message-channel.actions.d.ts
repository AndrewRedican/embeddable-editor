export declare const protocol = "window-messages";
export declare const types: {
    invalidRequest: string;
    requestConnection: string;
    cancelConnection: string;
    cancelConnectionAcknowledged: string;
    acceptConnection: string;
    denyConnection: string;
    closeConnection: string;
    closeConnectionAcknowledged: string;
    destroyConnection: string;
    openConnection: string;
    newMessage: string;
};
export declare const typesList: string[];
export declare const invalidRequest: (processId: string, error: string) => {
    senderId: string;
    type: string;
    processId: string;
    error: string;
};
export declare const requestConnection: (processId: string) => {
    contract: import("..").IChannelContract;
    senderId: string;
    type: string;
    processId: string;
};
export declare const cancelConnection: (processId: string) => {
    senderId: string;
    type: string;
    processId: string;
};
export declare const cancelConnectionAcknowledged: (processId: string) => {
    senderId: string;
    type: string;
    processId: string;
};
export declare const acceptConnection: (processId: string) => {
    contract: import("..").IChannelContract;
    senderId: string;
    type: string;
    processId: string;
};
export declare const openConnection: (processId: string) => {
    senderId: string;
    type: string;
    processId: string;
};
export declare const denyConnection: (processId: string, error: string) => {
    senderId: string;
    type: string;
    processId: string;
    error: string;
};
export declare const closeConnection: (processId: string) => {
    senderId: string;
    type: string;
    processId: string;
};
export declare const closeConnectionAcknowledged: (processId: string) => {
    senderId: string;
    type: string;
    processId: string;
};
export declare const destroyConnection: () => {
    senderId: string;
    type: string;
};
export declare const newMessage: (data: any) => {
    senderId: string;
    type: string;
    data: any;
};
