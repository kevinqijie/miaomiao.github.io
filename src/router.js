import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/movie'
    },
    {
      path: '/movie',
      name: 'movie',
      redirect: './movie/hotMovie',
      component: () => import(/* webpackChunkName: "about" */ './views/Movie'),
      children: [
        {
          path: '/movie/hotMovie',
          name: 'hotMovie',
          component: () => import(/* webpackChunkName: "about" */ '@/components/HotMovie')
        },
        {
          path: '/movie/city',
          name: 'city',
          component: () => import(/* webpackChunkName: "about" */ '@/components/City')
        },
        {
          path: '/movie/search',
          name: 'search',
          component: () => import(/* webpackChunkName: "about" */ '@/components/Search')
        },
        {
          path: '/movie/upcoming',
          name: 'upcoming',
          component: () => import(/* webpackChunkName: "about" */ '@/components/Upcoming')
        }
      ]
    },
    {
      path: '/cinema',
      name: 'cinema',
      component: () => import(/* webpackChunkName: "about" */ './views/Cinema')
    },
    {
      path: '/mine',
      name: 'mine',
      component: () => import(/* webpackChunkName: "about" */ './views/Mine')
    }
  ]
})
