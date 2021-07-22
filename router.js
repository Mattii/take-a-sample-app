import Home from "./views/Home.js";
// import AddSample from "./views/AddSample.js"
const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/addsample', name: 'AddSample', component: () => import("./views/AddSample.js") },
  ]
const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes, // short for `routes: routes`
  })

export default router