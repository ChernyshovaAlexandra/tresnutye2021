import React, { useEffect } from "react";
import Slider from "react-slick";
import poster from "../assets/img/video-poster.jpeg";
import poster2 from "../assets/img/video-poster-2.jpg";
import Fancybox from "./elements/Fancybox";


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


export default function Serial({ cartoons, shop }) {
    const settings = {
        dots: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        lazyLoad: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,

        responsive: [
            {
                breakpoint: 1351,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 998,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            }
        ]

    };
    //console.log('cartoons', cartoons);
    return (
        <section className={`serial py-16 ${shop === 'dixy' ? '' : 'mega'}`}>
            <div className="container mx-auto">
                <h2 className="text-yellow text-center text-3xl xl:text-4xl 2xl:text-5xl">
                    мультсериал
                </h2>
                <Slider className='mt-16 pb-28 ' {...settings}>
                    {cartoons.map(
                        (item, id) =>
                        (
                            <div className="box-container px-4" key={id}>
                                <Fancybox>
                                    {item.link ?
                                        <button
                                            data-fancybox="gallery"
                                            data-src={item.link}
                                            className="box"
                                        >
                                            <div className="box-img-container rounded-3xl">
                                                <img src={poster} className=' box-image' alt="" />
                                            </div>
                                            <p className='mt-2 text-white '>{item.name}</p>
                                        </button>
                                    :
                                        <>
                                            <div className="box-img-container rounded-3xl">
                                                <img src={poster2} className=' box-image' alt="" />
                                            </div>
                                            <p className='mt-2 text-white text-center'>{item.name}</p>
                                            <p className='mt-2 text-white text-center'>{item.date}</p>
                                        </>
                                    }
                                </Fancybox>
                            </div>)
                    )}

                </Slider>
            </div>
        </section>
    )
}
