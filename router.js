const About = { template: '<div>About</div>' }

const routes = [
    { path: '/about', component: About },
  ]
const router = VueRouter.createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: VueRouter.createWebHistory(),
    routes, // short for `routes: routes`
  })

export default router