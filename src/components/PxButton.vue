<template>
<!-- El boton es para acceder a los detalles de una moneda en especifico pero de manera programatica -->

<!-- Se puede escribir v-on:click="buttonClick"" o tambien @click="buttonClick" -->
  <button v-on:click="buttonClick" class="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-2 border border-green-500 hover:border-transparent rounded">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'PxButton',

  methods: {
    buttonClick () {
      this.$emit('custom-click')
    }
  }
}
</script>
