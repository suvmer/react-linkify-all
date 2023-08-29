import { ReactNode } from "react";

export type matchFn = (match:string, i:number, link:string) => ReactNode;
export interface linkifySetting {regex: RegExp, component: matchFn, linkFn?:(match: string) => string, builtin?: string};
export type linkifyOptions =  linkifySetting | linkifySetting[];
