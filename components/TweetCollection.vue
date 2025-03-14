<template lang="pug">
  div.wrapper
    // Tweets container with blue border that only holds tweet items.
    div.tweets-container(:style="{'justify-content': position || ''}")
      div.tweets-flex-container
        // Render tweet items with unique keys.
        div.tweet-wrapper(
          v-for="(tweet, index) in visibleTweets" 
          :key="`tweet-${index}`"
          :class="{ 'fade-in': index >= previousDisplayCount }"
        )
          Tweet(:tweet-data="tweet" :project_name="project_name")
    // Load More button always visible, placed immediately after the tweets container.
    button.load-more(:class="{ loading: isLoading }" @click="loadMore")
      | Load More
</template>

<script>
import Tweet from './Tweet.vue'

export default {
  name: "TweetCollection",
  components: {
    Tweet
  },
  props: {
    tweets: {
      type: Array,
      required: true
    },
    columns: {
      type: Object,
      default: () => ({ default: 3, tablet: 2, mobile: 1 })
    },
    position: {
      type: String,
      default: 'center'
    },
    project_name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      displayCount: 6,
      previousDisplayCount: 0,
      isLoading: false
    }
  },
  computed: {
    visibleTweets() {
      return this.tweets.slice(0, this.displayCount);
    }
  },
  methods: {
    loadMore() {
      this.isLoading = true;
      this.previousDisplayCount = this.displayCount;
      setTimeout(() => {
        this.displayCount += 6;
        this.isLoading = false;
      }, 100);
    }
  }
}
</script>

<style lang="sass" scoped>
.wrapper
  width: 100%
  display: flex
  flex-direction: column
  align-items: center

.tweets-container
  width: 100%
  display: flex
  flex-direction: column
  align-items: center
  padding: 20px 0

.tweets-flex-container
  display: flex
  flex-wrap: wrap
  gap: 30px 20px  // Reduced from 50px to 30px for vertical gap
  width: 100%
  max-width: 1200px

.tweet-wrapper
  margin: 0
  // Calculate width based on columns with gap consideration
  width: calc((100% - (20px * (3 - 1))) / 3)  // For 3 columns default
  
@media (max-width: 992px)
  .tweet-wrapper
    width: calc((100% - 20px) / 2)  // For 2 columns on tablet

@media (max-width: 768px)
  .tweet-wrapper
    width: 100%  // Full width on mobile

.load-more
  margin-top: 10px
  padding: 10px 20px
  font-size: 16px
  cursor: pointer
  border: 1px solid black
  background-color: transparent
  transition: opacity 0.3s ease

.load-more.loading
  opacity: 0.5

// Fade-in animation for newly loaded tweets - only opacity change
.fade-in
  animation: fadeIn 0.8s ease-in forwards
  
@keyframes fadeIn
  from
    opacity: 0
  to
    opacity: 1
</style>