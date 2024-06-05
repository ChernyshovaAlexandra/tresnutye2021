import React from 'react';
import arr from '../../assets/img/btn-arr.png'

import Slider from "react-slick";
import poster from "../../assets/img/video-poster.jpeg";
import Fancybox from "../elements/Fancybox";



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
export default function UserAccount({exit, userData, editUser, photos }) {

  //console.log('photos', photos);

  const settings = {
    dots: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    lazyLoad: true,
    infinite: false,
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
      }
    ]

  };


  return (
    <div>
      <header>
        <div className="row justify-content-center">
          <div className="col-lg-auto">
            <h2 className='text-violet text-5xl mb-8'>
              Личный кабинет
            </h2>
            <div className="sm:flex sm:gap-4 sm:justify-between">
              <div className="left text text-violet">
                <p className='font-black mb-4'>Привет, {userData.first_name}!</p>
                <p>
                  Для участия в розыгрыше:</p>
                <ol>
                  <li>1. Собери 26 треснутых + коробка</li>
                  <li>2. Загрузи фото коробки со всеми яйцами на сайт</li>
                  <li>3. Смотри прямой эфир с розыгрышем 25 декабря</li>
                </ol>
                <p className='mt-4'>Напоминаем о необходимости указывать реальные данные</p>
              </div>
              <div className="right">
                <button className='btn grid mt-8 py-4 px-8 w-full' onClick={() => editUser(true)}>
                  <span>Редактировать</span>
                  <img src={arr} alt="" />
                </button>
                <button className='btn grid mt-8 py-4 px-8 w-full' type='submit'
                  onClick={exit}
                >
                  <span>Выход</span>
                  <img src={arr} alt="" />
                </button>
              </div>
            </div>
            <div className="mx-auto">
              <Slider className='mt-16 acc-slider' {...settings}>
                {photos.map(
                  (item, id) =>
                  (
                    <div className="box-container px-4 mr-3" key={id}>
                      <Fancybox>
                        <button
                          data-fancybox="gallery2"
                          data-src={item.url}
                          className="box"
                        >
                          <div className="box-img-container">
                            <img src={item.url} className='' alt="" />
                          </div>
                          <p className='mt-2 text-violet text-left'>{item.status}</p>
                        </button>
                      </Fancybox>
                    </div>)
                )}

              </Slider>
            </div>
          </div>
        </div>

      </header>
    </div>
  )
}
