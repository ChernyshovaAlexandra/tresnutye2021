import React, { useEffect, useState } from "react";
import QrReader from "react-qr-reader";
import API from "../../utils/API";
import HandleForm from "./HandleForm";
import SystemMessage from "./SystemMessage";


export default function Scaner({ openScaner, setForm, setScanerForm, scanerForm }) {
    const [result, setResult] = useState('No result');
    const [message, showMessage] = useState(false);
    const [token, setToken] = useState(window.localStorage.getItem("userToken"));
    const [isScannerWork, setScanerWork] = useState(true)
    const [name, setName] = useState(null)

    const closeAll = () => {
        openScaner(false);
        setScanerForm(false);
        setForm(false);
        document.querySelector("#root").classList.remove("scrolled");
    };


    const scan = async (data) => {
        if (data) {
            setResult(data)
            setScanerWork(false)

            const fn = data.slice(data.indexOf("fn=") + 3, data.indexOf("&i="));
            const fp = data.slice(data.indexOf("fp=") + 3, data.indexOf("&n="));
            const doc_number = data.slice(
                data.indexOf("&i=") + 3,
                data.indexOf("&fp=")
            );
            const date = data.slice(data.indexOf("t=") + 2, data.indexOf("&s="));


            await API.post("/checks", {
                date,
                fn,
                fp,
                doc_number,
            }, { headers: { "Authorization": `Bearer ${token}` } })
                .then(
                    (response) => {
                        if (response.data.success) {
                            showMessage(response.data.message)
                            setName(`Чек принят`)
                        }
                        else {
                            showMessage(response.data.message)
                            setName(`Чек не принят`)
                        }
                    },
                    (error) => {
                        showMessage("Qr-код, который вы сканируете, не прошел валидацию")
                        setName(`Чек не принят`)
                    }
                );
        }
    };
    const handleScan = () => {
        setScanerForm(true);
    };
    const handleClick = () => {
        openScaner(false);
        document.querySelector('#root').classList.remove('scrolled');

    };
    return (
        <div className="container-fluid">
            <div className="scaner__box">
                {scanerForm ? (
                    <HandleForm
                        setForm={setForm}
                        setScanerForm={setScanerForm}
                        openScaner={openScaner}
                    />
                ) : (
                    <>
                        {!message ? (
                            <>
                                <header>
                                    <div className="container">
                                        <div className="row justify-content-center">
                                            <div className="col-lg-auto ">
                                                <h3>Сканер штрихкодов</h3>
                                            </div>
                                        </div>
                                    </div>
                                </header>
                                <div className="close-btn__container cursor-pointer">
                                    <div
                                        className="close-btn"
                                        onClick={() => handleClick()}
                                    >
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                                {isScannerWork && (
                                    <QrReader
                                        delay={300}
                                        onScan={scan}
                                    />
                                )}
                                <button className='btn mb-8 absol' onClick={() => handleScan()}>
                                    <div className='bg'></div>
                                    <span >ввести вручную</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <div className="handleScanContainer flex flex-col">
                                    <div className="close-btn__container cursor-pointer">
                                        <div
                                            className="close-btn"
                                            onClick={() => handleClick()}
                                        >
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                    <SystemMessage
                                        data={{
                                            message: name,
                                            description: message,
                                        }}
                                    />
                                    <button className='btn mb-8 mt-8 mx-auto' onClick={() => closeAll()}>
                                        <div className='bg'></div>
                                        <span>понятно</span>
                                    </button>
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>

    )
}
