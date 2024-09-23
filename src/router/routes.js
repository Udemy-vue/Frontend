const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
        meta: {
          auth: false
        }
      },
      {
        path: 'protected',
        component: () => import('pages/ProtectedPage.vue'),
        meta: {
          auth: true
        }
      },
      { path: 'login', component: () => import('pages/loginPage.vue') },
      { path: 'register', component: () => import('pages/RegisterPage.vue') },
      { path: 'about', component: () => import('pages/AboutPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
