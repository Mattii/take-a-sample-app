import Home from "./views/Home.js";
// import Login from "./views/Login.js"
const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/login', name: 'login.user', component: () => import("./views/Login.js")},
    { path: '/sample', name: 'Sample', component: () => import("./views/Sample.js") },
    { path: '/details/:id', name: 'details.show', props: route => ({id: route.params.id}), component: () => import("./views/SampleDetails.js") },
  ]
const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes, // short for `routes: routes`
  })

export default router