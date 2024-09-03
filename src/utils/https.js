import service from "./service";

export function get(url,params){
    const config={
        method:'get',
        url,
    }

    if(params){
        config.params=params  //別忘了空對象為true
    }
    return service(config)  //返回一個service函數(一個axios實例)
}

export function post(url,data){
    const config={
        method:'post',
        url
    }
    if(data){
        config.data=data  //別忘了空對象為true
    }
    return service(config)  //返回一個函數
}

//這個文件中有兩個需要導出的東西，又因為默認導出只能有一個，所以用一般導出→引入時需加上{}

