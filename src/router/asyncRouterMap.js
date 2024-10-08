export default[
    {
        //考勤頁面
        path:'/attendance',
        name:'attendance',
        meta:{auth:['boss','administrative']},
        component:()=>import('@/views/AuthView/Attendance.vue')
    },
    {
        //工資頁面
        path:'/salary',
        name:'salary',
        meta:{auth:['boss','finance']},
        component:()=>import('@/views/AuthView/Salary')
    },
    {
        path:'*',
        name:'not_found',
        meta:{auth:['boss','finance','user']},
        component:()=>import('@/views/notfound/NotFound')
      }
]