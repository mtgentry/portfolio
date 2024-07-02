<!-- Please remove this file from your project -->
<template lang="pug">
  div.top(:style="{color: textColor}")
    div(v-html="text" )

</template>

<script>
import {mapState} from "vuex";

export default {
  props: ['text'],
  computed: {
    ...mapState(['textColor'])
  },
}
</script>

<style lang="sass" scoped>

.top

  padding-top: 130px
  padding-bottom: 130px
  max-width: 80%
  font-size: 40px
  line-height: 130%
  font-weight: 300

  @media (max-width: 768px)
    padding-top: 80px
    padding-bottom: 80px




</style>