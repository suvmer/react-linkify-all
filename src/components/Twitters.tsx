import React from 'react';
import { SingleProps } from "../types";
import { Linkify } from "./Linkify";

export const Twitters:React.FC<SingleProps> = ({children, component=null}:SingleProps) => {
    return <Linkify links={false} twitters component={component}>{children}</Linkify>
}