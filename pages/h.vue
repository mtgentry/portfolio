<template>
  <div>
    <div class="container">
      <div class="label">Home Assistant 2025.6.3 URL:</div>
      <div class="url-container">
        <div class="url-text">
          https://vknxjzkbq8ejn8zjsnhkeyjd6r2naihk.ui.nabu.casa
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeAssistantUrl',
  head() {
    return {
      title: 'URL Display',
      meta: [
        { name: 'robots', content: 'noindex, nofollow, noarchive, nosnippet, noimageindex' }
      ]
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #03A9F4;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.container {
  text-align: center;
  max-width: 90%;
  word-break: break-all;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: #03A9F4;
}

.label {
  color: white;
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 20px;
}

.url-container {
  background: rgba(255, 255, 255, 0.95);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.url-text {
  font-size: 1.5rem;
  color: #888;
  font-weight: 300;
  line-height: 1.4;
}

@media (max-width: 768px) {
  .url-container {
    padding: 30px 20px;
  }
  
  .url-text {
    font-size: 1.2rem;
  }
  
  .label {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .url-container {
    padding: 20px 15px;
  }
  
  .url-text {
    font-size: 1rem;
  }
  
  .label {
    font-size: 1.3rem;
  }
}
</style>