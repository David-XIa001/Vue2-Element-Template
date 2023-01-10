import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'home', affix: true }
      }
    ]
  },
  {
    path: '/user-serve',
    component: Layout,
    redirect: '/user-serve/admin-manage',
    name: 'User Service',
    meta: { title: 'userService', icon: 'el-icon-user-solid' },
    children: [
      // 管理员管理
      {
        path: 'admin-manage',
        component: () => import('@/views/admin/index'),
        name: 'Admin Management',
        meta: {
          title: 'adminManage',
          icon: 'el-icon-user'
        }
      },
      // 用户管理
      {
        path: 'user-manage',
        component: () => import('@/views/user/index'),
        name: 'User Management',
        meta: {
          title: 'userManage',
          icon: 'el-icon-s-custom'
        }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
