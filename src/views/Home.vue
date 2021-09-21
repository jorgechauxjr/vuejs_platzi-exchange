<template>
  <div>
    <!-- bounce-loader es un componente de vue-spinner y salio de la documentacion
         https://github.com/Saeris/vue-spinners
         Para que aparezca "efect" de bolita cuando se está cargando una pagina -->
    <bounce-loader :loading="isLoading" :color="'#68d391'" :size="100" />
    <!-- Deberia ser así para que la bolita cargue pero no funciona
    <px-assets-table v-if="!isLoading" v-bind:assets="assets" /> -->
    <px-assets-table v-bind:assets="assets" />
  </div>
</template>

<script>
import api from "@/api";
import PxAssetsTable from "@/components/PxAssetsTable.vue";
export default {
  name: "Home",

  components: { PxAssetsTable },

  data() {
    return {
      assets: [],
    };
  },

  created() {
    this.isLoading = true

    api
      .getAssets()
      .then(assets => (this.assets = assets))
      .finally(() => (this.isLoading = false))
  },
};
</script>
