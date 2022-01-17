import { SetMetadata } from "@nestjs/common";
import { IRequestDetails } from "./request-details.decorator";

export const UserActionType = (details: IActionDetails) =>
  SetMetadata("userAction", details);

export interface IActionDetails {
  actionType?: ActionType;
  action?: UserActions;
  actionSubType?: ActionSubType;
  formType?: ActionType;
  formDetails?: IRequestDetails;
  formCode?: string;
  formId?: string;
}

export const enum ActionType {
  implicit = "implicit",
  explicit = "explicit",
}
export const enum ActionSubType {
  list = "list",
  detail = "detail",
}

export enum UserActions {
  create = "create",
  view = "view",
  delete = "delete",
  edit = "edit",
}

export enum ActionCheck {
  create = "checkForAccess",
  delete = "checkResourceAccess",
  edit = "checkResourceAccess",
  view = "returnFilters",
  list = "returnFilters",
  detail = "checkResourceAccess",
}
