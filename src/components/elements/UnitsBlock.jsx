
import bg from '../../assets/img/violet-units.png'
import bg_m from '../../assets/img/violet-units-mob.png'
import bg2 from '../../assets/img/white-units.png'
import bg2_m from '../../assets/img/white-units-mob.png'
import arr_up from '../../assets/img/arr-units-up.png'
import arr_down from '../../assets/img/arr-units-down.png'
import React, { useState } from 'react';
import { Stage, Sprite, Container, Text } from '@inlet/react-pixi';
import UnitEgg from './Unitegg'
import UnitOpened from './UnitOpened'
import { items } from './UnitsMass';
import { headerStyle, descriptionStyle, style } from './unitsStyles'

export default function UnitsBlock() {
    const [index, setIndex] = useState(1)
    const [active, setActive] = useState(0)
    const [cur, setCur] = useState(1)
    const [wWidth, setWidth] = useState(window.innerWidth)
    // const [UnitEggY, setUnitY] = useState(false)

    window.addEventListener('resize', function (event) {
        setWidth(window.innerWidth)
    }, true);




    const showNext = () => {
        setIndex((index % 26) + 1)
        startShowPrilipala((index % 26))
    }
    const showPrev = () => {
        index === 1 ? (setIndex(26), startShowPrilipala(25)) : (setIndex(index - 1), startShowPrilipala(index-2))
    }


    const startShowPrilipala = (id) => {
        // setUnitY(id === 1 ? 276 : id === 2 ? 410 : 140)
        // setActive(index);
        console.log(id)
        setCur(id+1)
    }

    return (
        <>
            {
                wWidth !== false ?
                    <Stage width={wWidth > 780 ? 1100 : 342} height={wWidth > 780 ? 700 : 768} options={{ backgroundAlpha: 0 }}>
                        <Sprite width={wWidth > 780 ? 942 : 341}
                            height={wWidth > 780 ? 629 : 750}
                            image={wWidth > 780 ? bg : bg_m}
                            x={0}
                            y={30} />
                        <Sprite
                            image={wWidth > 780 ? bg2 : bg2_m}
                            x={wWidth > 780 ? 335 : 0}
                            y={0}
                            width={wWidth > 780 ? 678 : 341}
                            height={wWidth > 780 ? 619 : 653} />
                        {wWidth > 780 ? <Container>
                            {items.slice(index - 1, index + 2).map(
                                (egg, id) => (
                                    <UnitEgg
                                        egg={egg}
                                        key={id}
                                        x={120}
                                        y={id === 1 ? 276 : id === 2 ? 410 : 140}
                                        setActive={() => startShowPrilipala(id, egg.id)}
                                        active={id === active ? true : false}
                                    />
                                )
                            )}
                        </Container> : null}


                        {cur !== undefined ?
                            <UnitOpened
                                items={items}
                                cur={cur}
                                headerStyle={headerStyle}
                                descriptionStyle={descriptionStyle}
                                wWidth={wWidth}
                            /> : null}

                        <Container x={wWidth > 780 ? 80 : 50} y={wWidth > 780 ? 500 : 630}>
                            <Text
                                text={`${index} / ${items.length}`}
                                style={style}
                                x={160}
                                y={30} />
                            <Sprite
                                image={arr_up}
                                angle={wWidth > 780 ? 0 : -90}
                                interactive={true}
                                buttonMode={true}
                                y={wWidth > 780 ? 0 : 60}
                                pointerdown={showPrev}
                            />
                            <Sprite
                                image={arr_down}
                                angle={wWidth > 780 ? 0 : -90}
                                interactive={true}
                                buttonMode={true}
                                x={80}
                                y={wWidth > 780 ? 0 : 60}
                                pointerdown={showNext}
                            />
                        </Container>
                    </Stage>
                    : null
            }
        </>
    )
}
