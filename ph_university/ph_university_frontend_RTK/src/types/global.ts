/*
export type TApiResponse<T,> = {
    message: string;
    data: T;
    success: boolean;
    error: string
};
*/

import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TError = {
    data:{
        message: string;
        stack: string;
        success: string;
    };
    status: number;
}
export type TMeta = {
    limit: number;
    page: number;
    total: number;
    totalPage: number;
}

export type TResponse<T> = {
    data? : T;
    error?: TError;
    meta?: TMeta;
    success: boolean;
    message: string;
}

export type TResponseRedux<T> =  TResponse<T> & BaseQueryApi;

export type TQueryParams = {
    name: string;
    value: boolean | React.Key;
}

/*
export type TApiResponse<T> = {
    message: string;
    data: T;
    meta: TMeta;
    success: boolean;
    error: string
} | {
    error: {
        message: string;
        data: null;
        success: boolean;
        error: string;
    };
};
*/