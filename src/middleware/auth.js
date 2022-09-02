export default function auth ({ next, store }){
    // 尚未登入 -> 登入頁面
    if(!store.getters.auth.loggedIn){
        return next({
            name: 'login'
        })
    }
    // 原本要轉向的頁面
    return next()
}