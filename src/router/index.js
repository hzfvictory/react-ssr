import withLoadable from "@/utils/withLoadable"

// https://www.cnblogs.com/kaishirenshi/p/9971307.html

// import LoadMessage from '@/pages/message'
// import Load404 from '@/pages/404'

import LoadHome from '@/pages/home'
import LoadScenicDetail from '@/pages/detail'
import LoadList from '@/pages/list'
import LoadLogin from '@/pages/login'

const Layout = withLoadable(() => import('@/layout'), '@/layout')
const Layout1 = withLoadable(() => import('@/layout/menu2'), '@/layout/menu2')
const Home = withLoadable(() => import('@/pages/home'), '@/pages/home')
const ScenicDetail = withLoadable(() => import('@/pages/detail'), '@/pages/detail')
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
      title: '登录页',
      meta: {}
    },
    {
      path: '/home',
      exact: true,
      component: Home,
      loadData: LoadHome.loadData,
      title: '首页',
      meta: {}
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
          path: '/menu/scenicid/detail/:id?',
          exact: true,
          component: ScenicDetail,
          loadData: LoadScenicDetail.loadData,
          title: '景区详情页',
          meta: {icon: 'home', keepAlive: true, path: '/menu/scenicid/detail'}
        },
        {
          path: '/menu/message',
          exact: true,
          component: Message,
          title: '一级菜单消息页',
          meta: {}
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
          meta: {}
        },
        {
          path: '/menu2/message',
          exact: true,
          component: Message,
          title: '二级菜单消息页',
          meta: {}
        },
      ]
    },
    {
      path: '/404',
      component: NotFound,
      meta: {}
    }
  ]
}