export default {
  token: state => state.user.token,
  accessed: state => state.user.accessed,
  routes: state => state.permission.permissionRoutes,
  permissions: state => state.permission.permissions
}
