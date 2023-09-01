import React from 'react';
import { Linkify } from "./Linkify";
export const Links = ({ children, component = null }) => {
    return React.createElement(Linkify, { links: true, component: component }, children);
};
