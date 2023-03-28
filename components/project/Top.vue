<!-- Please remove this file from your project -->
<template lang="pug">
  div(:style="{color: textColor}") {{ text }}

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

div
  padding: 130px 163px

</style>