import React, { useEffect, useState } from "react";
import UnitsBlock from "./elements/UnitsBlock";
import FontFaceObserver from 'fontfaceobserver'
import stickers from '../assets/img/stikerpack.png'
import gsap from "gsap/all";
import ScrollTrigger from "gsap/ScrollTrigger";
import { TimelineMax } from "gsap/gsap-core";


export default function Units() {
    var tl = new TimelineMax();
    let wh = window.innerWidth

    gsap.registerPlugin(ScrollTrigger);
    const [font, loadFont] = useState(false)
    useEffect(() => {
        let font = new FontFaceObserver('Junegull');
        let fontB = new FontFaceObserver('Golos');

        font.load().then(function () {
            fontB.load().then(() => {
                loadFont(true)
            })
        });
        if (wh > 980) {
            tl.from('.catalog', {
                scrollTrigger: {
                    trigger: '.units',
                    start: '130px',
                    scrub: true,
                    end: "+=200",
                },
                x: -700
            })
                .from('.text-catalog', {
                    scrollTrigger: {
                        trigger: '.units',
                        start: '150px',
                        scrub: true,
                        end: "+=220",
                    },
                    x: 600
                })
                .from('.stickers', {
                    scrollTrigger: {
                        trigger: '.units',
                        start: '270px',
                        scrub: true,
                        end: "+=290",
                    },
                    x: 700
                })
        }
    }, [])
    return (
        <section className='section units pt-16 -mb-32' id='heroes'>
            <div className="container after mx-auto">
                <h2 className="text-yellow text-center text-3xl xl:text-4xl 2xl:text-5xl mb-8">
                    Герои
                </h2>
                <div className="slider">
                    {font ? <UnitsBlock /> : null}
                    <div className='cover'></div>
                </div>
            </div>
            <div className="container mx-auto mt-16 mb-32">
                <div className="mystery-content">
                    <div className="md:grid flex flex-wrap-reverse md:grid-cols-2">
                        <div className="left catalog"></div>
                        <div className="right">
                            <h2 className="text-yellow text-3xl xl:text-4xl 2xl:text-5xl mb-8 text-catalog">
                                журнал
                            </h2>
                            <div className="mt-4 text text-white text-xl 2xl:text-2xl  text-catalog">
                                <span className="font-black">Собирай полную коллекцию стикеров в журнал,</span> а также играй в игры и узнавай интересные факты о нашей большой Вселенной
                            </div>
                            <div className="mt-4 ">
                                <div className="stickers">
                                    <img src={stickers} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
