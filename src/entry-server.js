import { createApp } from './app'

const isDev = process.env.NODE_ENV !== 'production';

//服务端传递过来的context参数
export default context => {
  return new Promise((resolve, reject) => {
    const s = isDev && Date.now()
    const { app, router, store } = createApp()

    const { url } = context
    const { fullPath } = router.resolve(url).route

    if (fullPath !== url) {
      return reject({ url: fullPath })
    }

    router.push(url)
    
    // 等到 router 将可能的异步组件和钩子函数解析完
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents(); //获取当前url的所有组件

      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }

      Promise.all(matchedComponents.map(({ asyncData }) => asyncData && asyncData({
        store,
        route: router.currentRoute
      }))).then(() => {
        isDev && console.log(`data pre-fetch: ${Date.now() - s}ms`)
        // context.state 赋值成什么，window.__INITIAL_STATE__ 就是什么
        context.state = store.state;
        resolve(app)
      }).catch(reject)
    }, reject)
  })
}
