<template>
  <table>
    <thead>
      <tr class="bg-gray-100 border-b-2 border-gray-400">
        <th></th>
        <th>
          <span>Ranking</span>
        </th>
        <th>Nombre</th>
        <th>Precio</th>
        <th>Cap. de Mercado</th>
        <th>Variación 24hs</th>
        <td class="hidden sm:block">
          <!-- Input para filtar informacion -->
          <input
            class="bg-gray-100 focus:outline-none border-b border-gray-400 py-2 px-4 block w-full appearance-none leading-normal"
            id="filter"
            placeholder="Buscar..."
            type="text"
            v-model="filter"
          />
        </td>
      </tr>
    </thead>
    <tbody>
      <!-- La key es el id. Id salió de la informacion que nos devuelve la API de coins
            https://docs.coincap.io/?version=latest#ee0c0be6-513f-4466-bbb0-2016add462e9 -->
      <!-- v-bind:key="a.id"   puede ir sin v-bind 
                        :key="a.id" -->
      <tr
        v-for="a in filteredAssets"
        v-bind:key="a.id"
        class="border-b border-gray-200 hover:bg-gray-100 hover:bg-orange-100"
      >
        <td>
          <!-- a.symbol salio del API. symbol es una propiedad que devuelve en el obj
          y .toLowerCase() para que el nombre quede en minuscula -->
          <img
            class="w-6 h-6"
            v-bind:src="`https://static.coincap.io/assets/icons/${a.symbol.toLowerCase()}@2x.png`"
            :alt="a.name"
          />
        </td>
        <td>
          <b># {{ a.rank }}</b>
        </td>
        <!-- Creamos router-link para que el usuario no tenga que escribir url sino que vaya directo a la info de la moneda especifica por medio de un enlace
        En este caso usamos router-link que funciona como una etiqueta a y redirecciona de manera dinamica -->
        <td>
          <router-link class="hover:underline text-green-600" :to="{ name: 'coin-detail', params: { id: a.id}}">
            {{ a.name }}
          </router-link>
          <small class="ml-1 text-gray-500">{{ a.symbol }}</small>
        </td>
        <td>
          {{ a.priceUsd | dollar }}
        </td>
        <td>
          {{ a.marketCapUsd | dollar }}
        </td>
        <td
          v-bind:class="a.changePercent24Hr.includes('-') ? 'text-red-600' : 'text-green-600'"
        >
          {{ a.changePercent24Hr | percent }}
        </td>
        <td class="hidden sm:block">
          <px-button @custom-click="goToCoin(a.id)">
            <span>Detalle</span>
          </px-button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import PxButton from "@/components/PxButton"
export default {
  name: "PxAssetsTable",

  components: { PxButton },

  data () {
    return {
      filter: "",
    };
  },

  // Aqui se recibe los assets por medio de properties que envia Home
  props: {
    assets: {
      type: Array,
      // funcion que devuelve un array
      default: () => [],
    },
  },

// Vamos a filtarar la lista de assets siempre que filter tenga un valor

/*Resumen: si nuestro elemento dentro de la lista assets coincide en propiedad symbol con propiedad filter
devolvemos esos elementos 
- Lo mismo con la propiedad name
- podemos buscafr por symbol o name*/
  computed: {
    filteredAssets() {
      if (!this.filter) { return this.assets }
      // este filter es nativo de js para filtrar arrays
      return this.assets.filter(
        a => 
          a.symbol.toLowerCase().includes(this.filter.toLowerCase()) ||
          a.name.toLowerCase().includes(this.filter.toLowerCase())
      )
    }
  },

  /* Para ir a una ruta de manera programatica uso $router que es diferente de $route
   this.$router me permite acceder a la instancia del router para navegar a traves de codigo
   la manera de navegar es pusheando una nueva ruta al stack de rutas */

   // coin-detail es el nombre de la ruta dinamica que esta en router.js

  methods: {
    goToCoin (id) {
      this.$router.push({ name: 'coin-detail', params: { id } })
    }
  }
};
</script>

<style scoped>
.up::before {
  content: "👆";
}

.down::before {
  content: "👇";
}

td {
  padding: 20px 0px;
  font-size: 0.6rem;
  text-align: center;
}

th {
  padding: 5px;
  font-size: 0.6rem;
}

@media (min-width: 640px) {
  td,
  th {
    padding: 20px;
    font-size: 1rem;
  }

  th {
    padding: 12px;
  }
}
</style>
