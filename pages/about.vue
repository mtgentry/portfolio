<template lang="pug">
v-row#main.flex-column(justify="center" align="center")
  v-col(cols="12")
    img(src="/images/mason.png" alt="Mason" class="mason-image")
    
    h4 Mason Gentry
    p Mason is the creator of Design by Numbers, a newsletter aimed at simplifying web design education for designers and developers.

    p As a senior art director, he has worked with notable clients such as Disney, Coke, Wilson, Nissan, and Gatorade. His career also spans roles at companies like 
      span.link-wrapper(@mouseover="onMouseOver(1, $event)" @mouseleave="onMouseLeave" @mousemove="onMouseMove($event)")
        a.link-area(href="#") TBWA\CHIAT\DAY
        img.hover-image(:class="{ 'visible': hover === 1 }" src="/images/chiat.gif" :style="{ top: imageTop + 'px', left: imageLeft + 'px' }")
      | , Motion Theory, BCG, Phenomenon, RPA, and Deutsch.

    p In addition to his corporate work, Mason started 
      span.link-wrapper(@mouseover="onMouseOver(2, $event)" @mouseleave="onMouseLeave" @mousemove="onMouseMove($event)")
        a.link-area(href="#") Faucet Face
        img.hover-image(:class="{ 'visible': hover === 2 }" src="/images/faucetface.jpg" :style="{ top: imageTop + 'px', left: imageLeft + 'px' }")
      | , a premium reusable water bottle company, which he later sold. The bottles were available at  
      span.link-wrapper(@mouseover="onMouseOver(5, $event)" @mouseleave="onMouseLeave" @mousemove="onMouseMove($event)")
        a.link-area(href="#") Urban Outfitters
        img.hover-image(:class="{ 'visible': hover === 5 }" src="/images/urbanoutfitters.jpg" :style="{ top: imageTop + 'px', left: imageLeft + 'px' }")
      | , Fab, Modcloth, 
      span.link-wrapper(@mouseover="onMouseOver(6, $event)" @mouseleave="onMouseLeave" @mousemove="onMouseMove($event)")
        a.link-area(href="#") Paper Source
        img.hover-image(:class="{ 'visible': hover === 6 }" src="/images/papersource.jpg" :style="{ top: imageTop + 'px', left: imageLeft + 'px' }")
      | , and more.

    p He's currently rebuilding 
      span.link-wrapper(@mouseover="onMouseOver(3, $event)" @mouseleave="onMouseLeave" @mousemove="onMouseMove($event)")
        a.link-area(href="#") Color Supply
        img.hover-image(:class="{ 'visible': hover === 3 }" src="/images/colorsupply.jpg" :style="{ top: imageTop + 'px', left: imageLeft + 'px' }")
      | , a popular color picking tool used by designers, illustrators, and developers. 
      
    p In his spare time, he's 
      span.link-wrapper(@mouseover="onMouseOver(7, $event)" @mouseleave="onMouseLeave" @mousemove="onMouseMove($event)")
        a.link-area(href="#") renovating
        img.hover-image(:class="{ 'visible': hover === 7 }" src="/images/house_before.gif" :style="{ top: imageTop + 'px', left: imageLeft + 'px' }")
      |  and 
      span.link-wrapper(@mouseover="onMouseOver(8, $event)" @mouseleave="onMouseLeave" @mousemove="onMouseMove($event)")
        a.link-area(href="#") restoring
        img.hover-image(:class="{ 'visible': hover === 8 }" src="/images/house_after.gif" :style="{ top: imageTop + 'px', left: imageLeft + 'px' }")
      |  a 1908 Craftsman. The project is definitely on schedule and expected to be completed by 2050.
</template>

<script>
export default {
  name: 'AboutPage',
  layout: 'default',
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
  padding: 2px
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