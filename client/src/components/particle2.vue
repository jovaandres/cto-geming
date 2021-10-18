<template>
  <div class="particles">
    <div id="particles-js"></div>
  </div>
</template>

<script>
import "particles.js";
export default {
  name: "particles2",
  mounted() {
    this.initParticles();
  },
  methods: {
    initParticles() {
      window.particlesJS("particles-js", {
        particles: {
          number: {
            value: 200,
            density: {
              enable: true,
              value_area: 400
            }
          },
          color: {
            value: ["#860382", "#c218b2", "#f132df", "#f572e2", "#ffe4f2"]
          },
          shape: {
            type: ["circle", "triangle", "polygon"],
            stroke: {
              width: 0,
              color: "#000"
            },
            polygon: {
              nb_sides: 5
            }
          },
          opacity: {
            value: 0.5,
            random: false,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: false,
              speed: 40,
              size_min: 0.1,
              sync: false
            }
          },
          line_linked: {
            enable: false
          },
          move: {
            enable: true,
            speed: 10,
            direction: "left",
            out_mode: "out",
            straight: false
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "grab"
            },
            onclick: {
              enable: true,
              mode: "push"
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 140,
              line_linked: {
                opacity: 1
              }
            },
            bubble: {
              distance: 200,
              size: 20,
              duration: 1,
              speed: 3
            },
            repulse: {
              distance: 200,
              duration: 0.4
            },
            push: {
              particles_nb: 10
            },
            remove: {
              particles_nb: 2
            }
          }
        },
        retina_detect: true
      });
    }
  }
};
</script>

<style scoped>
#particles-js {
  position: fixed;
  background: transparent;
  height: 100%;
  width: 100%;
  right: 0;
  top: 0;
}
</style>
