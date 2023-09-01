import React from 'react';
import { SingleProps } from "../types";
import { Linkify } from "./Linkify";

export const Links:React.FC<SingleProps> = ({children, component=null}:SingleProps) => {
    return <Linkify links component={component}>{children}</Linkify>
}