
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/UserList.vue') },
      { path: '/camera', component: () => import('pages/PageCamera.vue') },
      { path: '/detailprofile', component: () => import('pages/DetailProfile.vue') },
      { path: '/detailpost', component: () => import('pages/DetailPost.vue') },
      { path: '/allpost', component: () => import('pages/AllPost.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
