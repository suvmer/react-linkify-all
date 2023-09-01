import { linkify } from "../index";
import { CommonOptions } from "../utils";
export const Linkify = ({ children, options = [], links = false, emails = false, tgs = false, twitters = false, instagrams = false, component = null }) => {
    let markOptions = Array.isArray(options) ? options : [options];
    if (emails)
        markOptions.push(Object.assign(Object.assign({}, CommonOptions['EMAIL']), { component: component || CommonOptions['EMAIL'].component }));
    if (tgs)
        markOptions.push(Object.assign(Object.assign({}, CommonOptions['TG']), { component: component || CommonOptions['TG'].component }));
    if (twitters)
        markOptions.push(Object.assign(Object.assign({}, CommonOptions['TWITTER']), { component: component || CommonOptions['TWITTER'].component }));
    if (instagrams)
        markOptions.push(Object.assign(Object.assign({}, CommonOptions['INSTAGRAM']), { component: component || CommonOptions['INSTAGRAM'].component }));
    if (links)
        markOptions.push(Object.assign(Object.assign({}, CommonOptions['LINK']), { component: component || CommonOptions['LINK'].component }));
    return linkify(children, markOptions);
};
