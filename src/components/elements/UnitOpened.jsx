import React, { useEffect, useRef, useState } from "react";
import { Sprite, Container, Text } from '@inlet/react-pixi';
import bottomBg from '../../assets/img/units/zemlyaka/bottom-bg.png'
// import { TweenMax } from "gsap/gsap-core";
import { DropShadowFilter } from '@pixi/filter-drop-shadow';
import { TweenMax } from "gsap/gsap-core";




export default function UnitOpened({ items, cur, headerStyle, descriptionStyle, wWidth }) {
    let wh = window.innerWidth

    const prilipalaRef = useRef()
    const topEggRef = useRef()
    const bottomEggRef = useRef()
    const eggRef = useRef()
    const headerRef = useRef()
    const descriptionRef = useRef()
    const sliderMainRef = useRef()

    const prilipalaShow = () => {
        eggRef.current.filters = [new DropShadowFilter({
            distance: 10,
            rotation: 24,
            blur: 5,
            color: '0x674EA7'
        })];
        prilipalaRef.current.filters = [new DropShadowFilter({
            distance: 10,
            rotation: 24,
            blur: 5,
            color: '0x674EA7'
        })];

        TweenMax.to(eggRef.current, .05,
            {
                x: "-=10", yoyo: true, repeat: 15
            })
            TweenMax.fromTo(topEggRef.current, .35, {
                rotation: '0',
                y: wWidth > 780 ? 85 : 97,
                x: wWidth > 780 ? 450 : 250
            }, {
                y: wWidth > 780 ? 30 : 10,
                x: wWidth > 780 ? 450 : 250,
                rotation: '.4',
                delay: .75,
            })
           TweenMax.fromTo(bottomEggRef.current, .35, {
                rotation: '0',
                y: wWidth > 780 ? '217' : 180,
                x: wWidth > 780 ? 450 : 250
            }, {
                y: wWidth > 780 ? 270 : 200,
                x: wWidth > 780 ? 450 : 250,
                rotation: '-.4',
                delay: .75,
                css: {
                    filter: 'drop-shadow(1px 1px 10px violet)'
                }
            })
            TweenMax.to(prilipalaRef.current,
                .75,
                {
                    x: wWidth > 780 ? "150" : 70,
                    y: wWidth > 780 ? "150" : 120,
                    rotation: '-.3',
                    height: wWidth > 780 ? items[cur - 1].p_width[1] * .6 : items[cur - 1].p_width[1] * .4,
                    width: wWidth > 780 ? items[cur - 1].p_width[0] * .6 : items[cur - 1].p_width[0] * .4,
                    ease: "power4.inOut",
                    alpha: 1,
                    delay: .8
                },
            )
           TweenMax.fromTo(
                headerRef.current, .15, {
                alpha: 0
            },
                {
                    alpha: 1,
                    delay: 1.2
                }
            )
           TweenMax.fromTo(
                descriptionRef.current, .25, {
                alpha: 0
            },
                {
                    alpha: 1,
                    delay: 1.5
                }
            )
    }

    useEffect(() => {
        prilipalaShow()
    }, [cur])

    return (
        <Container x={wWidth > 780 ? 370 : 0} y={40} width={600} height={580} ref={sliderMainRef}>
            <Sprite
                image={items[cur - 1].prilipala}
                width={wWidth > 780 ? items[cur - 1].p_width[0] * .4 : items[cur - 1].p_width[0] * .2}
                height={wWidth > 780 ? items[cur - 1].p_width[1] * .4 : items[cur - 1].p_width[1] * .2}
                x={wWidth > 780 ? 430 : 250}
                y={wWidth > 780 ? 137 : 100}
                anchor={.5}
                ref={prilipalaRef} />
            <Container ref={eggRef}

            >
                <Container
                    ref={bottomEggRef}
                    x={wWidth > 780 ? 450 : 250}
                    y={wWidth > 780 ? 217 : 200}
                >
                    <Sprite
                        image={items[cur - 1].bottomEgg}
                        rotation={0}
                        width={wWidth > 780 ? 260 * .8 : 260 * .5}
                        height={wWidth > 780 ? 178 * .8 : 178 * .5}
                        anchor={.5} />
                </Container>
                <Sprite
                    image={items[cur - 1].topEgg} x={wWidth > 780 ? 450 : 250}
                    width={wWidth > 780 ? 261 * .8 : 261 * .5}
                    height={wWidth > 780 ? 187 * .8 : 187 * .5}
                    y={wWidth > 780 ? 85 : 67}
                    anchor={.5}
                    ref={topEggRef} />
            </Container>

            <Text text={items[cur - 1].name} style={headerStyle} x={50} y={wWidth > 780 ? 290 : 245} ref={headerRef} />
            <Text text={items[cur - 1].description} x={50} y={wWidth > 780 ? 350 : 310} style={descriptionStyle} ref={descriptionRef} />

        </Container>
    )
}
