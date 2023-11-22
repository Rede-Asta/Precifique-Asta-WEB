import Vue from 'vue';
import Vuelidate from 'vuelidate';
import Paginate from 'vuejs-paginate';
import money from 'v-money';
import VueMask from 'v-mask';
import VueGtm from '@gtm-support/vue2-gtm';
import {
  SwipeList, SwipeOut
} from 'vue-swipe-actions';
import VueCarousel from 'vue-carousel';
import VueSimpleAlert from 'vue-simple-alert';
import { App as Cap } from '@capacitor/app';



import SetGtm from '@/plugins/SetGtm';

import mixpanel from '@/plugins/mixpanel';

import App from './components/App/App.vue';
import router from './router';
import { registerVueGlobalComponent } from '@/register/vue-global-component.register';
import 'material-icons/iconfont/material-icons.css';
import environment from '@/environments/environment';

import { VBPopover } from "bootstrap-vue";

import store from '@/store/index';

import Vue2TouchEvents from "vue2-touch-events";

import 'vue-select/dist/vue-select.css';

import VSelect from 'vue-select';

import Zendesk from '@dansmaculotte/vue-zendesk';

Vue.component('v-select', VSelect);

const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
});

Vue.directive('b-popover', VBPopover)

Vue.filter('toCurrency', function (value) {
  if (typeof value !== "number") {
    return value;
  }

  return formatter.format(value);
});

Vue.use(Vue2TouchEvents, {
  disableClick: true,
});
Vue.use(money, { precision: 2 });
Vue.component('paginate', Paginate);
Vue.use(Vuelidate);
Vue.use(VueMask);
Vue.use(VueCarousel);
Vue.use(VueSimpleAlert);
Vue.use(SetGtm);
Vue.use(mixpanel);
Vue.use(VueGtm, {
  id: 'GTM-TFVXHJQ',
  defer: false,
  compatibility: false,
  enabled: true,
  // debug: true,
  loadScript: true,
  vueRouter: router,
  ignoredViews: [],
  trackOnNextTick: false,
});
// Vue.use(ApmVuePlugin, {
//   config: {
//     serviceName: 'Frontend - precifique Dev',
//     serverUrl: 'https://apm.asta.pertinhodecasa.com.br',
//     environment: environment.isDevelopment() ? 'development' : 'production',
//   },
// });
Vue.config.productionTip = false;
registerVueGlobalComponent(Vue);

new Vue({
  router,
  store,
  render: (h) => h(App),
  components: {
    SwipeOut,
    SwipeList,
  },
}).$mount('#app');

Cap.addListener('appUrlOpen', (data) => {
  const page = data.url.split('.br').pop();
  router.push({ path: page });
});

Vue.use(Zendesk, {
  key: '14e6c01e-ae2c-4e2c-8c76-d461c01479c8',
});

Cap.addListener('backButton', () => router.back());
