import React, { PropsWithChildren, ReactElement, ReactNode } from "react";
import { highlightOptions, highlightSetting } from "./types";

export const reactReplace = (text:string, regex:RegExp, callback:(match: string, i: number) => ReactElement) : ReactNode[] => {
  let i = 0;
  return text.split(regex).map(subtext => {
    if(subtext.match(regex))
      return callback(subtext, i++);
    return subtext;
  });
}

export const linkify = (text:string|ReactNode[], options:highlightOptions):ReactNode[] => {
  let markOptions = (options[0] instanceof RegExp) ? [options] : options;
  let replacedText:ReactNode[] = Array.isArray(text) ? text : [text];
  let newText:ReactNode[] = [];
  (markOptions as highlightSetting[]).forEach(currentOptions => {
    let [regex, linkFn = (match:string, key:number) => <a href={match} key={key}>{match}</a>] = currentOptions;
    replacedText.forEach(subtext => {
      if(typeof(subtext) !== 'string') {
        newText.push(subtext);
        return;
      }
      newText.push(...reactReplace(subtext, regex, linkFn));
    });
    replacedText = newText;
    newText = [];
  })
  return replacedText;
}

export const Linkify:React.FC<PropsWithChildren> = ({children}:PropsWithChildren) => {
  console.log(children);
  return children;
}