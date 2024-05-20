import { USER_ROLE } from "@/constant/role"
import { SvgIconTypeMap } from "@mui/material"
import { OverridableComponent } from "@mui/material/OverridableComponent"

export type TMeta = {
    page: number
    limit: number
    total: number
}
export type TUserRole = keyof typeof USER_ROLE;
export interface TDrawerItem  {
    title: string
    path: string
    parentPath?: string
    icon?: OverridableComponent<SvgIconTypeMap<{},"svg">> & {muiName: string};
    child?: TDrawerItem[]
}


export type TResponseSuccess = {
    data: any;
    meta?: TMeta;
}
export type TResponseError = {
    statusCode: number;
    message: string;
    errorMessages: TResponseErrorMessage[];
}
export type TResponseErrorMessage = {
    path: string|number;
    message: string;
}

export const Gender = ["MALE", "FEMALE"];