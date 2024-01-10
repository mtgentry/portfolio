<!-- Please remove this file from your project -->
<template lang="pug">
  v-row
    v-col(:class="`text-${button.align || 'left'}`")
      v-btn#button(:href="button.link" :class="{smaller: button.smaller}" :target="button.target || '_self'")
        | {{ button.text }}
        v-icon(v-if="button.icon") {{ button.icon }}
</template>

<script>
export default {
  props: ['button'],
}
</script>

<style lang="sass" scoped>
#button
  background-color: #2805FF
  color: white
  border-radius: 30px
  height: 50px
  width: 270px
  font-weight: 400
  font-size: 23px
  line-height: 30px
  text-transform: capitalize
  letter-spacing: unset
  padding-top: 7px
  padding-bottom: 8px
  padding-right: 20px
  padding-left: 26px

.smaller
  font-family: Resist Sans
  font-size: 15px!important
  font-weight: 300!important
  letter-spacing: 0.75px!important

.v-icon
  font-size: 17px!important
  padding-left:5px
  align-items: center

 

</style>
