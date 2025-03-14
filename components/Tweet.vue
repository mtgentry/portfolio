<template lang="pug">
  div.tweet-container(:style=`{'width': width || '100%'}`)
    div.tweet-header
      img.profile-image(:src="profileImagePath" alt="Profile")
      div.user-info
        div.display-name-container
          span {{ tweetData.displayName }} 
          span.rainbow-badge(v-if="hasBadge('rainbow')")
          span(v-for="badge in textBadges" :key="badge.content") {{ badge.content }}
          span.flower-emoji(v-for="badge in emojiBadges" :key="badge.content") {{ badge.content }}
    div.tweet-content
      | {{ tweetData.content }}
    a.tweet-link(:href="tweetData.linkUrl" target="_blank") {{ tweetData.link }}
    div.tweet-actions
      div.action-item(v-if="hasLikes")
        svg.action-icon(viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2")
          path(d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z")
        span.action-count {{ formattedLikes }}
      div.action-item(v-if="hasRetweets")
        svg.action-icon(viewBox="0 0 24 24" fill="currentColor" stroke="none")
          path(d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z")
        span.action-count {{ formattedRetweets }}
</template>

<script>
export default {
  props: {
    tweetData: {
      type: Object,
      required: true
    },
    width: {
      type: String,
      default: '100%'
    },
    project_name: {
      type: String,
      default: ''
    }
  },
  computed: {
    profileImagePath() {
      if (this.tweetData.profileImage && this.tweetData.profileImage.startsWith('http')) {
        return this.tweetData.profileImage;
      }
      let domain = process.env.IS_AGENCY ? 'agency' : 'portfolio';
      return `/domains/${domain}/${this.pageType}/${this.project_name_or_work}/media/${this.tweetData.profileImage}`;
    },
    pageType() {
      if (this.project_name) {
        return 'work'
      } else if (this.$route.name) {
        return 'pages'
      }
    },
    project_name_or_work() {
      return this.project_name || this.$route.name
    },
    textBadges() {
      if (!this.tweetData.displayBadges) return [];
      return this.tweetData.displayBadges.filter(badge => badge.type === 'text');
    },
    emojiBadges() {
      if (!this.tweetData.displayBadges) return [];
      return this.tweetData.displayBadges.filter(badge => badge.type === 'emoji');
    },
    hasLikes() {
      return this.tweetData.stats && this.tweetData.stats.likes;
    },
    hasRetweets() {
      return this.tweetData.stats && this.tweetData.stats.retweets;
    },
    formattedLikes() {
      if (!this.hasLikes) return '';
      return this.formatNumber(this.tweetData.stats.likes);
    },
    formattedRetweets() {
      if (!this.hasRetweets) return '';
      return this.formatNumber(this.tweetData.stats.retweets);
    }
  },
  methods: {
    hasBadge(type) {
      if (!this.tweetData.displayBadges) return false;
      return this.tweetData.displayBadges.some(badge => badge.type === type);
    },
    formatNumber(num) {
      return new Intl.NumberFormat().format(num);
    }
  }
}
</script>

<style lang="sass" scoped>
.tweet-container
  max-width: 550px
  border-radius: 16px
  border: 1px solid #EAEAEA
  padding: 12.8px 16px
  background-color: #fff
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1)
  margin: 0 auto
  height: 100%  // Fill entire height
  display: flex  // Use flexbox
  flex-direction: column  // Stack content vertically

.tweet-header
  display: flex
  align-items: center
  margin-bottom: 9.6px
  padding-left: 2px

.profile-image
  width: 48px
  height: 48px
  border-radius: 50%
  margin-right: 12px
  background-color: #f5f5f5

.user-info
  display: flex
  flex-direction: column

.display-name-container
  display: flex
  align-items: center
  font-weight: bold
  font-size: 18px

.rainbow-badge
  display: inline-block
  width: 24px
  height: 15px
  background: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)
  border-radius: 3px
  margin: 0 4px

.flower-emoji
  margin: 0 4px

.tweet-content
  font-size: 18px
  line-height: 1.2
  margin-bottom: 10px
  text-align: left
  padding-left: 2px

.tweet-link
  color: #0077cc !important
  text-decoration: none
  font-size: 18px
  line-height: 1.2
  margin-bottom: 5px
  display: block
  word-break: break-all
  padding-left: 2px


.tweet-actions
  display: flex
  justify-content: flex-start
  gap: 24px
  padding-top: 12px
  color: #536471
  font-size: 13px
  padding-left: 2px

.action-item
  display: flex
  align-items: center
  &:nth-child(2)
    margin-left: -8px

.action-icon
  width: 22px
  height: 22px
  margin-right: 8px
  opacity: 0.6

.action-count
  color: #536471
  font-size: 15.6px

@media (max-width: 768px)
  .tweet-container
    max-width: 100%
</style>