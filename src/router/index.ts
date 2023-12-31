import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import  loginPrecifiqueStep0View  from '@/views/login-precifique-step-0/login-precifique.step.0.vue';
import  accountDeletionView  from '@/views/delete-account/delete-account.vue';
import accountDeletedView from "@/views/account-deleted/account-deleted.vue";


Vue.use(VueRouter);


const routes: RouteConfig[] = [

  {
    path: '/',
    component: loginPrecifiqueStep0View,
  },
  {
    path: '/delete',
    name: 'DeleteAccount',
    component: accountDeletionView,
  },
  {
    path: '/account-deleted',
    name: 'accountDeleted',
    component: accountDeletedView
  }

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.name === 'ProductEdit' || to.name === 'ProductCreate') {
      return { x: 0, y: 0 } as any;
    }

    return savedPosition
  }
});


export default router;
