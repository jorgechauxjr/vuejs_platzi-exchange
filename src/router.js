import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home";
import About from "@/views/About";
import Error from "@/views/Error";
import CoinDetail from "@/views/CoinDetail";

Vue.use(Router);

// el name de cada ruta se invoca en PxAssetsTable.vue

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/about",
      name: "about",
      component: About,
    },
    // crear ruta dinamica
    // :id significa un parametro dinamico. Ej puede ser bicoin, etherium, etc.
    //depende valor
    // === dospuntos indica que es un parametro, id es el nombre
    //Es el mismo que hay en CoinDetail.vue en el metodo getCoin()
    {
      path: "/coin/:id",
      name: "coin-detail",
      component: CoinDetail,
    },
    {
      path: "*",
      name: "error",
      component: Error,
    },
  ],
});
