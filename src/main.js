import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import datav from 'imooc-datav-libs-dev'

// app.js  9.36 KiB  (3个组件)
// app.js  9.20 KiB  (1个组件)
// app.js  7.29 KiB  (1个组件,按需加载)

//第三方组件库加载
createApp(App)
    .use(store)
    .use(router)
    .use(datav)
    .mount('#app')
