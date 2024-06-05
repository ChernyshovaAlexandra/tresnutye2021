import React from "react";
import google from '../assets/img/google.png'
import appstore from '../assets/img/appstore.png'
import videoGame from '../assets/video_of_game.mp4'

export default function Application() {
    return (
        <section className='application py-20 relative z-40'>
            <div className="container mx-auto">
                <div className="application-block p-8 mx-auto">
                    <div className="flex">
                        <div className="left-col">
                            <h2 className="text-yellow text-3xl xl:text-4xl 2xl:text-5xl">играй и<br />выигрывай!</h2>
                            <p className='mt-4 text-white text'>Вступай в «Клуб Друзей ДИКСИ» и присоединяйся к игре! </p>
                            <div className="qr mt-8 desktop"></div>
                            <div className="links mob mt-4">
                                <a href="" className='google mr-4'>
                                    <img src={google} alt="" />
                                </a>
                                <a className='appstore' href="">
                                    <img src={appstore} alt="" />
                                </a>
                            </div>
                        </div>
                        <div className="right-col">
                            <div className="phoneframe">
                               <video src={videoGame} loop autoPlay muted playsInline />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
