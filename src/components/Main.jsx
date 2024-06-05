import React, { useEffect } from "react";
import Planet from "./elements/Planet";
import Comets from "./elements/Comets";
import gsap from "gsap/all";
import ScrollTrigger from "gsap/ScrollTrigger";
import { TimelineMax } from "gsap/gsap-core";


export default function Main({ shop }) {
    let wh = window.innerWidth
    useEffect(() => {
        if (wh > 980) {
            var tl = new TimelineMax();
            gsap.registerPlugin(ScrollTrigger);
            tl.to('.header-rocket', {
                scrollTrigger: {
                    trigger: 'body',
                    start: "150px",
                    scrub: true,
                    end: "+=500",
                },
                x: 800,
                y: -10,
            })
                .to('#nebula', {
                    scrollTrigger: {
                        trigger: 'body',
                        start: "180px",
                        scrub: true,
                        end: "+=300",
                    },
                    rotation: '-.4',
                })
        }
    }, [])
    return (
        <section className='main section'>
            <div className="clouds"></div>
            <div id="nebula"></div>
            <Comets />
            <div className="header">
                <div className="header-text"></div>
                <div className="header-rocket"></div>
            </div>
            <div className="description mx-auto text-xl 2xl:text-2xl ">
                <h2 className='text text-right text-yellow mb-4 z-40'>
                    {shop === 'dixy' ? 'с 22 ноября до 19 декабря' : 'с 10 декабря до 7 января'}
                </h2>
                <h3 className='text text-left text-yellow z-40'>
                    собери полную коллекцию Героев
                </h3>
            </div>
            <div className="planet-container" >
                <Planet />
            </div>
        </section>
    )
}
