import axios from "axios";

export default axios.create({
    baseURL: "https://scancheck.promo-dixy.ru/api", 
    responseType: "json",
    headers: {
        // 'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    }
});
