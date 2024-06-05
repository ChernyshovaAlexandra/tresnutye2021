import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import logo from '../assets/img/logo.svg'
import logo2 from '../assets/img/logo-mob.png'
import logoMeg from '../assets/img/logo-megamart.svg'
import lk from '../assets/img/lk.svg';
import arrowUp from '../assets/img/arrow-up.svg';
import arrowDown from '../assets/img/arrow-down.svg';




export default function Nav({ setForm, winnersMas, shop, selectShop, enableChangeShop }) {

    const [menu, showMenu] = useState(false)
    const [changeShop, setChangeShop] = useState(false);

    const openScanerHandle = () => {
        document.querySelector('#root').classList.add('scrolled');
        setForm(true);
    };

    const toNewShop = () => {
      if (shop === 'dixy') {
        selectShop('megamart');
      } else {
        selectShop('dixy');
      }
      setChangeShop(false);
    };


    return (
        <nav className='fixed w-full left-0 top-0 py-4'>
            <div className='container mx-auto flex justify-between'>
                  {enableChangeShop ?
                      <div className='flex items-center' onClick={() => setChangeShop(!changeShop)}>
                          <div className={`logo ${shop === 'dixy' ? '' : 'm'}`}>
                              <img
                                  className='lg:block hidden'
                                  src={shop === 'dixy' ? logo : logoMeg}
                                  alt=""
                              />
                              <img
                                  className='lg:hidden relative z-50'
                                  src={shop === 'dixy' ? logo : logoMeg}
                                  alt=""
                              />
                          </div>
                          <div className='arrow'>
                              <img src={changeShop ? arrowUp : arrowDown} alt='' />
                          </div>
                      </div>
                  :
                      <Link to='/' replace className='logo'>
                          <img className='lg:block hidden' src={logo} alt="" />
                          <img className='lg:hidden relative z-50' src={logo} alt="" />
                      </Link>
                  }
                <ul className="menu items-center text-yellow lg:flex hidden lg:text-sm xl:text-lg 2xl:text-xl px-8 ">
                    <li className='transition duration-300 ease-in-out text-center'>
                        <a className='py-2'
                            href={`${enableChangeShop ? '' : '/?shop=dixy'}#mechanics`}>
                            Условия акции
                        </a>
                    </li>
                    <li className='transition duration-300 ease-in-out text-center'>
                        <a className='py-2'
                            href={`${enableChangeShop ? '' : '/?shop=dixy'}#heroes`}>
                            Герои
                        </a>
                    </li>
                    {shop === 'dixy' ?
                    <>
                      <li className='transition duration-300 ease-in-out text-center'>
                          <a className='py-2'
                              href={`${enableChangeShop ? '' : '/?shop=dixy'}#draw`}>
                              Розыгрыш
                          </a>
                      </li>
                      <li className='transition duration-300 ease-in-out text-center'>
                          <a className='py-2'
                              href={`${enableChangeShop ? '' : '/?shop=dixy'}#prizes`}>
                              Призы
                          </a>
                      </li>
                      {winnersMas ? <li className='transition duration-300 ease-in-out text-center'>
                          <a className='py-2'
                              href={`${enableChangeShop ? '' : '/?shop=dixy'}#winners`}>
                              Победители
                          </a>
                      </li> : null}
                      {/* <li className='transition duration-300 ease-in-out text-center'>
                          <Link className='py-2' to="/sponsors" replace>Товары-спонсоры</Link>
                      </li> */}

                      <li className='transition duration-300 ease-in-out account mx-5' onClick={openScanerHandle}>
                          <img src={lk} alt="" />
                      </li>
                    </> : null}
                </ul>
                <ul className="lg:hidden flex items-center gap-7 pr-4">
                    <div className={`${menu ? 'cancel' : ''} burger relative z-50`} onClick={() => showMenu(!menu)}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    {
                        menu &&
                        <div className="burger-menu absolute z-40 w-full h-screen top-0 left-0 text-2xl">
                            <ul className="text-yellow text-white h-full flex-col flex justify-center gap-8 px-8 text-center">
                                <li className='transition duration-300 ease-in-out' onClick={() => showMenu(!menu)}>
                                    <a href={`${enableChangeShop ? '' : '/?shop=dixy'}#mechanics`}>Условия акции</a>
                                </li>
                                <li className='transition duration-300 ease-in-out' onClick={() => showMenu(!menu)}>
                                    <a href={`${enableChangeShop ? '' : '/?shop=dixy'}#heroes`}>Герои</a>
                                </li>
                                {shop === 'dixy' ?
                                <>
                                    <li className='transition duration-300 ease-in-out' onClick={() => showMenu(!menu)}>
                                        <a href={`${enableChangeShop ? '' : '/?shop=dixy'}#draw`}>Розыгрыш</a>
                                    </li>
                                    <li className='transition duration-300 ease-in-out' onClick={() => showMenu(!menu)}>
                                        <a href={`${enableChangeShop ? '' : '/?shop=dixy'}#prizes`}>Призы</a>
                                    </li>
                                    {winnersMas ? <li className='transition duration-300 ease-in-out' onClick={() => showMenu(!menu)}>
                                        <a href={`${enableChangeShop ? '' : '/?shop=dixy'}#winners`}>Победители</a>
                                    </li> : null}
                                    {/* <li className='transition duration-300 ease-in-out' onClick={() => showMenu(!menu)}>
                                        <Link to="/sponsors" replace>Товары-спонсоры</Link>
                                    </li> */}
                                    <li className='transition duration-300 ease-in-out account flex justify-center' onClick={() => {openScanerHandle(); showMenu(!menu)}}>
                                        <img className='mr-3' src={lk} alt="" /> Личный кабинет
                                    </li>
                                </> : null}
                            </ul>
                        </div>
                    }
                </ul>
            </div>
            {changeShop ?
                <div className='container flex mx-auto my-2 change-shop' onClick={toNewShop}>
                    <div className='new-shop'>
                        <div className={`logo ${shop === 'dixy' ? 'm' : ''}`}>
                            <img
                                className='lg:block hidden'
                                src={shop === 'dixy' ? logoMeg : logo}
                                alt=""
                            />
                            <img
                                className='lg:hidden relative z-50'
                                src={shop === 'dixy' ? logoMeg : logo}
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            : null
            }
        </nav>
    )
}
