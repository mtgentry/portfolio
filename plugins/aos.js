import AOS from "aos";
import "aos/dist/aos.css";

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
