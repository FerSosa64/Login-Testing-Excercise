<template>
  <div class="app">
      <navbar />
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import navbar from './components/navbar.vue';
export default defineComponent({
  name: 'App',
  components: {
    navbar
  },
  setup() {
    const route = useRoute();
  }
});
</script>


<style>
.app {
  font-family: Arial, sans-serif;
}

.nav-bar {
  padding: 1rem;
  background: #f5f5f5;
}

.home-link {
  color: #3760a8;
  text-decoration: none;
  font-weight: bold;
}

.home-link:hover {
  text-decoration: underline;
}
</style>
