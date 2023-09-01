import { ReactNode } from "react";

export type matchFn = (match:string, i:number, link:string) => ReactNode;
export interface linkifySetting {regex: RegExp, component: matchFn, linkFn?:(match: string) => string, builtin?: string};
export type linkifyOptions =  linkifySetting | linkifySetting[];

export interface LinkifyProps {
    children:ReactNode|ReactNode[]|string,
    options?:linkifyOptions,
    links?: boolean,
    emails?: boolean,
    tgs?: boolean,
    twitters?: boolean,
    instagrams?: boolean
    component?: matchFn|null,
  }
export interface SingleProps {
    children:ReactNode|ReactNode[]|string,
    component?: matchFn|null
  }