import React, { ReactNode } from 'react';
import { linkifySetting, matchFn } from "./types";

export const defaultComponent:matchFn = (match, i, link) => <a title={link} href={link}>{match}</a>;
export const CommonOptions:{[property:string]:linkifySetting} = {
    "LINK": {
      regex: new RegExp("((?:https?://)?(?:www\\.)?[-a-zA-Z0-9@:%_]{1,256}(?:\\.[a-zA-Z0-9]{1,6})+(?:/[-a-zA-Z0-9@:%_.?&=/]*)?)", "g"),
      component: defaultComponent,
      linkFn: match => match.substring(0, 4) === 'http' ? match : 'https://'+match
    },
    "TG": {
      regex: new RegExp("((?<=\\B)@[a-zA-Z0-9_]{5,32}(?=\\b))", "g"),
      component: defaultComponent,
      linkFn: match => "https://t.me/"+match.substring(1)
    },
    "EMAIL": {
      regex: /((?:(?:(?:[^<>()\[\]\\.,;:\s@"]+(?:\.[^<>()\[\]\\.,;:\s@"]+)*)|(?:".+"))@(?:(?:\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(?:(?:[a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))))/g,
      component: defaultComponent,
      linkFn: match => "mailto:"+match
    },
    "TWITTER": {
      regex: new RegExp("((?<=\\B)@[a-zA-Z0-9_]{5,32}(?=\\b))", "g"),
      component: defaultComponent,
      linkFn: match => "https://twitter.com/"+match.substring(1)
    },
    "INSTAGRAM": {
      regex: new RegExp("((?<=\\B)@[a-zA-Z0-9_]{5,32}(?=\\b))", "g"),
      component: defaultComponent,
      linkFn: match => "https://www.instagram.com/"+match.substring(1)  
    }
  }

let key:number = 5316;
export const reactReplace = (text:string, regex:RegExp, component:(match: string, i: number, link:string) => ReactNode, linkFn:(match:string) => string, counter:{i:number} = {i: 0}) : ReactNode[] => {
  let res:ReactNode[] = [];
  for(let subtext of text.split(regex)) {
    if(subtext?.match(regex)) {
      res.push(React.cloneElement(<>{component(subtext, ++counter.i, linkFn(subtext))}</>, {key: "jLkA_" + (key++).toString()}));
    }
    else res.push(subtext);
  };
  return res;
}