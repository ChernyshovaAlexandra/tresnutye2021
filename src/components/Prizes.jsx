import React, { useEffect, useState } from "react";
import i1 from '../assets/img/prizes/1.png'
import i2 from '../assets/img/prizes/2.png'
import i3 from '../assets/img/prizes/3.png'
import i4 from '../assets/img/prizes/4.png'
import i5 from '../assets/img/prizes/5.png'
import i6 from '../assets/img/prizes/6.png'
import Slider from "react-slick";

const prizesMass = [
    {
        name: 'Эксклюзивная коллекционная коробка',
        modal: `В розыгрыше в соцсетях "Инстаграм" и "Вконтакте", в оффлайн розыгрыше и в розыгрыше мобильного приложения "Клуб Друзей Дикси"`,
        img: i1
    },
    {
        name: 'LEGO «Космический шаттл NASA&#160;- Discovery»',
        modal: `В главном розыгрыше и в розыгрыше мобильного приложения "Клуб Друзей Дикси"`,
        img: i2
    },
    {
        name: 'Телефон iPhone&#160;13',
        modal: `В главном розыгрыше`,
        img: i3
    },
    {
        name: 'Планшет iPad mini',
        modal: `В главном розыгрыше и в розыгрыше мобильного приложения "Клуб Друзей Дикси"`,
        img: i4
    },
    {
        name: 'Худи от Славы Марлоу',
        modal: `В розыгрыше в соцсетях "Инстаграм" и "Вконтакте", в главном розыгрыше и в розыгрыше мобильного приложения "Клуб Друзей Дикси"`,
        img: i5
    },
    {
        name: 'LEGO «Saturn V. NASA Apollo»',
        modal: `В розыгрыше в соцсетях "Инстаграм" и "Вконтакте"`,
        img: i6
    }
]

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <button
            className='btn px-5 py-5 slick-btn-next'
            onClick={onClick}
        />
    );
}
function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <button
            className='btn px-5 py-5 slick-btn-prev'
            onClick={onClick}
        />
    );
}


export default function Prizes() {
    const settings = {
        dots: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        lazyLoad: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1351,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 998,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 780,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
        ]

    };

    const [modal, showModal] = useState(undefined)


    const showModalQuick = (id) => {
        showModal(id)
        setTimeout(() => {
            showModal(undefined)
        }, 2500)
    }
  
    return (
        <section className='prizes py-20 mt-20' id='prizes'>
            <div className="container mx-auto">
                <h2 className="text-yellow text-center text-3xl xl:text-4xl 2xl:text-5xl mb-8">
                    Призы
                </h2>
                <div className="mt-16 blocks">
                    <Slider className='pb-28 hidden sm:block' {...settings}>
                        {prizesMass.map(
                            (prize, id) => (
                                <div key={id}>
                                    <div className={`prize-block bg-red grid place-content-center`} key={id}>
                                        <div className="content">
                                            <div className="img-container"><img className='w-full m-0' src={prize.img} alt="" /></div>
                                            <div className="data-container">
                                                <h4 className="text-center text-white font-normal "
                                                    dangerouslySetInnerHTML={{ __html: prize.name }}
                                                />

                                            </div>
                                        </div>
                                        <a className="mt-4 text-yellow text-center block"
                                            onClick={
                                                () => showModalQuick(id)
                                            }
                                        >Как получить?</a>
                                    </div>
                                    {
                                        modal !== undefined && modal === id ?
                                            <div className="modal bg-white rounded-lg p-4">
                                                {prize.modal}
                                            </div> : null
                                    }
                                </div>
                            )
                        )}
                    </Slider>
                    <div className="block sm:hidden flex mobile">
                        {prizesMass.map(
                            (prize, id) => (
                                <div key={id}>
                                    <div className={`prize-block bg-red grid place-content-center prize-${id + 1}`}>
                                        <div className="content">
                                            <div className="img-container"><img className='w-full m-0' src={prize.img} alt="" /></div>
                                            <div className="data-container">
                                                <h4 className="text-center text-white font-normal "
                                                    dangerouslySetInnerHTML={{ __html: prize.name }}
                                                />

                                            </div>
                                        </div>
                                        <a className="mt-4 text-yellow text-center block"
                                            onClick={
                                                () => showModalQuick(id)
                                            }
                                        >Как получить?</a>
                                    </div>
                                    {
                                        modal !== undefined && modal === id ?
                                            <div className="modal bg-white rounded-lg p-4">
                                                {prize.modal}
                                            </div> : null
                                    }
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
