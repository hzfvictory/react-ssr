import withLoadable from "@/utils/withLoadable"


import LoadHome from '@/pages/home'

// const Login = withLoadable(() => import('@/pages/login'))
import Login from '@/pages/login'

const Layout = withLoadable(() => import('@/layout'))
const Layout1 = withLoadable(() => import('@/layout/menu2'))

const Home = withLoadable(() => import('@/pages/home'))
const Message = withLoadable(() => import('@/pages/message'))

const NotFound = withLoadable(() => import('@/pages/404'))


export default {
  routes: [
    {
      path: '/login',
      exact: true,
      component: Login,
      loadData: Login.loadData,
      title: '登录页'
    },
    {
      path: '/home',
      exact: true,
      component: Home,
      loadData: LoadHome.loadData,
      title: '首页'
    },
    {
      path: '/menu',
      component: Layout,
      routes: [
        {
          path: '/menu/home',
          exact: true,
          component: Home,
          loadData: LoadHome.loadData,
          title: '一级菜单首页',
          meta: {icon: 'home', keepAlive: true}
        },
        {
          path: '/menu/message',
          exact: true,
          component: Message,
          title: '一级菜单消息页',
        },
      ]
    },
    {
      path: '/menu2',
      component: Layout1,
      routes: [
        {
          path: '/menu2/home',
          exact: true,
          component: Home,
          loadData: LoadHome.loadData,
          title: '二级菜单首页',
        },
        {
          path: '/menu2/message',
          exact: true,
          component: Message,
          title: '二级菜单消息页',
        },
      ]
    },
    {
      path: '/404',
      component: NotFound,
    }
  ]
}