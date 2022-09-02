export default function isSubscribed ({ next, store }){
    // 尚未訂閱 -> Dashboard
    if(!store.getters.auth.isSubscribed){
        return next({
            name: 'dashboard'
        })
    }
    // 原本要轉向的頁面
    return next()
}