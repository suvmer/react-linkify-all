import React from 'react';
export const defaultComponent = (match, i, link) => React.createElement("a", { title: link, href: link }, match);
export const CommonOptions = {
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
