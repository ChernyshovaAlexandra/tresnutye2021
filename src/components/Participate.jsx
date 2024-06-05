import gsap from "gsap/all";
import { TimelineMax } from "gsap/gsap-core";
import ScrollTrigger from "gsap/ScrollTrigger";
import React, { useEffect } from "react";
import arr from '../assets/img/btn-arr.png'
import Prizes from "./Prizes";

export default function Participate({ setForm }) {
    let wh = window.innerWidth
    useEffect(() => {
        var tl = new TimelineMax();
        gsap.registerPlugin(ScrollTrigger);
        if (wh > 980) {
            tl.from('.block-1', {
                scrollTrigger: {
                    trigger: '.mystery-content',
                    start: "200px",
                    scrub: true,
                    end: "+=300",
                },
                x: -1000,
            })
                .from('.block-2', {
                    scrollTrigger: {
                        trigger: '.mystery-content',
                        start: "200px",
                        scrub: true,
                        end: "+=300",
                    },
                    x: 1000,
                })
        }
    }, [])
    return (
        <section className='section participate pt-20' id="draw">
            <div className="container mx-auto">
                <h2 className="text-yellow text-center text-3xl xl:text-4xl 2xl:text-5xl mb-8">
                    Как принять участие<br />в розыгрыше?
                </h2>
                <div className="uslovia  flex flex-col my-16 mx-auto">
                    <div className="block block-1 text-white golos font-normal text">
                        <p>Собери 26 Треснутых в специальной коробке</p>
                    </div>
                    <div className="block block-2 text-white golos font-normal text self-end">
                        <div className="content">
                            <p>Заполни форму на сайте и выложи фото полной коллекции игрушек с коробкой в личном кабинете</p>
                            <button className="btn grid mt-4 py-3 px-3"
                                onClick={setForm}
                            >Заполнить форму участника <img src={arr} className='ml-2' /></button>
                        </div>
                    </div>
                    <div className="block block-1 text-white golos font-normal text">
                        <div id="scene2">
                            <div data-depth="0.4" className="alien"></div>
                        </div>
                        <p>Смотри прямой эфир с розыгрышем призов 25 декабря в социальных сетях Дикси</p>
                    </div>
                </div>
                <div className="add-block mt-8 mx-auto">
                    <div className="block">
                        <div className="bg-white p-8">
                            <div className="content flex">
                                <h4 className='text-violet text-xl xl:text-2xl 2xl:text-3xl'> участвуй в розыгрыше призов в наших соцсетях</h4>
                                <div className="flex social">
                                    <a className="social-icon btn" href='https://vk.com/dixyclub' target="_blank">
                                        <svg viewBox="0 0 41 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g filter="url(#vk-filter)">
                                                <path d="M38.6673 19.6061C38.5629 19.4318 37.9568 18.038 34.9893 15.185C31.8965 12.1796 32.3144 12.6805 36.0342 7.49718C38.3121 4.33928 39.2107 2.40098 38.939 1.59518C38.6673 0.811146 36.9955 1.00715 36.9955 1.00715L31.4367 1.05071C31.4367 1.05071 31.0188 0.985374 30.7262 1.18138C30.4336 1.37739 30.2455 1.81296 30.2455 1.81296C30.2455 1.81296 29.3678 4.25216 28.1976 6.34291C25.7107 10.7204 24.7285 10.96 24.3315 10.6769C23.3911 10.0453 23.6209 8.12875 23.6209 6.7567C23.6209 2.50988 24.2479 0.74581 22.4089 0.266681C21.8028 0.11423 21.364 0.00533739 19.8176 0.00533739C17.8323 -0.0164412 16.1604 0.00533742 15.1991 0.506245C14.5722 0.832924 14.0707 1.55162 14.3841 1.59518C14.7603 1.63873 15.5753 1.83474 16.0351 2.46632C16.5993 3.27213 16.5784 5.10153 16.5784 5.10153C16.5784 5.10153 16.9128 10.1106 15.8052 10.7204C15.0529 11.156 14.0289 10.2848 11.8137 6.29935C10.6852 4.25216 9.82842 2.00897 9.82842 2.00897C9.82842 2.00897 9.66124 1.59517 9.36867 1.35561C9.01341 1.07249 8.51186 1.00715 8.51186 1.00715L3.20383 0.985374C3.20383 0.985374 2.40971 1.00715 2.11714 1.37739C1.86637 1.70407 2.09625 2.35743 2.09625 2.35743C2.09625 2.35743 6.234 12.4627 10.9151 17.5371C15.22 22.1977 20.0892 21.8928 20.0892 21.8928H22.3044C22.3044 21.8928 22.9731 21.8057 23.3075 21.4355C23.6209 21.087 23.6 20.4337 23.6 20.4337C23.6 20.4337 23.5583 17.3411 24.9375 16.8838C26.2959 16.4264 28.0304 19.8674 29.8903 21.1959C31.2904 22.1977 32.3562 21.9799 32.3562 21.9799L37.309 21.9146C37.309 21.8928 39.9003 21.7404 38.6673 19.6061Z" fill="white" />
                                            </g>
                                            <defs>
                                                <filter id="vk-filter" x="0" y="-6.10352e-05" width="41" height="26" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                                    <feOffset dy="2" />
                                                    <feGaussianBlur stdDeviation="1" />
                                                    <feComposite in2="hardAlpha" operator="out" />
                                                    <feColorMatrix type="matrix" values="0 0 0 0 0.505882 0 0 0 0 0.211765 0 0 0 0 0 0 0 0 0.15 0" />
                                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_14:3998" />
                                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_14:3998" result="shape" />
                                                </filter>
                                            </defs>
                                        </svg>

                                    </a>
                                    <a className="social-icon btn" href='https://www.instagram.com/dixy.channel/' target="_blank">
                                        <svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g filter="url(#insta-filter)">
                                                <path d="M23.8735 -6.10352e-05H10.1265C5.64963 -6.10352e-05 2 3.64957 2 8.12646V21.8734C2 26.3503 5.64963 29.9999 10.1265 29.9999H23.8735C28.3504 29.9999 32 26.3503 32 21.8734V8.12646C32 3.64957 28.3504 -6.10352e-05 23.8735 -6.10352e-05ZM17.0122 20.9975C13.7032 20.9975 11.0268 18.2968 11.0268 15.0121C11.0268 11.7274 13.7275 9.0267 17.0122 9.0267C20.2968 9.0267 22.9976 11.7274 22.9976 15.0121C22.9976 18.2968 20.3212 20.9975 17.0122 20.9975ZM25.6983 7.66417C24.7007 7.66417 23.8978 6.86125 23.8978 5.86369C23.8978 4.86612 24.7007 4.0632 25.6983 4.0632C26.6959 4.0632 27.4988 4.86612 27.4988 5.86369C27.4988 6.86125 26.6959 7.66417 25.6983 7.66417Z" fill="white" />
                                            </g>
                                            <defs>
                                                <filter id="insta-filter" x="0" y="-6.10352e-05" width="34" height="34" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                                    <feOffset dy="2" />
                                                    <feGaussianBlur stdDeviation="1" />
                                                    <feComposite in2="hardAlpha" operator="out" />
                                                    <feColorMatrix type="matrix" values="0 0 0 0 0.505882 0 0 0 0 0.211765 0 0 0 0 0 0 0 0 0.15 0" />
                                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_14:3992" />
                                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_14:3992" result="shape" />
                                                </filter>
                                            </defs>
                                        </svg>

                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Prizes />
        </section>
    )
}
