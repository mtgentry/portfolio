import AOS from "aos";
import "aos/dist/aos.css";

export default ({ app }) => {
  app.AOS = new AOS.init({
    disable: window.innerWidth < 640,
    duration: 1000,
    easing: 'ease-in-out-cubic',
    once: true,
    offset: 300,
  }); // or any other options you need
};