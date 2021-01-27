const Mock = require('mockjs')
const { deepClone } = require('../utils')
const { asyncRoutes, constantRoutes } = require('./routes.js')

const routes = deepClone([...constantRoutes, ...asyncRoutes])

const roles = [
  {
    key: 'RC001',
    name: '张三',
    description: '消耗品',
    description_a: '卫生纸',
    description_b: '',
    description_c: '网上购买',
    description_d: '20元/提',
    description_e: '1',
    routes: routes
  },
  {
    key: 'RC002',
    name: '李四',
    description: '非消耗品定向',
    description_a: '电脑',
    description_b: '8GB运行内存,512GB物理内存',
    description_c: '网上购买',
    description_d: '6299元',
    description_e: '2',
    routes: routes.filter(i => i.path !== '/permission')// just a mock
  },
  {
    key: 'RC003',
    name: '王二',
    description: '非消耗品非定向',
    description_a: '椅子',
    description_b: '',
    description_c: '网上购买',
    description_d: '299元/把',
    description_e: '1',
    routes: [{
      path: '',
      redirect: 'dashboard',
      children: [
        {
          path: 'dashboard',
          // name: 'Dashboard',
          meta: { title: 'dashboard', icon: 'dashboard' }
        }
      ]
    }]
  }
]

module.exports = [
  // mock get all routes form server
  {
    url: '/vue-element-admin/routes',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: routes
      }
    }
  },

  // mock get all roles form server
  {
    url: '/vue-element-admin/roles',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: roles
      }
    }
  },

  // add role
  {
    url: '/vue-element-admin/role',
    type: 'post',
    response: {
      code: 20000,
      data: {
        key: Mock.mock('@integer(300, 5000)')
      }
    }
  },

  // update role
  {
    url: '/vue-element-admin/role/[A-Za-z0-9]',
    type: 'put',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  },

  // delete role
  {
    url: '/vue-element-admin/role/[A-Za-z0-9]',
    type: 'delete',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  }
]
