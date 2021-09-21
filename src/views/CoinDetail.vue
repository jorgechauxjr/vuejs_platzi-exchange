<template>
  <div class="flex-col">
    <template v-if="asset.id">
      <div class="flex flex-col sm:flex-row justify-around items-center">
        <div class="flex flex-col items-center">
          <img
            :src="
              `https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`
            "
            :alt="asset.name"
            class="w-20 h-20 mr-5"
          />
          <h1 class="text-5xl">
            {{ asset.name }}
            <small class="sm:mr-2 text-gray-500">{{ asset.symbol }}</small>
          </h1>
        </div>

        <div class="my-10 flex flex-col">
          <ul>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Ranking</b>
              <span> #{{ asset.rank }}  </span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio actual</b>
              <span> {{ asset.priceUsd | dollar }} </span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más bajo</b>
              <span>{{ min | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más alto</b>
              <span>{{ max | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio Promedio</b>
              <span>{{ avg | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Variación 24hs</b>
              <span>{{ asset.changePercent24Hr | percent }}</span>
            </li>
          </ul>
        </div>

        <div class="my-10 sm:mt-0 flex flex-col justify-center text-center">
          <button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Cambiar
          </button>

          <div class="flex flex-row my-5">
            <label class="w-full" for="convertValue">
              <input
                id="convertValue"
                type="number"
                class="text-center bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
              />
            </label>
          </div>

          <span class="text-xl"></span>
        </div>
      </div>

      <h3 class="text-xl my-10">Mejores Ofertas de Cambio</h3>
      <table>
        <tr v-for="m in markets" :key="`${m.exchangeId}-${m.priceUsd}`" class="border-b">
          <td>
            <b>{{ m.exchangeId }}</b>
          </td>
          <!-- baseSymbol y quoteSymbol vienen de la api de coin cap o se puede ver en las herramientas del desarrollador en el arreglo de markets
          dentro del componente CoinDetail Value -->
          <td>{{ m.priceUsd | dollar }}</td>
          <td>{{ m.baseSymbol }} / {{ m.quoteSymbol }} </td>
          <td>
            <!-- @custom-clickc es igual a v-on:custom-click -->
            <px-button
            :is-loading="m.isLoading || false"
              v-if="!m.url"
              @custom-click="getWebSite(m)">
            <slot>Obtener Link</slot>
            </px-button>
            <a v-else class="hover:underline text-green-600" target="_blanck">{{ m.url }}</a>
          </td>
        </tr>
      </table>
    </template>
  </div>
</template>

<script>
import PxButton from "@/components/PxButton";
import api from "@/api";
export default {
  name: "coinDetail",

  components: { PxButton },
  // En asset va a ir la informacion que viene de la API rest
  data() {
    return {
      asset: {},
      history: [],
      markets: []
    };
  },

  computed: {
    min() {
      return Math.min(
        ...this.history.map(h => parseFloat(h.priceUsd).toFixed(2))
      )
    },

    max() {
      return Math.max(
        ...this.history.map(h => parseFloat(h.priceUsd).toFixed(2))
      )
    },

    avg() {
      return Math.abs(
        ...this.history.map(h => parseFloat(h.priceUsd).toFixed(2))
      )
    }
  },

  // cada vez que el componente se cree va a llamar a la funcion getCoin()
  created() {
    this.getCoin()
  },
  // getCoins() se encarga de obtener la info de la API rest y es ejecutada dentro de created()
  // el nombre del parametro this.$route.params.id es id porque debe ser el mismo definido en router.js con dos puntos. L29
  methods: {
    // Una vez se resuelva le pasamos el vaor del a url al exchange
    getWebSite (exchange) {

      this.$set(exchange, "isLoading", true)

      // console.log("===== ", exchange)
      return api.getExchange(exchange.exchangeId)
      .then(res => {
        this.$set(exchange, "url", res.exchangeUrl)
      })
      .finally(() => {
        this.$set(exchange, "isLoading", false)
      })
    },

    getCoin() {
      const id = this.$route.params.id
      this.isLoading = true

      Promise.all([
        api.getAsset(id),
        api.getAssetHistory(id),
        api.getMarkets(id)
      ])
        .then(([asset, history, markets]) => {
          this.asset = asset
          this.history = history
          this.markets = markets
        })
        .finally(() => (this.isLoading = false))
    }
  }
}
</script>
