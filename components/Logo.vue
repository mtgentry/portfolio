<!-- Please remove this file from your project -->
<template>
  <div>

<svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 0H6.33663V7.68056H13.5644V0H20V21H13.5644V13.0278H10.495H6.33663V21H0V0Z" fill="white"/>
</svg>
    
  </div>


</template>

<script>
export default {
  name: 'Logo',
  props: {
    color: {
      type: String,
      default: '#FFFFFF'
    }
  },
  computed: {
    is_agency() {
      return process.env.IS_AGENCY
    }
  }
}
</script>

<style scoped lang="sass">
path
  transition: fill 1s ease-in-out
</style>
