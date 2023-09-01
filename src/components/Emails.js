import React from 'react';
import { Linkify } from "./Linkify";
export const Emails = ({ children, component = null }) => {
    return React.createElement(Linkify, { links: false, emails: true, component: component }, children);
};
