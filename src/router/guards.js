import router from "./index";
import asyncRoutes from "./asyncRouterMap";
import store from '@/store'

router.beforeEach(async(to,from,next)=>{
    const hastoken=sessionStorage.getItem('token');
    if(hastoken){
        console.log('我是to',to)
        await store.dispatch('getRole')
        if(to.path=='/login'){
            next('/')
        }else{
            //動態添加路由  router.addRoute(路由配置項)
            let f=asyncRoutes.filter((item)=>item.meta.auth.includes(store.state.role))//返回符合使用者身份的路由數組
            let k=f.map((item)=>{let{path}=item;return path})
            console.log('我是可前往的路徑',k)
            if(!to.name){//去的頁面是無名的話，先加上新的路由，再重新去該路徑(再未加上新路由之前，新的路由都是無名)
                f.forEach((item)=>{router.addRoute('layout',item)})  //加路由是異步操作，addRoute('父路由名',路由配置項)
                next({...to,replace:true})
            }else{
                next()
            }
            //
        }
    }else{
        if(to.path=='/login'){
            next()
        }else{
            next('/login')
        }
    }
})