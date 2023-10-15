<template lang="pug">
  v-row#bookCall
    v-col.d-flex.align-center.justify-center(cols="12")
      h1 Get Your CRO Audit Today and Boost Your Conversions
    v-col.d-flex.align-center.justify-center(cols="12")
      a(href="https://calendly.com/hoopladesign/30min" target="_blank")
        v-btn#bookBtn(rounded) Book a Call
</template>
<script>
export default {

}
</script>

<style lang="sass" scoped>
#bookCall
  padding: 200px 0

#bookBtn
  width: 204px
  height: 60px
  font-size: 23px
  font-style: normal
  font-weight: 400
  background-color: #2805FF
  text-transform: none
  letter-spacing: unset
</style>