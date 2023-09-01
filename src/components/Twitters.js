import React from 'react';
import { Linkify } from "./Linkify";
export const Twitters = ({ children, component = null }) => {
    return React.createElement(Linkify, { links: false, twitters: true, component: component }, children);
};
