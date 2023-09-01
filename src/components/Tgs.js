import React from 'react';
import { Linkify } from "./Linkify";
export const Tgs = ({ children, component = null }) => {
    return React.createElement(Linkify, { links: false, tgs: true, component: component }, children);
};
