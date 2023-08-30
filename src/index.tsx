import React, { PropsWithChildren, ReactElement, ReactNode } from "react";
import { linkifyOptions, linkifySetting, matchFn } from "./types";
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
const defaultComponent:matchFn = (match, i, link) => <a href={link}>{match}</a>;

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
const CommonOptions:{[property:string]:linkifySetting} = {
  "LINK": {
    regex: new RegExp("((?:https?://)?(?:www\\.)?[-a-zA-Z0-9@:%_]{1,256}(?:\\.[a-zA-Z0-9]{1,6})+(?:/[-a-zA-Z0-9@:%_.?&=/]*)?)", "g"),
    component: defaultComponent,
    linkFn: match => match.substring(0, 4) === 'http' ? match : 'https://'+match
  },
  "TG": {
    regex: new RegExp("((?<=\\B)@[a-zA-Z0-9_]{5,32}(?=\\b))", "g"),
    component: defaultComponent,
    linkFn: match => "https://tg.me/"+match.substring(1)
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

interface LinkifyProps {
  children:ReactNode|ReactNode[]|string,
  options?:linkifyOptions,
  links?: boolean,
  emails?: boolean,
  tgs?: boolean,
  twitters?: boolean,
  instagrams?: boolean
  component?: matchFn|null,
}
/*TODO 2908230210
1) Показать функционал всплывающих окон при наведении на ссылку.
(это реализуемо с уже имеющимся функционалом, что здорово)
2) Структуризовать
*/
export const Linkify:React.FC<LinkifyProps> = ({children, options = [], links = true, emails = false, tgs = false, twitters = false, instagrams = false, component=null}:LinkifyProps) => {
  if(emails)
    options.push({...CommonOptions['EMAIL'], component: component || CommonOptions['EMAIL'].component});
  if(tgs)
    options.push({...CommonOptions['TG'], component: component || CommonOptions['TG'].component});
  if(twitters)
    options.push({...CommonOptions['TWITTER'], component: component || CommonOptions['TWITTER'].component});
  if(instagrams)
    options.push({...CommonOptions['INSTAGRAM'], component: component || CommonOptions['INSTAGRAM'].component});
  if(links)
    options.push({...CommonOptions['LINK'], component: component || CommonOptions['LINK'].component});
  return linkify(children, options);
}
interface SingleProps {
  children:ReactNode|ReactNode[]|string,
  component?: matchFn|null
}
export const Emails:React.FC<SingleProps> = ({children, component=null}:SingleProps) => {
  console.log(children)
  return <Linkify links={false} emails component={component}>{children}</Linkify>
}
export const Tgs:React.FC<SingleProps> = ({children, component=null}:SingleProps) => {
  return <Linkify links={false} tgs component={component}>{children}</Linkify>
}
export const Twitters:React.FC<SingleProps> = ({children, component=null}:SingleProps) => {
  return <Linkify links={false} twitters component={component}>{children}</Linkify>
}
export const Instagrams:React.FC<SingleProps> = ({children, component=null}:SingleProps) => {
  return <Linkify links={false} instagrams component={component}>{children}</Linkify>
}
export const Links:React.FC<SingleProps> = ({children, component=null}:SingleProps) => {
  return <Linkify links component={component}>{children}</Linkify>
}