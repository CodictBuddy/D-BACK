import { IRequestDetails } from "./request-details.decorator";
export declare const UserActionType: (details: IActionDetails) => import("@nestjs/common").CustomDecorator<string>;
export interface IActionDetails {
    actionType?: ActionType;
    action?: UserActions;
    actionSubType?: ActionSubType;
    formType?: ActionType;
    formDetails?: IRequestDetails;
    formCode?: string;
    formId?: string;
}
export declare const enum ActionType {
    implicit = "implicit",
    explicit = "explicit"
}
export declare const enum ActionSubType {
    list = "list",
    detail = "detail"
}
export declare enum UserActions {
    create = "create",
    view = "view",
    delete = "delete",
    edit = "edit"
}
export declare enum ActionCheck {
    create = "checkForAccess",
    delete = "checkResourceAccess",
    edit = "checkResourceAccess",
    view = "returnFilters",
    list = "returnFilters",
    detail = "checkResourceAccess"
}
