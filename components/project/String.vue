<!-- Please remove this file from your project -->
<template lang="pug">
  div
    h1.font-weight-bold(v-if="string.size === 'h1'" v-html="string.title")
    h2.font-weight-bold(v-else-if="string.size === 'h2'" v-html="string.title")
    h3.font-weight-bold(v-else-if="string.size === 'h3'" v-html="string.title")
    h4.font-weight-bold(v-else-if="string.size === 'h4'" v-html="string.title")
    h5.font-weight-bold(v-else-if="string.size === 'h5'" v-html="string.title")
    h6.font-weight-bold(v-else-if="string.size === 'h6'" v-html="string.title")
    p(v-html="string.text")

</template>

<script>
export default {
  props: ['string'],
}
</script>
