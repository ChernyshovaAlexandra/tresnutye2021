import React, { useEffect, useState } from "react";
import Main from "./components/Main";
import Mechanics from "./components/Mechanics";
import Nav from "./components/Nav";
import Participate from "./components/Participate";
import logo1 from './assets/img/footer/logo1.png';
import logo2 from './assets/img/footer/logo2.png';
import logo3 from './assets/img/footer/logo3.png';
import logo4 from './assets/img/footer/logo4.png';
import logo5 from './assets/img/logo_dixy_gorizont.svg';
import logo6 from './assets/img/logo-megamart.svg';
import violet from './assets/img/violet.png';
import pril1 from './assets/img/05.png';
import pril2 from './assets/img/14.png';
import FormComponent from "./components/FormComponent";
import Units from "./components/Units";

import { Hoc } from "./Hoc";
import { startStars } from "./constants/stars";
import Winners from "./components/Winners";
import API from "./utils/API";
import Serial from "./components/Serial";
import Application from "./components/Application";
import Sponsors from './components/Sponsors';


function IndexPage(props) {

  const { selectShop } = props;
  const { shop } = props.state.store;
  const [showChoice, setShowChoice] = useState(false);
  const [winnersMas, setWinners] = useState(false)
  const [form, setForm] = useState(false)
  const [token, setToken] = useState(window.localStorage.getItem('tresnutye2021-token'))
  const [cartoons, setCartoons] = useState([])

  useEffect(() => {
    console.log('shop', shop);
    //if (!shop) {
      let url = new URL(window.location.href);
      console.log('url', url);
      let shop = url.searchParams.get('shop');
      console.log('shop', shop);
      if (shop === 'dixy' || shop === 'megamart') {
        selectShop(shop);
      }
      setShowChoice(true);
    //}
    let hash = url.hash.slice(1);
    console.log('hash', hash);
    window.onload = function scrollElem() {
      let elem = document.getElementById(hash);
      console.log('elem', elem);
      elem && elem.scrollIntoView();
    };
  }, []);

  useEffect(() => {
    API.get('/raffle/Raffle/winners', { headers: {
      'Authorization': `Bearer ${token}`,
    } }).then(
      res => {
        setWinners(res.data)
      }
    )
  }, [token])

  useEffect(() => {
    API.get('/cartoons', { headers: {
      'Authorization': `Bearer ${token}`,
    } }).then(
      res => {
        if (res.data.data) {
          setCartoons(res.data.data)
        }
      }
    )
  }, [token])

  const [userData, setUserData] = useState(false)

  const loginUser = (token) => {
    API.get('/profile', { headers: {
      'Authorization': `Bearer ${token}`,
    } })
      .then(
        res => {
          if (res.data.data) {
            setUserData(res.data.data)
            /*if (res.data.data.name) {
              editUser(false)
            }*/
          }
        }
      )
  }

  useEffect(() => {
    if (token) {
      loginUser(token)
    }
  }, [token, form])

  const setRForm = () => {
    setForm(true);
    document.querySelector('#root').classList.add('scrolled');
  }

  return (
    <div className="content">
      {shop ?
        <>
          <div className={`content-inner ${shop === 'dixy' ? '' : 'megamart'}`}>
            <div id="particle-container"></div>
            <Nav setForm={setForm} winnersMas={winnersMas.length} shop={shop} selectShop={selectShop} enableChangeShop={props.page === 'sponsors' ? false : true} />
            {props.page === 'main' ?
              <>
                <Main shop={shop} />
                <Mechanics shop={shop} />
                <Units shop={shop} />
                {shop === 'dixy' ? <Participate setForm={setRForm} /> : null}
                {cartoons.length ? <Serial cartoons={cartoons} shop={shop} /> : ''}
                {shop === 'dixy' ? <Application /> : null}
              </>
              : <></>}
            {/* {shop === 'dixy' ?
              <>
                <Sponsors full={props.page === 'sponsors' ? true : false} />
                {props.page === 'main' && winnersMas && winnersMas.draw.length ? <Winners winners={winnersMas} /> : null}
              </>
            : null} */}
          </div>
          {shop === 'dixy' && form ?
            <FormComponent
              userData={userData}
              setForm={setForm}
              setToken={setToken}
              setUserData={setUserData}
              token={token}
              form={form} />
            : <></>}
          <footer className='bg-violet py-8'>
            <div className="container mx-auto">
              {shop === 'dixy' ?
                <p className='text text-white '>Соверши покупку в любом магазине «ДИКСИ» на сумму от 600 руб.* либо купи товары-спонсоры**, участвующие в акции, и получи на кассе игрушку  в подарок. Общий срок проведения акции: 22.11.2021 - 19.12.2021; *600 руб. без учета табачной продукции (табака, табачных изделий и курительных принадлежностей, в том числе трубок, кальянов, сигаретной бумаги, зажигалок, никотинсодержащей продукции и устройств для ее потребления) и алкогольной продукции. Сумма покупки рассчитывается после применения всех скидок.</p>
              :
                <p className='text text-white '>Соверши покупку в любом магазине «Мегамарт» на сумму от 1000 руб.* и получи на кассе игрушку  в подарок. Общий срок проведения акции: 10.12.2021 - 19.12.2021; *1000 руб. без учета табачной продукции (табака, табачных изделий и курительных принадлежностей, в том числе трубок, кальянов, сигаретной бумаги, зажигалок, никотинсодержащей продукции и устройств для ее потребления) и алкогольной продукции. Сумма покупки рассчитывается после применения всех скидок.</p>
              }
              {shop === 'dixy' ?
                <p className='text text-white mt-4'>** Полный список товаров-спонсоров и условия (количество) их приобретения размещен на сайте tresnutye2.dixy.ru. Список товаров-спонсоров может меняться в течение всего срока проведения акции. Организатор акции оставляет за собой право изменить срок и условия акции. В период проведения акции не гарантируется наличие игрушек в каждом магазине. В случае, если запас игрушек в месте его продажи подошел к концу, акция в отношении данного товара прекращается досрочно. Акционные товары могут отличаться по внешнему виду и техническим характеристикам от изображений в рекламе. Подробности проведения акции, информацию об организаторе акции, правила ее проведения, сроки, адреса, порядок получения игрушек можете узнать на сайте tresnutye2.dixy.ru Количество игрушек ограничено.</p>
              :
                <p className='text text-white mt-4'>Организатор акции оставляет за собой право изменить срок и условия акции. В период проведения акции не гарантируется наличие игрушек в каждом магазине. В случае, если запас игрушек в месте его продажи подошел к концу, акция в отношении данного товара прекращается досрочно. Подробности проведения акции, информацию об организаторе акции, правила ее проведения, сроки, адреса, порядок получения игрушек можете узнать на сайте tresnutye2.dixy.ru Количество игрушек ограничено.</p>
              }
              <div className="flex mt-8 gap-8 items-center justify-center">
                {shop === 'dixy' ?
                  <div>
                    <img src={logo1} alt="" />
                  </div>: null}
                  <div>
                    <img src={shop === 'dixy' ? logo2 : logo4} alt="" />
                  </div>
                <div>
                  <img src={logo3} alt="" />
                </div>
              </div>
            </div>
          </footer>
        </>
      :
        <div className='modalBox'>
          {showChoice ?
            <div className='modalBox__container shop'>
              <img src={violet} alt='' className='violet absolute z-30 -top-40 -right-10' />
              <img src={pril1} alt='' className='pril1 absolute -left-40 -top-44' />
              <img src={pril2} alt='' className='pril2 absolute -right-40 -bottom-28' />
              <div className="modalBox__container__content">
                <h2 className='text-violet text-5xl my-10 mx-5'>
                  Выберите магазин:
                </h2>
                <div className="flex justify-center items-center gap-20 p-8">
                  <div className="cursor-pointer" onClick={() => selectShop('dixy')}>
                    <img src={logo5} alt='Дикси' />
                  </div>
                  <div className="cursor-pointer" onClick={() => selectShop('megamart')}>
                    <img src={logo6} alt='Мегамарт' />
                  </div>
                </div>
              </div>
            </div>
          : null }
        </div>
      }
    </div>
  );

}

export default Hoc(IndexPage);
