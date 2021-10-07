import Home from "./views/Home.js";
import store from "./store.js";
// import Login from "./views/Login.js"
const routes = [
    { path: '/',
      name: 'Home',
      component: Home,
    },
    { 
      path: '/login', 
      name: 'login.user', 
      component: () => import("./views/Login.js")},
    { 
      path: 
      '/samples', 
      name: 'samples', 
      component: () => import("./views/Samples.js"),
      meta: { requiresAuth: true}
    },
    { 
      path: '/details/:id', 
      name: 'details.show', 
      props: route => ({id: route.params.id}), 
      component: () => import("./views/SampleDetails.js"), 
      meta: { requiresAuth: true } 
    },
    {
      path:'/order/:id',
      name:'order.show',
      props: route => ({orderId: route.params.id}),
      component: () => import("./views/Order.js"),
      meta: { requiresAuth: true },
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('./views/User.js'),
      meta: { requiresAuth: true },
      props: true
    },
    { 
      path: '/user/samples',
      name: 'user.samples', 
      component: () => import("./views/UserSamples.js"), 
      meta: { requiresAuth: true }
    },
    {
      path: '/user/orders',
      name: 'user.orders',
      component: () => import('./views/UserOrders.js'),
      meta: { requiresAuth: true},
    },
    {
      path: '/user/edit',
      name: 'user.password',
      component: () => import('./views/ResetPassword.js'),
      meta: { requiresAuth: true},
    },
    { 
      path: '/:pathMatch(.*)*',
      name: 'notfound', 
      component: () => import('./views/NotFound.js') 
    }
  ]
const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes, // short for `routes: routes`
  })

router.beforeEach( (to, from, next) => {
  // ...
  console.log('[router before each]:',to.meta.requiresAuth,' token is not present: ', !store.getters.getToken,'you shall not pass: ', (to.meta.requiresAuth && !store.getters.getToken));
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(!store.getters.getToken) next({name: 'login.user'})
    else next()
  } else {
    next()
  }
})

export default router