import React from "react";
import { useState } from "react";
import Slider from "react-slick";



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




export default function Winners({ winners }) {

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesPerRow: 3,
    rows: 7,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 980,
        settings: {
          slidesPerRow: 2,
          rows: 10
        }
      },
      {
        breakpoint: 780,
        settings: {
          slidesPerRow: 1,
          rows: 14
        }
      }
    ]
  };
  let [mass, setMass] = useState(winners['draw'])
  const [tab, setTab] = useState(0)
  const setNextTab = (tab, data) => {
    setTab(tab)
    setMass(winners[data])
  }
  return (
    <section className="winners pt-16 pb-32" id='winners'>
      <div className="container mx-auto relative">
        <h2 className="text-yellow text-center text-3xl xl:text-4xl 2xl:text-5xl">
          Победители
        </h2>
        <div className="mt-20 winners-content">
          <div className="winners-content-inner  mx-auto">
            <div className="tabs flex justify-center relative z-50 gap-8 text-violet font-bold pt-8 text-xl">
              <div className={tab === 0 ? "active tab underline cursor-default" : "tab cursor-pointer hover:underline"} onClick={() => setNextTab(0, 'draw')}>
                Игра
              </div>
              {winners.mainDraw && winners.mainDraw.length?
                <div className={tab === 1 ? "active tab underline cursor-default" : "tab cursor-pointer hover:underline "}
                  onClick={() => setNextTab(1, 'mainDraw')}>
                  Главный розыгрыш
                </div> : null}
            </div>
            <Slider {...settings} className='relative z-50 pt-16 px-16 pb-32'>
              {mass.map(
                (item, id) =>
                (
                  <p key={id} className='text text-black'>{item.name} <span className="text-bold">{item.phone}</span></p>
                )
              )}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  )
}