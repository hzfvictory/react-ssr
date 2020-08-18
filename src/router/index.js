import withLoadable from "@/utils/withLoadable"

import LoadHome from '@/pages/home'
import LoadList from '@/pages/list'
import LoadLogin from '@/pages/login'

const Layout = withLoadable(() => import('@/layout'), '@/layout')
const Layout1 = withLoadable(() => import('@/layout/menu2'), '@/layout/menu2')
const Home = withLoadable(() => import('@/pages/home'), '@/pages/home')
const List = withLoadable(() => import ('@/pages/list'), '@/pages/list')
const Message = withLoadable(() => import('@/pages/message'), '@/pages/message')
const Login = withLoadable(() => import('@/pages/login'), '@/pages/login')
const NotFound = withLoadable(() => import('@/pages/404'), '@/pages/404')


export default {
  routes: [
    {
      path: '/login',
      exact: true,
      component: Login,
      loadData: LoadLogin.loadData,
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
          component: List,
          loadData: LoadList.loadData,
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