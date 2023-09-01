import { ReactNode } from "react";
import { linkifyOptions, linkifySetting } from "./types";
import { defaultComponent, reactReplace } from "./utils";

export const linkify = (text:string|ReactNode|ReactNode[], options:linkifyOptions):ReactNode[] => {
  let markOptions = Array.isArray(options) ? options : [options];
  let replacedText:ReactNode[] = Array.isArray(text) ? text : [text];
  let newText:ReactNode[] = [];
  (markOptions as linkifySetting[]).forEach(currentOptions => {
    let {regex, component = defaultComponent, linkFn = (match:string) => match} = currentOptions;
    const counter = {i: 0};
    replacedText.forEach(subtext => {
      if(typeof(subtext) !== 'string') {
        newText.push(subtext);
        return;
      }
      newText.push(...reactReplace(subtext, regex, component, linkFn, counter));
    });
    replacedText = newText;
    newText = [];
  })
  return replacedText;
}

export * from './components/Emails'
export * from './components/Instagrams'
export * from './components/Linkify'
export * from './components/Links'
export * from './components/Tgs'
export * from './components/Twitters'