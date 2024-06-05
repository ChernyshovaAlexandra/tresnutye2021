import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import productsAPI from '../utils/productsAPI';
import { Select, FormControl, InputLabel, MenuItem } from "@material-ui/core";
import $ from "jquery";
import Carousel from './elements/Carousel';
import arr from '../assets/img/btn-arr.png'





export default function Sponsors({ full }) {
   
    const [products, setProducts] = useState([]);
    const [userData, setUserData] = useState([]);
    const [filtredData, filterUserData] = useState([])
    const [maxLength, setMaxLength] = useState(20);
    const [regions, setRegions] = useState([]);
    const [region, setRegion] = useState('');
    const [goodsLength, setGoodsLength] = useState(16);
    const [mechanic, setMechanic] = useState([]);
    const [mech, setMech] = useState('Все');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');


    async function fetchProducts() {
        if (full) {
            //console.log(`full`)
            let response = await productsAPI.get("/region-products", {
                params: { project: 'tresnutye' }
            });

            setProducts(response.data.products);
            let mechanic = response.data.filter.mechanic_counts;
            mechanic.unshift('Все');
            setMech('Все');
            setMechanic(mechanic);
            setStart(response.data.start);
            setEnd(response.data.end);

            let data = response.data.products;

            let regionsRecieved = [];
            for (let key in data) {
                regionsRecieved.push(key);
            }
            let userData = data[regionsRecieved[0]] ? data[regionsRecieved[0]] : [];

            setUserData(userData);
            filterUserData(userData)
            setMaxLength(userData.length);
            setRegions(regionsRecieved);
            setRegion(regionsRecieved[0]);

        } else {
            productsAPI.get("/main-page-products", {
                params: { project: 'tresnutye' }
            }).then(
                (res) => {
                    //console.log('res.data', res.data)
                    setUserData(res.data.data)
                    setStart(res.data.start);
                    setEnd(res.data.end);
                }
            )

        }
    }

    useEffect(() => {

        fetchProducts();
    }, [full]);

    function handleChange(e) {
        let regionNew = e.target.value;
        setRegion(regionNew);
        setGoodsLength(16);
        setUserData(products[regionNew])
        if (mech === 'Все') {
            filterUserData(products[regionNew])
            setMaxLength(products[regionNew].length);
        } else {
            let newData = products[regionNew].filter(item =>  item[0].mechanic_counts === mech);
            filterUserData(newData);
            setMaxLength(newData.length);
        }
        //console.log(userData.length)
    }

    const changeMech = (e) => {
        let mechNew = e.target.value
        setMech(mechNew)
        setGoodsLength(16);
        if (e.target.value === 'Все') {
            //console.log('all', userData)
            filterUserData(userData)
            setMaxLength(userData.length);
        } else {
            let newData = userData.filter(item => item[0].mechanic_counts === mechNew);
            filterUserData(newData);
            setMaxLength(newData.length);
        }
    }

    function more() {
        let top = $(".loadMore").offset().top;
        $("html,body").animate({ scrollTop: top }, "slow");
        setGoodsLength(goodsLength => goodsLength + 16);
    };





    return (
        <section className={`sponsors py-20 ${full ? 'pt-36 full' : ''}`} id="sponsors">
            <div className='container mx-auto'>
                <div className="md:flex gap-4 justify-between items-center" id='sponsors'>
                    <h2 className='text-yellow text-left text-3xl xl:text-4xl 2xl:text-5xl mb-8'>
                        товары-спонсоры
                        <br />
                        <small style={{ fontSize: `70%` }}>{`с ${start} до ${end}`}</small>
                    </h2>

                    {full ?
                        <div className='flex flex-col'>
                            <FormControl className='text-white in-full-sponsors mb-4' variant="outlined" style={{ width: `300px` }}>
                                <InputLabel htmlFor="outlined-age-native-simple">
                                    Выберите регион
                                </InputLabel>
                                <Select
                                    labelId="demo-customized-select-label"
                                    id="demo-customized-select"
                                    value={region}
                                    onChange={(e) => handleChange(e)}
                                    label="Выберите регион"
                                    inputProps={{
                                        name: "Выберите регион",
                                        id: "outlined-age-native-simple",
                                    }}
                                >
                                    {regions.map((item, index) => (
                                        <MenuItem value={item} key={index}>
                                            {item}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl className='text-white in-full-sponsors' variant="outlined" style={{ width: `300px` }}>
                                <InputLabel htmlFor="outlined-age-native-simple">
                                    Механика
                                </InputLabel>
                                <Select
                                    labelId="demo-customized-select-label"
                                    id="demo-customized-select"
                                    value={mech}
                                    onChange={(e) => changeMech(e)}
                                    label="Механика"
                                    inputProps={{
                                        name: "Механика",
                                        id: "outlined-age-native-simple",
                                    }}
                                >
                                    {mechanic.map((item, index) => (
                                        <MenuItem value={item} key={index}>
                                            {item}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>


                        : ''}
                </div>

                {full ?
                    <div className='grid md:grid-cols-3 lg:grid-cols-4  grid-cols-2 mt-8 mx-auto sponsors-grid ubuntu'>
                        {filtredData && filtredData.length !== 0 ? filtredData.slice(0, goodsLength).map((item, id) => (
                            <Carousel key={id} data={item} marked={item.length > 1} />
                        )) : null}
                    </div>
                    :
                    <div className='grid md:grid-cols-3 lg:grid-cols-4  grid-cols-2 mt-8 mx-auto sponsors-grid ubuntu'>
                        {userData && userData.length ?
                            userData.slice(0, goodsLength).map((item, id) => (
                                <Carousel key={id} data={item} marked={item.length > 1} />
                            ))

                            : null}
                    </div>
                }
                <div className='grid place-items-center'>
                    {!full ?
                        <Link to="/sponsors" className='btn grid mt-8 py-4 px-8' style={{ width: 'fit-content' }}>
                            <span>Посмотреть все товары </span>
                            <img src={arr} className='ml-2' />
                        </Link>
                        :
                        goodsLength < maxLength ? (
                            <button
                                className='btn grid py-4 px-8 w-fit mx-auto mt-8 loadMore'
                                onClick={(e) => more(e)}>
                                <span>Загрузить еще</span>
                                <img src={arr} alt="" />
                            </button>
                        ) : null
                    }
                </div>
            </div>
        </section>

    );
}
