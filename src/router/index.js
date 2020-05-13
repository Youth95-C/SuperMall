import Vue from 'vue'
import VueRouter from 'vue-router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(VueRouter)
Vue.use(MintUI)

const routes = [
  {
    path:'',
    redirect:'/home'
  },
 {
   path:'/home',
   component:()=>import('../views/home/Home')
 },
 {
  path:'/category',
  component:()=>import('../views/category/Category')
},{
  path:'/cart',
  component:()=>import('../views/cart/Cart')
},{
  path:'/profile',
  component:()=>import('../views/profile/Profile')
},,{
  path:'/detail/:id',
  component:()=>import('../views/detail/Detail')
}
]

const router = new VueRouter({
  routes,
  mode:'history'
})

export default router
