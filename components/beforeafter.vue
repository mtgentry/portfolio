<template>
  <main>
    <div class="container">
      <div class="image-container">
      

      <img
  class="image-before slider-image"
  src="/domains/agency/pages/test/media/seaholm_1.jpg"
  alt="color photo"
/>
<img
  class="image-after slider-image"
  src="/domains/agency/pages/test/media/seaholm_2.jpg"
  alt="After effect"
/>
</div>
      <input
        type="range"
        min="0"
        max="100"
        v-model="sliderValue"
        aria-label="Percentage of before photo shown"
        class="slider"
        @input="updateImagePosition"
      />
      <div class="slider-line" aria-hidden="true"></div>
      <div class="slider-button" aria-hidden="true">
        <!-- SVG content here... -->
      </div>
    </div>
    
  </main>
</template>

<script>
export default {
  data() {
    return {
      sliderValue: 50
    };
  },
  methods: {
    updateImagePosition() {
      this.$el.querySelector('.container').style.setProperty('--position', `${this.sliderValue}%`);
    }
  }
}
</script>





<style scoped>


*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

iframe {
  aspect-ratio: 16/9;
}

.video-container {
  margin: 2rem;
  max-height: 300px;
}

img {
  display: block;
  max-width: 100%;
}

main {
  display: grid;
  place-items: center;
  min-height: 100vh;
}

.container {
  display: grid;
  place-content: center;
  position: relative;
  overflow: hidden;
  border-radius: 1rem;
  --position: 50%;
}

.image-container {
  max-width: 800px;
  max-height: 90vh;

}

.slider-image {
  width: 100%;
  height: 100%;
  object-fit: contain; /* Change from 'cover' to 'contain' */
  object-position: center;
}


.image-before {
  position: absolute;
  inset: 0;
  width: 100%; 
  clip-path: inset(0 0 0 var(--position)); /* Clip the image from the left side based on the slider's position */
}


.slider {
  position: absolute;
  inset: 0;
  cursor: pointer;
  opacity: 0;
  /* for Firefox */
  width: 100%;
  height: 100%;
}

.slider:focus-visible ~ .slider-button {
  outline: 5px solid black;
  outline-offset: 3px;
}

.slider-line {
  position: absolute;
  inset: 0;
  width: .2rem;
  height: 100%;
  background-color: #fff;
  /* z-index: 10; */
  left: var(--position);
  transform: translateX(-50%);
  pointer-events: none;
}

.slider-button {
  position: absolute;
  background-color: #fff;
  color: black;
  padding: .5rem;
  border-radius: 100vw;
  display: grid;
  place-items: center;
  top: 50%;
  left: var(--position);
  transform: translate(-50%, -50%);
  pointer-events: none;
  /* z-index: 100; */
  box-shadow: 1px 1px 1px hsl(0, 50%, 2%, .5);
}







@media (max-width: 768px) {
  .plan-container {
    flex-direction: column;
    gap: 20px;
  }
}

</style>
