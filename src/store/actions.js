import {
    SET_SHOP_PAGE,
    VERIFY_CODE_SUCCESS,
    VERIFY_CODE_FAIL,
    CODE_REQUEST_SUCCESS,
    UPDATE_USER_SUCCESS,
    EDIT_USER_INFO,
    SET_LOADER,
    UPDATE_FAILED,
    QUIT_ACCOUNT,
    OPEN_FORM,
    OPEN_SCANER,
    SET_SPONSORY_PAGE,
    SET_SCANER_FORM,
    SET_CHECKS,
    SET_CHECKS_FAILED,
    CODE_REQUEST_FAILED,
    SHOW_CHECK_LIST,
    SET_WINNERS_LIST,
    SET_WINNERS_LIST_FAILED,
    SET_SHOP
} from './actionTypes'
import API from "../utils/API";

// Открыть страницу с картой
export const setShopPage = (action) => ({
    type: SET_SHOP_PAGE,
    payload: action
})

// Открыть страницу с картой
export const selectShop = (action) => ({
    type: SET_SHOP,
    payload: action
})

// Ввод чека в сканере вручную
export const setScanerForm = (action) => ({
    type: SET_SCANER_FORM,
    payload: action
})

// Открыть страницу товаров-спонсоров
export const setSponsoryPage = (action) => ({
    type: SET_SPONSORY_PAGE,
    payload: action
})


// ВЫЗВАТЬ ФОРМУ
export const setForm = (action) => ({
    type: OPEN_FORM,
    payload: action
})

// Вызвать сканер
export const openScaner = action => ({
    type: OPEN_SCANER,
    payload: action
})


// Если есть активная сессия и юзер уже залогинен
export const handleCheckToken = (token) => {

    return async dispatch => {
        await API.get(
            "/profile",
            { headers: { "Authorization": `Bearer ${token}` } },
        )
            .then(
                (response) => {
                    const { first_name, last_name, email, birthday, region, agreement } = response.data.data
                    dispatch({
                        type: VERIFY_CODE_SUCCESS,
                        payload: {
                            userName: first_name,
                            userLastName: last_name,
                            userEmail: email,
                            userBirthDate: birthday,
                            confirmedRules: agreement,
                            region: region,
                            token: token
                        }
                    })
                    dispatch(GetAllChecks(token))
                },
                (error) => {
                    dispatch({
                        type: VERIFY_CODE_FAIL,
                        payload: error.message
                    })
                })
    }
}

// Выйти из аккаунта
export const quitAccount = () => ({
    type: QUIT_ACCOUNT
})


// Отправить код на номер телефона
export const handleSendCode = userPhone => {
    return async dispatch => {
        await API.post("/login_sms", {
            phone: userPhone
        })
            .then(
                (response) => {
                    dispatch({
                        type: CODE_REQUEST_SUCCESS,
                        payload: response.data.data
                    })
                },
                (error) => {
                    dispatch({
                        type: CODE_REQUEST_FAILED,
                        payload: 'Не удалось отправить код. Проверьте введенный номер'
                    })
                }
            );

    }
}

// Проверка кода, который ввели на сайте с тем, который прслали на телефон
export const handleCheckCode = (userPhone, userCode) => {
    return async dispatch => {

        await API.post("/sms", {
            phone: userPhone,
            confirm_code: userCode
        })
            .then(
                (response) => {
                    let jsR = response
                    const { token, message, success } = jsR.data
                },
                (error) => {
                    dispatch({
                        type: VERIFY_CODE_FAIL,
                        payload: 'Неверный код подтверждения'
                    })
                }
            );



    }
}

// По нажатию на кнопку Редактировать
export const editUserInfo = (action) => ({
    type: EDIT_USER_INFO,
    payload: action
})


// Обновить данные юзера
export const handleUpdateUser = (userData, token) => {
    const { name,
        lastName,
        email,
        phone,
        region } = userData

    return async dispatch => {
        await API.post("/profile/update",
            {
                first_name: name,
                last_name: lastName,
                email: email,
                region: region,
            },
            {
                headers:
                    { "Authorization": `Bearer ${token}` }
            })
            .then(
                (response) => {
                    dispatch({
                        type: UPDATE_USER_SUCCESS,
                        payload: {
                            user_name: name,
                            user_last_name: lastName,
                            user_email: email,
                            user_city: region,

                        }
                    })
                    dispatch(editUserInfo(false))
                },
                (error) => {
                    dispatch({
                        type: UPDATE_FAILED,
                        payload: error.message
                    })
                }
            )

    }
}


export const loading = (action) => ({
    type: SET_LOADER,
    payload: action
})


// Получить мои чеки с данными
export const GetAllChecks = (token) => {
    return async dispatch => {
        await API.get("/checks", {
            headers:
                { "Authorization": `Bearer ${token}` }
        })
            .then(
                (response) => {
                    dispatch({
                        type: SET_CHECKS,
                        payload: response.data.data
                    })
                },
                (error) => {
                    dispatch({
                        type: SET_CHECKS_FAILED,
                        payload: 'Oшибка получения данных. Попробуйте позже'
                    })
                }
            );

    }
}

export const sendCheck = (token, data) => {
    const { date, fn, fp, doc_number } = data
    return async dispatch => {
        await API.post("/checks", {
            date,
            fn,
            fp,
            doc_number,
        }, { headers: { "Authorization": `Bearer ${token}` } })
            .then(
                (response) => {
                    if (response.data.success) {
                        dispatch({
                            message: response.data.message,
                            name: "Чек принят",
                        });
                    }
                    else {
                        dispatch({
                            message: response.data.message,
                            name: "Чек не принят",
                        });
                    }
                },
                (error) => {
                    dispatch({
                        message: "Qr-код, который вы сканируете, не прошел валидацию",
                        name: "Чек не принят",
                    });
                }
            );

    }
}
export const showCheckList = action => ({
    type: SHOW_CHECK_LIST,
    payload: action
})


// отправить данные чека
export const getWinners = () => {
    return async dispatch => {
        await API.get("/winners", {})
            .then(
                (response) => {

                    dispatch({
                        type: SET_WINNERS_LIST,
                        payload: response.data
                    })

                },
                (error) => {
                    dispatch({
                        type: SET_WINNERS_LIST_FAILED,
                        payload: 'Oшибка получения данных. Попробуйте позже'
                    })
                }
            );
    }
}
