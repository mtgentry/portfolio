<template>
  <div>
    <!-- Empty div as we're just handling redirects -->
  </div>
</template>

<script>
export default {
  name: 'HomepageRedirect',
  mounted() {
    // Only run on client-side
    if (process.client) {
      const now = new Date().getTime();
      const twoHoursInMillis = 2 * 60 * 60 * 1000;
      const lastSessionTimestamp = localStorage.getItem("lastSessionTimestamp");

      if (!lastSessionTimestamp || now - lastSessionTimestamp > twoHoursInMillis) {
        localStorage.setItem("lastSessionTimestamp", now);
        window.location.href = "https://trello.com/b/apWjOXh0/personal";
      } else {
        window.location.href = "https://www.google.com";
      }
    }
  },
  head() {
    return {
      title: 'Custom Start Page'
    }
  }
}
</script>