import router from './router'
import store from './store'

import NProgress from "nprogress"
import 'nprogress/nprogress.css'
const whileList = ['/404', '/login']
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  if (store.getters.token) {
    if (to.path === '/login')  {
      next('/')
    } else {
      // 如果没有id这个值 才会调用 vuex的获取资料的action
      if(!store.getters.userId){
        await store.dispatch('user/getUserInfo');
      }
      next()

    }
  } else {
    if (whileList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
  NProgress.done()

})

router.afterEach(() => {
  NProgress.done()
})
