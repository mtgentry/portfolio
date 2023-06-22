<template>
  <div class="cta">
    <nuxt-link to="/plans">
      <button class="plan">See Plans</button>
    </nuxt-link>
    <nuxt-link to="/work">
      <button class="work">View Work</button>
    </nuxt-link>
  </div>
</template>

<style scoped>
.cta {
  min-height: 200px;
}
.plan {
  width: 150px;
  max-width: 100%;
  height: 44px;
  background: #2805FF;
  color: white;
  font-size: 17px;
  border: none;
  border-radius: 22px;
  text-align: center;
  align-self: center;
  padding-bottom:1px;
}

.work {
  width: 150px;
  max-width: 100%;
  height: 44px;
  padding-bottom:1px;
  color: white;
  font-size: 17px;
  border-radius: 22px;
  border: 1px solid #fff;
  margin-left: 10px;
}
</style>
