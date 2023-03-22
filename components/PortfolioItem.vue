<!-- Please remove this file from your project -->
<template lang="pug">
  div.item
    img(:src="item?.src || placeholder" :class="item.small ? 'small' : 'large'")
    div.title {{ item.title }}
    div.description {{ item.description }}

</template>

<script>
export default {
  props: ['item'],
  data() {
    return {
      placeholder: '/images/placeholder.jpg'
    }
  }
}
</script>

<style lang="sass" scoped>

img
  &.large
    width: 100%
  &.small
    width: 60%

.title
  font-weight: 500
  font-size: 19px
  line-height: 25px

.description
  font-size: 16px
  line-height: 21px
</style>