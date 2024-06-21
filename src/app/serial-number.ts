export interface SerialRequest {
    [key: string]: any;
    NumberOfPos: number,
    Pos_RequestId: string,
    Pos_SerialNumber: string[],
    Pos_Accounts: string,
    PTSP: string,
    Pos_Model: string,
    Pos_Processor: string,
    status: string
}