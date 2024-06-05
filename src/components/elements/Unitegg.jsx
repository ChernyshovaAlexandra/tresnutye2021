import React from "react";
import { Stage, Sprite, Container, Text } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js'
const style = new PIXI.TextStyle({
    align: "center",
    fontFamily: "Junegull",
    fontSize: 18,
    //fontWeight: "bold",
    fill: ["#fff"],
    // wordWrap: true,
    // wordWrapWidth: 350
});


export default function UnitEgg({ egg, active, x, y, setActive }) {

    return (
        <Container x={x} y={y}>
            <Sprite
                image={egg.tresnutyi}
                anchor={0.5}
                width={active ? 144 : 90} height={active ? 200 : 122} />
            <Text
                interactive={true}
                buttonMode={true}
                text={egg.name}
                x={active ? 120 : 100}
                anchor={0.5}
                y={0}
                pointerdown={setActive}
                style={style} />
        </Container>
    )
}
