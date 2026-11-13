<template lang="pug">
  //- Styled to read like an X embed. Optional field: handle ("css", no @)
  div.tweet-container(:style=`{'width': width || '100%'}`)
    div.tweet-header
      img.profile-image(:src="profileImagePath" alt="")
      div.user-info
        div.display-name-container
          span.display-name {{ tweetData.displayName }}
          span.rainbow-badge(v-if="hasBadge('rainbow')")
          span(v-for="badge in textBadges" :key="badge.content") {{ badge.content }}
          span.flower-emoji(v-for="badge in emojiBadges" :key="badge.content") {{ badge.content }}
        div.handle(v-if="tweetData.handle") @{{ tweetData.handle }}
    div.tweet-content
      span {{ tweetData.content }}
      | {{ ' ' }}
      a.tweet-link(v-if="tweetData.link" :href="tweetData.linkUrl" target="_blank" rel="noopener") {{ tweetData.link }}
    div.tweet-actions
      div.action-item.likes(v-if="hasLikes")
        svg.action-icon(viewBox="0 0 24 24")
          path(d="M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z")
        span.action-count {{ formattedLikes }}
      div.action-item(v-if="hasRetweets")
        svg.action-icon(viewBox="0 0 24 24")
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
    // X rounds counts down: 14,900 -> "14.9K", 7,489 -> "7.4K"
    formatNumber(num) {
      if (num < 1000) return String(num)
      const units = num >= 1e6 ? [1e6, 'M'] : [1e3, 'K']
      const value = Math.floor(num / units[0] * 10) / 10
      return `${value}${units[1]}`
    }
  }
}
</script>

<style lang="sass" scoped>
// Matches X's embed: system font, #0f1419 text, #cfd9de border, 12px radius
$x-text: #0f1419
$x-grey: #536471
$x-border: #cfd9de
$x-blue: #1d9bf0

.tweet-container
  max-width: 550px
  border-radius: 12px
  border: 1px solid $x-border
  padding: 12px 16px
  background-color: #fff
  margin: 0 auto
  height: 100%
  display: flex
  flex-direction: column
  color: $x-text
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif
  text-align: left

.tweet-header
  display: flex
  align-items: center
  margin-bottom: 12px

.profile-image
  width: 48px
  height: 48px
  border-radius: 50%
  margin-right: 8px
  object-fit: cover
  background-color: #f5f5f5
  flex-shrink: 0

.user-info
  display: flex
  flex-direction: column
  min-width: 0
  flex: 1
  line-height: 20px

.display-name-container
  display: flex
  align-items: center
  font-weight: 700
  font-size: 15px
  min-width: 0

.display-name
  overflow: hidden
  text-overflow: ellipsis
  white-space: nowrap

.handle
  color: $x-grey
  font-size: 15px

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
  font-size: 17px
  line-height: 24px
  margin-bottom: 12px
  word-wrap: break-word

.tweet-link
  color: $x-blue !important
  text-decoration: none
  // Wrap the whole URL to the next line rather than splitting it mid-word
  white-space: nowrap
  &:hover
    text-decoration: underline

// Pinned to the bottom so cards in a row line up
.tweet-actions
  display: flex
  gap: 20px
  margin-top: auto
  padding-top: 12px
  border-top: 1px solid #eff3f4
  color: $x-grey

.action-item
  display: flex
  align-items: center
  &.likes .action-icon
    fill: #f91880

.action-icon
  width: 20px
  height: 20px
  margin-right: 4px
  fill: $x-grey

.action-count
  font-size: 14px
  font-weight: 700
  color: $x-grey

@media (max-width: 768px)
  .tweet-container
    max-width: 100%
</style>
