import React from 'react';
import { Linkify } from "./Linkify";
export const Instagrams = ({ children, component = null }) => {
    return React.createElement(Linkify, { links: false, instagrams: true, component: component }, children);
};
