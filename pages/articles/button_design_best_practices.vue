<template >
  <ArticleBase v-slot>
      <div>
        <h1>Button Design Best Practices</h1>
        <p>It can be tricky figuring out when to use certain buttons and where to put them on the page. I still get it wrong occasionally.</p>

<p>Here are some high-level tips to help you navigate the process.</p>

<h2>Button Heirarchy</h2>


<p>Put your most important button first. This is our primary button (also called a CTA, or call-to-action) and you only have one of these. This is the thing we really want people to click.</p>

<p>Next is your secondary button which is a medium priority link. This is for things you want to highlight, that aren’t as important as the primary button's destination.</p>
<p>Lastly we have tertiary buttons which are for low priority links.</p>
<p>The button hierarchy looks likes this, from most important to least important:</p>

<img :src="`/images/buttons_1.jpg`" />

<p>As user of the web, you probably already know this intuitively. Below is an example from One Medical. On this homepage the designer uses three buttons to present three possible user paths. In order of importance they are:</p>

<p><b>"Sign up today"</b>: High priority</p>
<p><b>"Gift a membership"</b>: Medium priority</p>
<p><b>"Sponsored membership"</b>: Low priority</p>

<img :src="`/images/one_medical_design.jpg`" />

<p>If you only have one user path you can have one button. Or if you want a primary and tertiary button (but not a secondary), thats fine too. The main thing to keep in mind is to be respectful of the users time and not present them with too many options.</p>

<h2>Button Location on the Page</h2>
<p>Buttons can be positioned on the page in these three ways:</p>

<p><b>Left-aligned</b></p>
<p><b>Right-aligned</b></p>
<p><b>Full-span</b></p>

<p>The one you choose depends on where the user is and where they’re going. I like to think of it like a flashlight. You point the light in the direction you want the user to go.</p>

<h3>Left-aligned</h3>

<p>As a general rule, marketing pages, and in-page forms will have left-aligned buttons. On this form below, the user’s eye is moving down the page. From one field to the next. So the designer put a primary button where their attention is was already headed (flashlight pointed down), along the left edge of the form fields.</p>

<h3>Right-aligned</h3>

<p>If a user is going through a set of steps like in an onboarding process, then a primary button works well on the right. In this example their attention is moving forward through a multi-step process, from left-to-right. (for languages that read right-to-left this might be reversed.</p>

<p>In this example our flashlight would be pointed toward the right.</p>

<p>Modals, notifications, tutorials, and progressive disclosure forms usually have right-aligned primary buttons. Clicking “Accept” on a cookie notification allows the user to continue their forward progress of using on the site, so the primary button is on the right.</p>

<img :src="`/images/buttons_onboarding.jpg`" />

<img :src="`/images/buttons_cookie.jpg`" />


<h3>Full-span</h3>
<p>Full-span buttons are nice when you want to emphasize a single action. If your layout uses cards, full-span buttons work well. In this example the users attention isn't flowing in one direction, rather it bounces from card to card in short bursts.</p>

<p>My flashlight metaphor starts to fail here. Maybe it’s flashing on each card or something.</p>

<img :src="`/images/buttons_plan.jpg`" />

<p>One interesting thing to note: see how these are all secondary buttons? If the designer used all primary CTA's it would violate our hierarchy rule of only having one primary button. And it’s less visually heavy this way.</p>



      </div>
  </ArticleBase>
</template>