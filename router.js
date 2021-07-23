import Home from "./views/Home.js";
// import AddSample from "./views/AddSample.js"
const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/add-some-sample', name: 'add.sample', component: () => import("./views/AddSample.js") },
    { path: '/details/:id', name: 'details.show', component: () => import("./views/SampleDetails.js") }
  ]
const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes, // short for `routes: routes`
  })

export default router