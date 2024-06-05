import Parallax from 'parallax-js'
import React, { useEffect } from "react";
import pack from '../assets/img/pack-tresnutye.png'
import egg from '../assets/img/mech-egg.png'
import alien from '../assets/img/mech-alien.png'
import arr from '../assets/img/btn-arr.png'
import card from '../assets/img/mech-planetCard.png'
import { TimelineMax } from "gsap/gsap-core";
import gsap from 'gsap/all';
import ScrollTrigger from "gsap/ScrollTrigger";



export default function Mechanics({ shop }) {
    let wh = window.innerWidth
    useEffect(() => {
        let scene2 = document.getElementById('scene2');
        let scene3 = document.getElementById('scene3');
        new Parallax(scene2);
        new Parallax(scene3);

        var tl = new TimelineMax();

        gsap.registerPlugin(ScrollTrigger);
       if(wh > 980){
        tl.from('.uslovia-bl-1', {
            scrollTrigger: {
                trigger: '.main',
                start: "150px",
                scrub: true,
                end: "+=300",
            },
            x: -1000,
            y: -10,
        })
            .from('.uslovia-bl-2', {
                scrollTrigger: {
                    trigger: '.main',
                    start: "150px",
                    scrub: true,
                    end: "+=300",
                },
                x: 1000,
                y: -10,
            }
            )
            .from('.pack', {
                scrollTrigger: {
                    trigger: '.mechanics',
                    start: "30px",
                    scrub: true,
                    end: "+=80",
                },
                x: -500
            })
            .from('.tresnutyi',{
                scrollTrigger:{
                    trigger: '.mechanics',
                    start: "40px",
                    scrub: true,
                    end: "+=90",
                },
                x: -800
            })
            .from('.toy',{
                scrollTrigger:{
                    trigger: '.mechanics',
                    start: "50px",
                    scrub: true,
                    end: "+=100",
                },
                x: -1100
            })
            .from('.sticker',{
                scrollTrigger:{
                    trigger: '.mechanics',
                    start: "60px",
                    scrub: true,
                    end: "+=110",
                },
                x: -1400
            })
       }
    }, [])
    return (
        <section className='mechanics section pt-20 py-32' id='mechanics'>

            <div className="container mx-auto">
                <h2 className="text-yellow text-center text-3xl xl:text-4xl 2xl:text-5xl">
                    Условия акции
                </h2>
                <div className="uslovia mt-16 mx-auto">
                    <div className="uslovia-bl-1 block p-8 mb-8 pr-32 text-white golos font-normal text font-medium">
                        <div id="scene2">
                            <div data-depth="0.4" className="alien"></div>
                        </div>
                        {shop === 'dixy' ?
                            <p>Соверши покупку в Дикси на 600 рублей либо купи товары-спонсоры</p>
                        :
                            <p>Соверши покупку в Мегамарт на 1000 рублей</p>
                        }
                    </div>
                    <div className="uslovia-bl-2 block p-8 pr-40 text-white golos font-normal text  font-medium">
                        <div id="scene3">
                            <div data-depth=".1" className="alien"></div>
                        </div>
                        <p>Получи игрушку Треснутого на кассе магазина</p>
                    </div>
                    <a className="btn grid mt-4 py-4 px-3" href={shop === 'dixy' ? "https://dixy.ru/uploads/rules_Tresnutye_2.pdf" : "https://dixy.ru/uploads/rules_tresnutye_2_megamart.pdf"} target="_blank" style={{ maxWidth: '40%' }}>Полные правила акции <img src={arr} className='ml-2' /></a>
                </div>
            </div>
            <div className="inside-content mt-36">
                <div className="container mx-auto">
                    <h2 className="text-yellow text-center text-3xl xl:text-4xl 2xl:text-5xl">
                        что внутри?
                    </h2>
                    <div className="grid mt-6 place-items-center inside">
                        <div className='pack'>
                            <img src={pack} alt="" />
                        </div>
                        <div>=</div>
                        <div className='tresnutyi'>
                            <img src={egg} alt="" />
                            <h4 className='text-center text-white mt-32'>треснутый</h4>
                        </div>
                        <div>+</div>
                        <div className='toy'>
                            <img src={alien} alt="" />
                            <h4 className='text-center text-white mt-32'>прилипала</h4>
                        </div>
                        <div>+</div>
                        <div className='sticker'>
                            <img src={card} alt='' />
                            <h4 className='text-center text-white mt-32'>стикер</h4>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}
