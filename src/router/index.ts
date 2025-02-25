import { createRouter, createWebHistory } from 'vue-router'
import homepage from '../view/HomePage.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: homepage
        }
    ]
})

export default router;