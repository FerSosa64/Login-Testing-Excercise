<template>
  <div class="home">
    <img class="centered-image" :src="currentimage" :alt="eyestate" />
    <img/>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// Define the custom event interface
interface LoginStatusEvent extends CustomEvent {
  detail: {
    isLoggedIn: boolean;
  };
}

const currentimage = ref(new URL('@/assets/blurryclosedeye.jpg', import.meta.url).href);
let eyestate = "closed";

// Listen for login status changes
onMounted(() => {
  window.addEventListener('login-status-changed', ((e: Event) => {
    const event = e as CustomEvent;
    if (event.detail?.isLoggedIn) {
      currentimage.value = new URL('@/assets/blurryopeneye.jpg', import.meta.url).href;
      eyestate = "open";
    } else {
      currentimage.value = new URL('@/assets/blurryclosedeye.jpg', import.meta.url).href;
      eyestate = "closed";
    }
  }));
});
</script>

<style scoped>
.home {
  text-align: center;
  padding: 2rem;
  background-color: #000000;
  height: 100vh; 
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center; 
}

.centered-image {
  max-width: 80%; 
  height: auto; 
}
 
.button-container {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

.search-container {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

.nav-button {
  padding: 1rem 2rem;
  background-color: #3760a8;
  color: #feca1c;
  text-decoration: none;
  border-radius: 4px;
  transition: opacity 0.3s;
}

.nav-button:hover {
  opacity: 0.9;
}
</style>
