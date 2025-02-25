<template>
  <div class="home">
    <img class="centered-image" src="../assets/blurryclosedeye.jpg" alt="Blurry eye" />
  </div>
</template>

<script setup lang="ts">
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
