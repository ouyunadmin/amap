import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import amapTemp from '@/components/amapTemp'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/amapTemp',
      name: 'amapTemp',
      component: amapTemp
    }
  ]
})
