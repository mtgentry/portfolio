<template>
  <div class="video-container">
    <video controls preload="auto" poster="space.jpg">
      <source src="static/domains/agency/pages/unlimited_design/media/reel.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<script>
export default {
  name: 'ReelVideo'
}
</script>

<style scoped>
.video-container {
  /* Add any styles you want for the video container here */
  width: 100%;
  max-width: 800px; /* or any other value */
  margin: 0 auto;
  
}

video {
  width: 100%;
  height: auto;

}
</style>
