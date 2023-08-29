import React from "react";
let key = 5316;
export const reactReplace = (text, regex, component, linkFn, counter = { i: 0 }) => {
    let res = [];
    for (let subtext of text.split(regex)) {
        if (subtext === null || subtext === void 0 ? void 0 : subtext.match(regex)) {
            res.push(React.cloneElement(React.createElement(React.Fragment, null, component(subtext, ++counter.i, linkFn(subtext))), { key: "jLkA_" + (key++).toString() }));
        }
        else
            res.push(subtext);
    }
    ;
    return res;
};
const defaultComponent = (match, key, link) => React.createElement("a", { key: key, href: link }, match);
export const linkify = (text, options) => {
    let markOptions = Array.isArray(options) ? options : [options];
    let replacedText = Array.isArray(text) ? text : [text];
    let newText = [];
    markOptions.forEach(currentOptions => {
        let { regex, component = defaultComponent, linkFn = (match) => match } = currentOptions;
        const counter = { i: 0 };
        replacedText.forEach(subtext => {
            if (typeof (subtext) !== 'string') {
                newText.push(subtext);
                return;
            }
            newText.push(...reactReplace(subtext, regex, component, linkFn, counter));
        });
        replacedText = newText;
        newText = [];
    });
    return replacedText;
};
const CommonOptions = {
    "LINK": {
        regex: new RegExp("((?:https?://)?(?:www\\.)?[-a-zA-Z0-9@:%_]{1,256}(?:\\.[a-zA-Z0-9]{1,6})+(?:/[-a-zA-Z0-9@:%_.?&=/]*)?)", "g"),
        component: defaultComponent,
        linkFn: match => match.substring(0, 4) === 'http' ? match : 'https://' + match
    },
    "TG": {
        regex: new RegExp("((?<=\\B)@[a-zA-Z0-9_]{5,32}(?=\\b))", "g"),
        component: defaultComponent,
        linkFn: match => "https://tg.me/" + match.substring(1)
    },
    "EMAIL": {
        regex: /((?:(?:(?:[^<>()\[\]\\.,;:\s@"]+(?:\.[^<>()\[\]\\.,;:\s@"]+)*)|(?:".+"))@(?:(?:\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(?:(?:[a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))))/g,
        component: defaultComponent,
        linkFn: match => "mailto:" + match
    },
    "TWITTER": {
        regex: new RegExp("((?<=\\B)@[a-zA-Z0-9_]{5,32}(?=\\b))", "g"),
        component: defaultComponent,
        linkFn: match => "https://twitter.com/" + match.substring(1)
    },
    "INSTAGRAM": {
        regex: new RegExp("((?<=\\B)@[a-zA-Z0-9_]{5,32}(?=\\b))", "g"),
        component: defaultComponent,
        linkFn: match => "https://www.instagram.com/" + match.substring(1)
    }
};
/*TODO 2908230210
Показать функционал всплывающих окон при наведении на ссылку.
(это реализуемо с уже имеющимся функционалом, что здорово)
*/
export const Linkify = ({ children, links = true, emails = false, tgs = false, twitters = false, instagrams = false, component = null }) => {
    const options = [];
    if (emails)
        options.push(Object.assign(Object.assign({}, CommonOptions['EMAIL']), { component: component || CommonOptions['EMAIL'].component }));
    if (tgs)
        options.push(Object.assign(Object.assign({}, CommonOptions['TG']), { component: component || CommonOptions['TG'].component }));
    if (twitters)
        options.push(Object.assign(Object.assign({}, CommonOptions['TWITTER']), { component: component || CommonOptions['TWITTER'].component }));
    if (instagrams)
        options.push(Object.assign(Object.assign({}, CommonOptions['INSTAGRAM']), { component: component || CommonOptions['INSTAGRAM'].component }));
    if (links)
        options.push(Object.assign(Object.assign({}, CommonOptions['LINK']), { component: component || CommonOptions['LINK'].component }));
    return linkify(children, options);
};
export const Emails = ({ children, component = null }) => {
    console.log(children);
    return React.createElement(Linkify, { links: false, emails: true, component: component }, children);
};
export const Tgs = ({ children, component = null }) => {
    return React.createElement(Linkify, { links: false, tgs: true, component: component }, children);
};
export const Twitters = ({ children, component = null }) => {
    return React.createElement(Linkify, { links: false, twitters: true, component: component }, children);
};
export const Instagrams = ({ children, component = null }) => {
    return React.createElement(Linkify, { links: false, instagrams: true, component: component }, children);
};
export const Links = ({ children, component = null }) => {
    return React.createElement(Linkify, { links: true, component: component }, children);
};
