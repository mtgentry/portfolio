<template >
  <ArticleBase v-slot>
      <div>
        <h1>Only be creative with One Big Thing</h1>
      

        <p>When I design a website, I try to focus my visual design efforts on One Big Thing.
Some possible Big Things include:</p>

<ul>
      <li v-for="item in items" :key="item.id">{{ item.text }}</li>
    </ul>


<p>Once you pick your One Big Thing, the other elements in your site should become subservient to it. They kind of orbit around it.</p>


<img :src="`/images/one_big_thing.jpg`" />
<p class="caption">A caption.</p>
<p>Some examples:</p>
<a :href="link1" target="_blank">SuperHiPlus</a>
<p>Their One Big Thing is animation, so they used a monochromatic color palette (supporting element)</p>



<p>
Advanced designers may bend the rules a bit. Here’s a site that uses 95% photos and 5% illustrations. The clam and seashell illustrations are textural elements that support the sites concept. It looks good! But I recommend that beginner designers keep it simple and only use illustrations or only photos.</p>




      </div>
  </ArticleBase>
</template>


<script>
export default {
  data() {
    return {
      link1: 'https://superhi.plus/?utm_source=designbynumbers.beehiiv.com&utm_medium=newsletter&utm_campaign=only-be-creative-with-one-big-thing',
      link2: 'https://www.example2.com'
    };
  }
}
</script>


<script>
export default {
  data() {
    return {
      items: [
        { id: 1, text: 'Interactivity' },
        { id: 2, text: 'Storytelling' },
        { id: 3, text: 'Art Direction' },
        { id: 3, text: '3D' },
        { id: 3, text: 'Video' },
        { id: 3, text: 'Color' },
         { id: 3, text: 'Animation' },
      ],
    };
  },
};
</script>


