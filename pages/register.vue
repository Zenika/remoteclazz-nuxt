<template>
  <section>
    <h1>Register new city</h1>
    <form @submit.prevent="addNewCity">
      <label>
        name
        <input v-model.trim="name" type="text" required>
      </label>
      <label>
        latitude
        <input v-model.number="latitude" type="number" required min="-90" max="90">
      </label>
      <label>
        longitude
        <input v-model.number="longitude" type="number" required min="-180" max="180">
      </label>
      <button type="submit">
        Add
      </button>
    </form>
  </section>
</template>
<script>
export default {
  data () {
    return {
      name: '',
      latitude: null,
      longitude: null
    }
  },
  methods: {
    async addNewCity () {
      await this.$store.dispatch('addNewCity', { name: this.name, latitude: this.latitude, longitude: this.longitude })
      await this.$router.push('/')
    }
  }
}
</script>
