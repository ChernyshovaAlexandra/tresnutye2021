import axios from "axios";



//let token = window.localStorage.getItem('tresnutye2021-token')
//console.log('token', token);
export default axios.create({
    baseURL: "https://kdd-tresnutye.promo-dixy.ru/api",
    responseType: "json",
    headers: {
        //'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    }
});
