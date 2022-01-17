import { SetMetadata } from "@nestjs/common";

export const CheckRelatedForms = (value: boolean) =>
  SetMetadata("checkRelatedForms", value);
