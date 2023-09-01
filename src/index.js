import { defaultComponent, reactReplace } from "./utils";
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
export * from './components/Emails';
export * from './components/Instagrams';
export * from './components/Linkify';
export * from './components/Links';
export * from './components/Tgs';
export * from './components/Twitters';
