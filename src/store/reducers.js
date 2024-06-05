import {
    SET_SHOP_PAGE,
    CODE_REQUEST_SUCCESS,
    VERIFY_CODE_SUCCESS,
    VERIFY_CODE_FAIL,
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
    SHOW_CHECK_LIST,
    CODE_REQUEST_FAILED,
    SET_WINNERS_LIST,
    SET_WINNERS_LIST_FAILED,
    SET_SHOP
} from './actionTypes'

import { combineReducers } from 'redux'


const defaultState = {
    sponsoryPage: false,
    action: false,
    shops: false,
    edit: false,
    codeSent: false,
    codeVerified: true,
    form: false,
    scaner: false,
    scanerForm: false,
    verifyCodeError: false,
    checkList: false,
    winners: false,
    birthday: '',
    shop: ''
}

export const mainReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_WINNERS_LIST:
            return { ...state, winners: action.payload }
        case SHOW_CHECK_LIST:
            return { ...state, checkList: action.payload }
        case OPEN_SCANER:
            return { ...state, scaner: action.payload }
        case SET_CHECKS:
            return { ...state, files: action.payload }
        case SET_WINNERS_LIST_FAILED:
            return { ...state, winnersMessage: action.payload }
        case SET_CHECKS_FAILED:
            return { ...state, checksMessage: action.payload }
        case SET_SCANER_FORM:
            return { ...state, scanerForm: action.payload }
        case OPEN_FORM:
            return { ...state, form: action.payload }
        case SET_SHOP_PAGE:
            return { ...state, shops: action.payload }
        case SET_SPONSORY_PAGE:
            return { ...state, sponsoryPage: action.payload }
        case SET_LOADER:
            return { ...state, loader: action.payload }
        case UPDATE_FAILED:
            return { ...state, systemMessage: action.payload }
        case CODE_REQUEST_SUCCESS:
            return { ...state, codeSent: true, error: '', userCode: action.payload }
        case CODE_REQUEST_FAILED:
            return { ...state, requestMessage: action.payload }
        case VERIFY_CODE_SUCCESS:
            const { userName, userLastName, userEmail, userBirthDate, agreement, region, token } = action.payload
            return { ...state, confirmedRules: agreement, token: token, codeVerified: true, userName: userName, userLastName: userLastName, userEmail: userEmail, userBirthDate: userBirthDate, region: region }
        case VERIFY_CODE_FAIL:
            return { ...state, verifyCodeError: action.payload }
        case EDIT_USER_INFO:
            return { ...state, edit: action.payload }
        case UPDATE_USER_SUCCESS:
            const { user_name,
                user_last_name,
                user_email,
                user_birth_date,
                user_city,
                user_phone } = action.payload
            return { ...state, userName: user_name, userLastName: user_last_name, userEmail: user_email, userBirthDate: user_birth_date, city: user_city, phone: user_phone }
        case QUIT_ACCOUNT:
            return { ...state, codeVerified: false, form: false, token: null }
        case SET_SHOP:
            return { ...state, shop: action.payload }
    }

    return state
}
export const rootReducer = combineReducers({
    store: mainReducer
})
