import React from 'react';
import { SingleProps } from "../types";
import { Linkify } from "./Linkify";

export const Instagrams:React.FC<SingleProps> = ({children, component=null}:SingleProps) => {
    return <Linkify links={false} instagrams component={component}>{children}</Linkify>
}