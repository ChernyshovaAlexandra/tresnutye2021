import React, { useEffect } from "react";
import "@fancyapps/ui/dist/fancybox.css";
import { Fancybox as NativeFancybox } from "@fancyapps/ui/dist/fancybox.esm.js";



export default function Fancybox(props) {
    const delegate = props.delegate || "[data-fancybox]";

    useEffect(() => {
        const opts = props.options || {};

        NativeFancybox.bind(delegate, opts);

        return () => {
            NativeFancybox.destroy();
        };
    }, []);

    return <>{props.children}</>;
}