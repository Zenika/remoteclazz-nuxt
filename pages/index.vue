<template>
  <section>
    <h2>
      Offices
    </h2>
    <nav>
      <nuxt-link v-for="city in cities" :key="city" :to="`city/${city}`">
        <p>
          {{ city }}
        </p>
      </nuxt-link>
      <nuxt-link to="/register">
        Register new city
      </nuxt-link>
    </nav>
  </section>
</template>
<script>
export default {
  computed: {
    cities () {
      return this.$store.getters.getCities
    }
  }
  // TODO: add form feeling wrong ? with random response : success or error
  // TODO: détail par trois heure
}
</script>
