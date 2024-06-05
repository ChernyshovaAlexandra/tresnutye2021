import React, { useState } from "react";
import InputMask from "react-input-mask";
import API from "../../utils/API";
import arr from '../../assets/img/btn-arr.png'
import Countdown from 'react-countdown';



export default function LoginForm({ setToken, setForm, editUser }) {
    const [timer, setTimer] = useState(false)
    const [code, setCode] = useState('')
    const [phoneNumber, setPhone] = useState()
    const [error, setErrorMessage] = useState()

    const renderer = ({ seconds, completed }) => {
        if (completed) {
            return <Completionist />;
        }

        else {
            return (
                <div className="formCodeAgain" >
                    {timer === 'ended' ?
                        <div className='mt-4 mx-auto text-center'>Код отправлен повторно</div> :
                        <div className='mt-4 mx-auto text-center'>
                            Повторная отправка возможна через{' '}
                            <span className="text-violet">{seconds}</span> сек
                        </div>
                    }
                </div >)


        }
    };
    const Completionist = () => (
        <a className="underline hover:no-underline text-violet  text-center mt-4 mx-auto block"
            onClick={() => stopTimer()}
        >Отправить повторно</a>
    );
    const startTimer = (e) => {
        setTimer(true)

    }
    // Код отправлен повторно
    const stopTimer = () => {
        setTimer('ended')
        getCode()
    }
    const setCorrectCode = e => {
        setErrorMessage(false)
        setCode(e.target.value)
    }
    const getCode = (e) => {
        e && e.preventDefault()
        if (phoneNumber.length < 11) {
          setErrorMessage('Проверьте введённый номер!');
        } else {
          API.post('/login_sms', {
              phone: phoneNumber
          }).then(res => {
              const { success } = res.data
              //console.log(success)
              if (success) {
                  startTimer()
                  // document.getElementById('#user_phone').value = ''
              }
              else if (!success) {
                  res.data.message ? setErrorMessage(res.data.message) : false
              }
          })
              .catch(error => {
                  console.log(error)
                  error.message && setErrorMessage(error.message)
              })
        }
    }
    const login = async () => {
        await API.post('/sms', {
            phone: phoneNumber,
            confirm_code: code
        })
            .then(res => {
                const { success, token, message } = res.data
                if (success) {
                    setToken(token)
                    window.localStorage.setItem('tresnutye2021-token', token)
                }
                else {
                  setErrorMessage(message);
                }
            })
    }
    const setCorrectPhone = (e) => {
        setErrorMessage(false)
        let cur = e.target.value
        cur = cur.replaceAll(/\s/g, '').replaceAll(/[{()}]/g, '').replaceAll('+', '')
        setPhone(cur)
        setCode('')
    }

    return (
        <div>
            <h2 className='text-violet text-center text-3xl mb-8'>
                вход/регистрация </h2>
            <form
                onSubmit={
                    (e) => {
                        e.preventDefault();
                        !code ? getCode(e) : login(e)
                    }
                }
            >
                {error ? <p className="text-xxs text-red text-center mb-4">{error}</p> : ''}
                <InputMask
                    alwaysShowMask={false}
                    className={`w-full ${error ? 'error' : ''}`}
                    placeholder={timer ? 'Введите код' : 'Введите номер телефона'}
                    mask={!timer ? "+7 (999) 999 99 99" : '9999'}
                    required
                    autofill='false'
                    id="user_phone"
                    value={timer ? code : phoneNumber}
                    onChange={(e) => { timer ? setCorrectCode(e) : setCorrectPhone(e) }}
                    maskChar="" />
                {timer & timer !== 'ended' ?
                    <Countdown date={Date.now() + 590000} intervalDelay={1000} precision={.3} renderer={renderer}>
                        <Completionist />
                    </Countdown> : null}
                <button
                    className='btn grid py-4 px-8 w-fit mx-auto mt-8'
                    type='submit'>
                    <span>отправить код</span>
                    <img src={arr} alt="" />
                </button>
            </form>
        </div >
    )
}
