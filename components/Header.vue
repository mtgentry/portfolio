<!-- Please remove this file from your project -->
<template lang="pug">
  div.text {{ text }}
</template>

<script>
export default {
  data() {
    return {
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut tincidunt bibendumnior malesuada rhoncus, lectus'
    }
  }
}
</script>

<style lang="sass" scoped>
  .text
    font-size: 50px
    line-height: 66px
</style>