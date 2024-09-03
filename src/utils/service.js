import axios from "axios";
import { Message } from "element-ui";
const service = axios.create({
    baseURL:'http://localhost:8080',
    timeout:5000
})

//請求攔截器
service.interceptors.request.use((config)=>{
    if(sessionStorage.getItem('token')){
        config.headers.token=sessionStorage.getItem('token');  //在請求頭多加一個token
    }
    return config  //沒有return就不會放行
})

//響應攔截器

service.interceptors.response.use((res)=>{
    console.log('被攔截修改之前',res)
    const result = res.data; //後端返回的數據中，這裡用得上的只有data
    if(result.success){
        return result
    }else{
        //https://element.eleme.io/#/zh-CN/component/message
        //用alert不好看，改用人家封裝的
        Message({
            message:result.message||'請求錯誤',  //訊息，字串
            type:'error'   //樣式
        })
        return Promise.reject(new Error(result.message||'請求錯誤'))  //沒異步，所以不用new Promise創建一個實例
        //then後方是請求成功時的resolve，這段代碼是指回傳一個請求失敗reject，該走then以外的路線
    }
})

export default service