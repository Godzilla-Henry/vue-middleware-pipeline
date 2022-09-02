# vue-middleware-pipeline

## 使用meta設定每個頁面的驗證方式
```
meta: {
    middleware: [
        guest //驗證的js
    ]
}
```

### 個別的驗證方式
```
export default function isSubscribed ({ next, store }){
    // 尚未授權
    if(!store.getters.auth.isSubscribed){
        // 導回前頁
        return next({
            name: 'dashboard'
        })
    }
    // 前往欲前往頁面
    return next()
}
```

### 路由檢查
```
router.beforeEach((to, from, next) => {
    // 不需驗證
    if (!to.meta.middleware) {
        return next()
    }
    const middleware = to.meta.middleware
    const context = {
        to,
        from,
        next,
        store
    }
    return middleware[0]({
        ...context
    })
})
```

### >1以上的驗證方式時使用
```
function middlewarePipeline (context, middleware, index) {
    const nextMiddleware = middleware[index]
    if(!nextMiddleware){
        return context.next 
    }
    return () => {
        const nextPipeline = middlewarePipeline( context, middleware, index + 1 )
        nextMiddleware({ ...context, next: nextPipeline })
    }
}
export default middlewarePipeline
```

### 參考
See [Configuration Reference](https://codertw.com/%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80/645174/).
