/**
 * 父应用加载的入口
 */
import nightKay from 'night-kay'

// 让webpack找到正确的加载路径
__webpack_public_path__ = nightKay.utils.getPublicPath() // eslint-disable-line

nightKay.registerRoutes('app', [
  {
    path: '/home',
    exact: true,
    component: require('bundle-loader?lazy!./containers/home'),
  },
])
