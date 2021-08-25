import Home from "./views/Home.js";
import store from "./store.js";
// import Login from "./views/Login.js"
const routes = [
    { path: '/',
      name: 'Home',
      component: Home 
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
      path: '/:pathMatch(.*)*',
      name: 'notfound', 
      component: () => import('./views/NotFound.js') 
    }
  ]
const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes, // short for `routes: routes`
  })

router.beforeEach( (to, from) => {
  // ...
  if(to.meta.requiresAuth && !store.getters.getToken) {
    return {path: '/login'}
  }
})

export default router