import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { REGION_LIST } from '../Map/REGION_LIST.js'
//import Select from "react-select";
import { useForm, Controller } from 'react-hook-form'
import arr from '../../assets/img/btn-arr.png'
import API from "../../utils/API.js";
import axios from "axios";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { parse, isDate } from "date-fns";

function parseDateString(value, originalValue) {
    if (originalValue) {
        const parsedDate = isDate(originalValue)
            ? originalValue
            : parse(originalValue, "yyyy-MM-dd", new Date());

        return parsedDate;
    }
}



const schema = yup.object().shape({
    file: yup.mixed()
        /*.test('required', "Загрузите фото коробки с яйцами", (value) => {
            return value && value.length
        })*/
        .test("fileSize", "Слишком большой файл", (value, context) => {
          if (value && value[0]) {
              return value[0].size <= 5000000;
            } else return true;
        })
        .test("type", "Поддерживаемый тип файла: .jpg", function (value) {
          if (value && value[0]) {
            return value[0].type === "image/jpeg";
          } else return true;
        }),
    first_name: yup.string()
        .required('Обязательно')
        .min(3, 'Минимум 3 символа')
        .max(30, 'Максимум 30 символов')
        .matches(/[А-ЯЁA-Z]{2,15}/i, 'Только буквы и пробел'),
    email: yup.string()
        .required('Обязательно')
        .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Неправильный адрес электронной почты'),
    date: yup.date()
        .required('Обязательно')
        .transform(parseDateString)
        .max(new Date('2003-01-01'), 'Не младше 18 лет'),
    region: yup.string()
        .required('Обязательно'),
    agree: yup.bool().oneOf([true], 'Обязательно'),

});


export default function UserForm({ userData, token }) {

  //console.log('userData', userData);
    const [values, setValues] = useState({
        first_name: userData.first_name ? userData.first_name : "",
        email: userData.email ? userData.email : "",
        file: "",
        region: userData.region ? userData.region : "",
        agree: "",
        date: userData.birthday ? new Date(userData.birthday.split('.').reverse().join('-')) : ""
    })

    const [message, setMessage] = useState(false)
    const [file, setFile] = useState()
    const [sended, setSended] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const key = e.target.id;
        const value = e.target.value;
        setValues(values => ({
            ...values,
            [key]: value,
        }))
        setSended(false);
        setMessage(null);
    }

    const setFileValue = (e) => {
        setFile(document.getElementById('file').files[0])
    }

    const { register, control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async data => {
        let delta = data.date.getTimezoneOffset() * 60000;
        let formData = new FormData();
        formData.append('first_name', data.first_name)
        formData.append('email', data.email)
        formData.append('file', document.getElementById('file').files[0])
        formData.append('region', data.region)
        formData.append('date', (new Date(data.date - delta)).toISOString())

        let token = window.localStorage.getItem('tresnutye2021-token');
        setSended(false);
        setMessage(null);
        setTimeout(() => {
          setSended(true);
        }, 500);

        API.post('/eggs_photo', formData, { headers: {
          'Authorization': `Bearer ${token}`,
        } })
            .then(
                res => {
                    setMessage(res.data.message)
                    setSuccess(res.data.success ? true : false)
                }
            )
            .catch(
                rej => {
                    setMessage('Не удалось отправить. Попробуйте позже.')
                    setSuccess(false)
                }
            )
    };


    return (
        <div className="row justify-content-center">
            <header >
                <div className="row justify-content-center">
                    <div className="col-lg-auto">
                        <h2 className='text-violet text-5xl mb-4'>
                            регистрация
                        </h2>
                        <p className='text-violet'>Принять участие в розыгрыше могут только лица, достигшие 18 лет</p>
                    </div>
                </div>

            </header>
            <form
                className='mt-8'
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="grid lg:grid-cols-2 gap-4">
                    <div className="w-full">
                        <TextField
                            className="w-full"
                            id="first_name"
                            name="first_name"
                            label="Имя"
                            variant="outlined"
                            error={errors.first_name}
                            value={values.first_name}
                            helperText={errors.first_name && errors.first_name.message}
                            {...register("first_name")}
                            onChange={handleChange}
                        />

                    </div>
                    <div className="w-full">
                        <TextField
                            label="E-mail"
                            id="email"
                            value={values.email}
                            variant="outlined"
                            error={errors.email}
                            helperText={errors.email && errors.email.message}
                            {...register("email")}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-full">
                        <TextField
                            className='cursor-pointer'
                            id="date"
                            variant="outlined"
                            label="Дата рождения"
                            type="date"
                            defaultValue={userData.birthday && userData.birthday.split('.').reverse().join('-')}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            error={errors.date}
                            helperText={errors.date && errors.date.message}
                            {...register("date")}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-full">
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-age-native-simple">
                                Выберите регион
                            </InputLabel>
                            <Controller
                                name="region"
                                control={control}
                                defaultValue={values.region}
                                render={({ field: { value, onChange } }) => (
                                    <Select
                                        labelId="demo-customized-select-label"
                                        value={value}
                                        onChange={onChange}
                                        label="Выберите регион"
                                        inputProps={{
                                            name: "Выберите регион",
                                            id: "outlined-age-native-simple",
                                        }}
                                    >
                                        {REGION_LIST.map((item, index) => (
                                            <MenuItem value={item.city} key={index}>{item.city}</MenuItem>
                                        ))}
                                    </Select>)
                                }
                            />

                        </FormControl>
                        <div className='text-red ml-3'>{errors.region && errors.region.message}</div>
                    </div>
                    <div className="w-full file relative">
                        <input
                            type="file"
                            className="w-full"
                            name="file"
                            id="file"
                            {...register("file")}
                            onChange={setFileValue}
                        />
                        <label htmlFor="file" className='w-full'>{file ? file.name : `Загрузить фото коробки с яйцами`}
                            <div className="btn lil-btn">+</div>
                        </label>
                        <div className='text-red mt-14 ml-3'>{errors.file && errors.file.message}</div>
                    </div>
                    <div className="w-full ">
                        <FormControlLabel
                            className='w-full check-box'
                            style={{ color: '#520084' }}
                            control={<Checkbox />}
                            id="agree"
                            {...register("agree")}
                            label={<p>Я согласен с <a className='underline hover:no-underline' href='https://dixy.ru/politika-obrabotki-i-zashity.pdf' target='_blank'>условиями обработки персональных данных</a></p>}
                        />
                        <p className='text-red'>{errors.agree && errors.agree.message}</p>
                    </div>
                </div>

                <div className="mx-auto" style={{ width: 'fit-content', display: 'grid' }}>
                    <button className='btn grid mt-8 py-4 px-8' type='submit'>
                        <span>сохранить</span>
                        <img src={arr} alt="" />
                    </button>

                </div>
            </form>
            {
                sended ?
                    message ?
                        <p className={`text-center mx-auto ${success ? 'text-green' : 'text-red'} mt-8`}>{message}</p>
                    :
                        <p className='text-center mx-auto text mt-8'>Выполняется...</p>
                : null
            }
        </div>
    )

}
