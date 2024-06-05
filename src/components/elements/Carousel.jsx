import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import m1 from '../../assets/img/mechanics/1.png'
import m2 from '../../assets/img/mechanics/2.png'
import m2_1 from '../../assets/img/mechanics/2_1.png'
import m4 from '../../assets/img/mechanics/4.png'
import m5 from '../../assets/img/mechanics/5.png'

import SwiperCore, {
    Pagination
} from 'swiper';
SwiperCore.use([Pagination]);



export default function Carousel({ data, marked }) {
    let mechanic;
    // useEffect(() => {
    switch (data[0].mechanic_counts) {
        case `1 товар=1 треснутый`:
            mechanic = m1
            break;
        case `1 товар=2 треснутых`:
            mechanic = m2
            break;
        case `2 товара=1 треснутый`:
            mechanic = m2_1
            break;
        case `4 товара=1 треснутый`:
            mechanic = m4
            break;
        case `1 товар=1 игрушка`:
            mechanic = m1
            break;
        case `1 товар=2 игрушки`:
            mechanic = m2
            break;
        case `2 товара=1 игрушка`:
            mechanic = m2_1
            break;
        case `4 товара=1 игрушка`:
            mechanic = m4
            break;
        case `без игрушки`:
            mechanic = m5
            break;
        default:
            mechanic = m1
    }
    // }, [])

    return (
        <div className='sponsors__item mb-8 relative' >
            <div className="absolute z-30 right-0 top-0" style={{ maxWidth: '35%' }}>
                <img src={mechanic} alt="" />
            </div>
            <Swiper
                spaceBetween={10}

                pagination={{
                    "dynamicBullets": true
                }} className="mySwiper ">
                {data.map(
                    (item, id) => (
                        <SwiperSlide key={id}>
                            <div className='sponsors__item-cover w-full '>
                                <img src={item.img && item.img} alt={item.name} />
                            </div>

                            <p className='sponsors__item-name md:text-m xl:text-l text-s'>
                                {item.name}<br />
                                {marked && id === 0 ? 'В АССОРТИМЕНТЕ' : ''}
                            </p>
                        </SwiperSlide>
                    )
                )}

            </Swiper>

        </div>

    )
}
