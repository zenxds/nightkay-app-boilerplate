// 让webpack找到正确的加载路径
__webpack_public_path__ = window.nightKay.utils.getPublicPath()

window.nightKay.registerRoutes('app', [
  {
    path: '/home',
    exact: true,
    component: require('bundle-loader?lazy!./containers/home'),
  },
])
