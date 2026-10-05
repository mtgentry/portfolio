import AOS from "aos";
// aos.css is loaded globally in nuxt.config.js so server-rendered pages
// start with animated sections hidden instead of blinking when JS loads

export default ({ app }, inject) => {
  app.AOS = new AOS.init({
    duration: 1000,
    easing: 'ease-in-out-cubic',
    once: true,
    offset: 200,
    anchorPlacement: 'bottom-bottom',
  }); // or any other options you need
  inject("AOS", AOS);
};
