// import Layout from '@/views/Layout'
import { MessageBox } from 'element-ui'

let resolve = (resource, list, routes) => {
  if (resource.type === 0) return // 系统
  if (resource.type === 1) { // 目录
    const childrenList = list.filter(item => item.pid === resource.permissionId)
    const children = childrenList.map((item) => {
      return {
        path: item.uri,
        name: item.name,
        component: () => import('@/views' + item.uri + '.vue'),
        meta: {
          icon: item.icon,
          status: item.status
        }
      }
    })

    routes.push({
      path: '/',
      component: () => import('@/views/index/Layout'),
      name: resource.name,
      meta: {
        icon: resource.icon,
        status: resource.status
      },
      children: children
    })

    for (let i = 0; i < children.length; ++i) {
      resolve(children[i], list, routes)
    }
  }
}

let param2Obj = (url) => {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

let relogin = () => {
  MessageBox.alert('请重新登录', '登录失效', {
    confirmButtonText: '确定',
    callback: action => {
      location.href = process.env.SSO_URL
    }
  })
}

let reback = () => {
  MessageBox.alert('返回个人中心', '没有权限', {
    confirmButtonText: '确定',
    callback: action => {
      location.href = process.env.SSO_URL
    }
  })
}

export { resolve, relogin, reback, param2Obj }
