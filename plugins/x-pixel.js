// X (Twitter) ads pixel. Loads X's tracking script on every portfolio page so
// X Ads can count visits and attribute /founders signups to the ads that
// drove them. Both IDs come from X Ads Manager > Tools > Events Manager.
// Until X_PIXEL_ID is filled in, nothing loads.
const X_PIXEL_ID = 'ofnyg'    // base pixel ID
const X_SIGNUP_EVENT_ID = 'tw-ofnyg-rgide'  // "Founders sign up" Lead event

export default (context, inject) => {
  // Production builds only, so local dev visits don't count as ad traffic
  const enabled = X_PIXEL_ID && !process.env.IS_AGENCY && process.env.NODE_ENV === 'production'

  if (enabled) {
    // X's standard base code: queues calls until uwt.js has loaded
    !function (e, t, n, s, u, a) {
      e.twq || (s = e.twq = function () {
        s.exe ? s.exe.apply(s, arguments) : s.queue.push(arguments)
      }, s.version = '1.1', s.queue = [], u = t.createElement(n), u.async = !0,
      u.src = 'https://static.ads-twitter.com/uwt.js',
      a = t.getElementsByTagName(n)[0], a.parentNode.insertBefore(u, a))
    }(window, document, 'script')
    window.twq('config', X_PIXEL_ID)
  }

  // Called after a successful /founders signup
  inject('trackSignup', () => {
    if (enabled && X_SIGNUP_EVENT_ID) {
      window.twq('event', X_SIGNUP_EVENT_ID, {})
    }
  })
}
