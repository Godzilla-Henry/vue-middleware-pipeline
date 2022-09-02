function middlewarePipeline (context, middleware, index) {
    const nextMiddleware = middleware[index]
    // 已不需再驗證
    if(!nextMiddleware){
        return context.next 
    }

    return () => {
        const nextPipeline = middlewarePipeline(
            context, middleware, index + 1
        )
        /* 
            middleware[0] is a function from (guest, auth, isSubscribed) and
            parameters are your (next, store) to decide your final action; 
        */
        nextMiddleware({ ...context, next: nextPipeline })
    }
}
export default middlewarePipeline