import React from 'react';
//import arr from '../../assets/img/btn-arr.png'
//import Fancybox from './Fancybox';


export default function MainPlayer({ video, setVideo }) {
    const clearvideo = () => {
        setVideo(false)
        //window.location.search = ''
    }
    return (
        <div className="modalBox flex-col video-container absolute" >
            <div className="close-btn__container cursor-pointer" onClick={clearvideo}>
                <div className="close-btn">
                    <span></span>
                    <span></span>
                </div>
            </div>
            <video controls className='w-full mx-auto'>
                <source src={video} />
            </video>
        </div>)
}
