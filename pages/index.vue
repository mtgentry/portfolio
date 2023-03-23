<template lang="pug">
  v-row(justify="center" align="center")
    v-col(cols="12")
      Header
      PortfolioGroup(:items="items1")
      PortfolioGroup(:items="items2")
      PortfolioGroup(:items="items3")
      PortfolioGroup(:items="items1")
      PortfolioGroup(:items="items2")
      PortfolioGroup(:items="items3")

</template>

<script>
import Header from '~/components/Header.vue'
import PortfolioGroup from "@/components/PortfolioGroup.vue";
export default {
  name: 'IndexPage',
  components: {
    Header,
    PortfolioGroup
  },
  data() {
    return {
      items1: [
        {
          title: 'Lorem ipsum dolor sit amet',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut tincidunt bibendumnior malesuada rhoncus, lectus',
          small: true,
        },
      ],
      items2: [
        {
          title: 'Lorem ipsum dolor sit amet',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut tincidunt bibendumnior malesuada rhoncus, lectus',
        },
        {
          title: 'Lorem ipsum dolor sit amet1',
          description: 'Lorem ipsum dolor sit amet1, consectetur adipiscing elit ut tincidunt bibendumnior malesuada rhoncus, lectus',
        },
      ],
      items3: [
        {
          title: 'Lorem ipsum dolor sit amet',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut tincidunt bibendumnior malesuada rhoncus, lectus',
          position: 'right',
        },
      ],
    }
  }
}
</script>
