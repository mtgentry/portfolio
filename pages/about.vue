<template lang="pug">
v-row#main.flex-column(justify="center" align="center")
  v-col(cols="12")
    img(src="/images/mason.png" alt="Mason" class="mason-image")
    
    p Hi, I'm Mason.

    p Over the years, I've worked with brands like Disney, Coke, Wilson, Nissan, and Gatorade, and spent time at agencies including 
      span.link-wrapper(@mouseover="onMouseOver(1, $event)" @mouseleave="onMouseLeave" @mousemove="onMouseMove($event)")
        a.link-area(@click.prevent) TBWA\CHIAT\DAY
        img.hover-image(:class="{ 'visible': hover === 1 }" src="/images/chiat.gif" :style="{ top: imageTop + 'px', left: imageLeft + 'px' }")
      | , Motion Theory, Boston Consulting Group, Phenomenon, RPA, and Deutsch.

    p I also founded 
      span.link-wrapper(@mouseover="onMouseOver(2, $event)" @mouseleave="onMouseLeave" @mousemove="onMouseMove($event)")
        a.link-area(@click.prevent) Faucet Face
        img.hover-image(:class="{ 'visible': hover === 2 }" src="/images/faucetface.jpg" :style="{ top: imageTop + 'px', left: imageLeft + 'px' }")
      | , a premium reusable water bottle company that made its way into Paper Source, Fab, Modcloth, 
      span.link-wrapper(@mouseover="onMouseOver(5, $event)" @mouseleave="onMouseLeave" @mousemove="onMouseMove($event)")
        a.link-area(@click.prevent) Urban Outfitters
        img.hover-image(:class="{ 'visible': hover === 5 }" src="/images/urbanoutfitters.jpg" :style="{ top: imageTop + 'px', left: imageLeft + 'px' }")
      | , and more before I sold it.

    p These days, I'm rebuilding 
      span.link-wrapper(@mouseover="onMouseOver(3, $event)" @mouseleave="onMouseLeave" @mousemove="onMouseMove($event)")
        a.link-area(@click.prevent) Color Supply
        img.hover-image(:class="{ 'visible': hover === 3 }" src="/images/colorsupply.jpg" :style="{ top: imageTop + 'px', left: imageLeft + 'px' }")
      | , a color-picking tool used by designers, illustrators, and developers all over the world. I also publish Design by Numbers, a newsletter with over 9,000 subscribers that makes web design feel a lot less overwhelming for designers and developers.
      
    p In my spare time, I'm 
      span.link-wrapper(@mouseover="onMouseOver(7, $event)" @mouseleave="onMouseLeave" @mousemove="onMouseMove($event)")
        a.link-area(@click.prevent) renovating
        img.hover-image(:class="{ 'visible': hover === 7 }" src="/images/house_before.gif" :style="{ top: imageTop + 'px', left: imageLeft + 'px' }")
      |  and 
      span.link-wrapper(@mouseover="onMouseOver(8, $event)" @mouseleave="onMouseLeave" @mousemove="onMouseMove($event)")
        a.link-area(@click.prevent) restoring
        img.hover-image(:class="{ 'visible': hover === 8 }" src="/images/house_after.gif" :style="{ top: imageTop + 'px', left: imageLeft + 'px' }")
      |  a 1908 Craftsman. The project is definitely on schedule and expected to be completed by 2050.
</template>

<script>
export default {
  name: 'AboutPage',
  layout: 'default',
  mounted() {
    // Set the same background color as homepage
    this.$store.commit('updateState', {field: 'backgroundColor', value: '#282725'})
    this.$store.commit('updateState', {field: 'textColor', value: '#FFFFFF'})
  },
  head() {
    return {
      title: 'About'
    }
  },
  data() {
    return {
      hover: null,
      imageTop: 0,
      imageLeft: 0
    }
  },
  methods: {
    onMouseOver(id, event) {
      this.hover = id
      this.updateImagePosition(event)
    },
    onMouseLeave() {
      this.hover = null
    },
    onMouseMove(event) {
      this.updateImagePosition(event)
    },
    updateImagePosition(event) {
      const rect = event.currentTarget.getBoundingClientRect()
      const offset = 20
      const imageWidth = 300
      const imageHeight = 300
      const spaceBelow = window.innerHeight - rect.bottom

      if (spaceBelow < imageHeight + offset) {
        this.imageTop = event.clientY - rect.top - imageHeight - offset
      } else {
        this.imageTop = event.clientY - rect.top + offset
      }

      this.imageLeft = event.clientX - rect.left - (imageWidth / 2)
    }
  }
}
</script>

<style lang="sass" scoped>
#main
  padding: 80px 0 100px 0
  color: #FFFFFF
  .col
    max-width: 700px

a.link-area
  font-weight: 300 !important
  color: #FFFFFF
  margin: 0
  padding: 2px
  line-height: 1
  display: inline-block
  text-decoration: none

.link-wrapper
  font-weight: 700
  position: relative
  display: inline-block
  margin: 0
  padding: 2px 3px 5px 3px
  line-height: 1
  background-color: #2805FF

img.hover-image
  width: 300px
  height: 300px
  border: 3px solid #2805FF
  position: absolute
  z-index: 999
  opacity: 0
  transition: opacity .2s ease-in-out
  pointer-events: none
  object-fit: cover

img.visible
  opacity: 1

.mason-image
  width: 300px
  height: 300px
  display: block
  margin: 0 auto 50px
  border-radius: 150px
  object-fit: cover

p
  margin-bottom: 24px
  line-height: 1.7
  color: #FFFFFF
</style>