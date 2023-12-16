import gsap from "gsap";
import "./about.css";

const t1 = gsap.timeline({ defaults: { duration: 1 } });
t1.fromTo(".about_title", { opacity: 0 }, { opacity: 1 });
t1.fromTo(".about_desc", { opacity: 0 }, { opacity: 1 });
