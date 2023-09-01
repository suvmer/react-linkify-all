import React from 'react';
import { SingleProps } from "../types";
import { Linkify } from "./Linkify";

export const Tgs:React.FC<SingleProps> = ({children, component=null}:SingleProps) => {
    return <Linkify links={false} tgs component={component}>{children}</Linkify>
}