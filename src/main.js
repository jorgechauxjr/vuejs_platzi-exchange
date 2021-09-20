import Vue from "vue";
import App from "./App.vue";
import "@/assets/css/tailwind.css";
import Chart from "chart.js";
import Chartick from "vue-chartkick";
import { VueSpinners } from "@saeris/vue-spinners";

import router from "@/router";
import { dollarFilter, percentFilter } from "@/filters";

Vue.use(VueSpinners);
Vue.use(Chartick.use(Chart));

// Para que funcione el filtro uso .filter()
// le paso nombre del filtro y la funcion que se va a ejecutar cuando llame ese filtro
Vue.filter("dollar", dollarFilter);
Vue.filter("percent", percentFilter);
Vue.config.productionTip = false;

new Vue({
  router: router,
  render: (h) => h(App),
}).$mount("#app");
