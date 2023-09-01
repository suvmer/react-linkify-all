import React from 'react';
import { SingleProps } from "../types";
import { Linkify } from "./Linkify";

export const Emails:React.FC<SingleProps> = ({children, component=null}:SingleProps) => {
    return <Linkify links={false} emails component={component}>{children}</Linkify>
}