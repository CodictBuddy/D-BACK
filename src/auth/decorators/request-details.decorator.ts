import { SetMetadata } from "@nestjs/common";

export const RequestDetails = (details: IRequestDetails) =>
  SetMetadata("requestDetails", details);

export interface IRequestDetails {
  payloadType?: AttrType;
  primaryAttrKey?: string;
  primaryRefAttrKey?: string;

  formPayloadType?: AttrType;
  formAttrKey?: string;
}

export const enum AttrType {
  body = "body",
  param = "param",
  query = "query",
}
