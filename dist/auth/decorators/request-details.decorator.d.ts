export declare const RequestDetails: (details: IRequestDetails) => import("@nestjs/common").CustomDecorator<string>;
export interface IRequestDetails {
    payloadType?: AttrType;
    primaryAttrKey?: string;
    primaryRefAttrKey?: string;
    formPayloadType?: AttrType;
    formAttrKey?: string;
}
export declare const enum AttrType {
    body = "body",
    param = "param",
    query = "query"
}
