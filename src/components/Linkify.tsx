import { linkify } from "../index";
import { LinkifyProps } from "../types";
import { CommonOptions } from "../utils";

export const Linkify:React.FC<LinkifyProps> = ({children, options = [], links = false, emails = false, tgs = false, twitters = false, instagrams = false, component=null}:LinkifyProps) => {
    let markOptions = Array.isArray(options) ? options : [options];
    if(emails)
      markOptions.push({...CommonOptions['EMAIL'], component: component || CommonOptions['EMAIL'].component});
    if(tgs)
      markOptions.push({...CommonOptions['TG'], component: component || CommonOptions['TG'].component});
    if(twitters)
      markOptions.push({...CommonOptions['TWITTER'], component: component || CommonOptions['TWITTER'].component});
    if(instagrams)
      markOptions.push({...CommonOptions['INSTAGRAM'], component: component || CommonOptions['INSTAGRAM'].component});
    if(links)
      markOptions.push({...CommonOptions['LINK'], component: component || CommonOptions['LINK'].component});
    return linkify(children, markOptions);
}