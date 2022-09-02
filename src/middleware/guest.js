export default function guest ({ next, store }){
    // 已登入 -> Dashboard
    if(store.getters.auth.loggedIn){
        return next({
            name: 'dashboard'
        })
    }
    // 原本要轉向的頁面
    return next()
}