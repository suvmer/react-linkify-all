import { ReactElement } from "react";

export type matchFn = (match:string, key:number) => ReactElement;
export type highlightSetting = [regexp: RegExp, linkFn?: matchFn];
export type highlightOptions =  highlightSetting | highlightSetting[];
