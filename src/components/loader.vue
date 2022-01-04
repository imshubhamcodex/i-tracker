<template>
  <div>
    <div class="container-circle">
      <input type="checkbox" id="toggle-circle" />
      <label id="label-circle" for="toggle-circle"></label>
    </div>
    <div class="loader">
      <svg id="circle" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r="32"></circle>
      </svg>
    </div>

    <div class="loader triangle">
      <svg id="tri" viewBox="0 0 86 80">
        <polygon points="43 8 79 72 7 72"></polygon>
      </svg>
    </div>

    <div class="loader">
      <svg id="rect" viewBox="0 0 80 80">
        <rect x="8" y="8" width="64" height="64"></rect>
      </svg>
    </div>
  </div>
</template>

<script>
import gsap from "gsap";
export default {
  mounted() {
    if (this.$vuetify.theme.dark) {
      document.getElementsByTagName("circle")[0].style.stroke = "#fff";
      document.getElementsByTagName("polygon")[0].style.stroke = "#fff";
      document.getElementsByTagName("rect")[0].style.stroke = "#fff";
    } else {
      document.getElementById("label-circle").style.borderColor = "#000";
      document.getElementsByTagName("circle")[0].style.stroke = "#000";
      document.getElementsByTagName("polygon")[0].style.stroke = "#000";
      document.getElementsByTagName("rect")[0].style.stroke = "#000";
    }
    var tl = gsap.timeline();

    tl.fromTo(
      "#circle",
      { duration: 1, x: -30, opacity: 0 },
      { opacity: 1, x: 0, ease: "power1.out" },
      "+=0.5"
    );
    tl.fromTo(
      "#rect",
      { duration: 0.8, x: 50, opacity: 0 },
      { opacity: 1, x: 0, ease: "power1.out" },
      "-=0.1"
    );
    tl.fromTo(
      "#tri",
      { duration: 0.7, y: -30, opacity: 0 },
      { opacity: 1, y: 0, ease: "power1.out" }
    );

    setTimeout(() => {
      document.getElementsByTagName("circle")[0].style["stroke-dasharray"] =
        "0";
      document.getElementsByTagName("polygon")[0].style["stroke-dasharray"] =
        "0";
      document.getElementsByTagName("rect")[0].style["stroke-dasharray"] = "0";
      var tl = gsap.timeline({ onComplete: this.loadEnd });
      tl.to("#tri", { opacity: 0, y: 50, ease: "power1.out" });
      tl.to("#rect", { opacity: 0, x: -80, ease: "power1.out" }, "-=0.1");
      tl.to("#circle", { opacity: 1, x: 70, ease: "power1.out" }, "-=0.2");
    }, 3000);
  },
  methods: {
    loadEnd() {
      setTimeout(() => {
        document.getElementsByTagName("circle")[0].style.display = "none";
        document.getElementById("toggle-circle").click();
      }, 200);
      setTimeout(() => {
        this.$router.push("/test");
      }, 600);
    },
  },
  watch: {
    "$vuetify.theme.dark": function () {
      if (this.$vuetify.theme.dark) {
        document.getElementsByTagName("circle")[0].style.stroke = "#fff";
        document.getElementsByTagName("polygon")[0].style.stroke = "#fff";
        document.getElementsByTagName("rect")[0].style.stroke = "#fff";
      } else {
        document.getElementById("label-circle").style.borderColor = "#000";
        document.getElementsByTagName("circle")[0].style.stroke = "#000";
        document.getElementsByTagName("polygon")[0].style.stroke = "#000";
        document.getElementsByTagName("rect")[0].style.stroke = "#000";
      }
    },
  },
};
</script>

<style>
.loader {
  width: 44px;
  height: 44px;
  position: relative;
  display: inline-block;
  margin: 0 16px;
}

.loader svg {
  display: block;
  width: 100%;
  height: 100%;
}

rect,
polygon,
circle {
  fill: none;
  stroke: #2f3545;
  stroke-width: 10px;
  stroke-linejoin: round;
  stroke-linecap: round;
}
polygon {
  stroke-dasharray: 145 76 145 76;
  stroke-dashoffset: 0;
  animation: pathTriangle 2s linear infinite;
}
rect {
  stroke-dasharray: 192 64 192 64;
  stroke-dashoffset: 0;
  animation: pathRect 2s linear infinite;
}
circle {
  stroke-dasharray: 150 50 150 50;
  stroke-dashoffset: 75;
  animation: pathCircle 2s linear infinite;
}

@keyframes pathTriangle {
  33% {
    stroke-dashoffset: 74;
  }
  66% {
    stroke-dashoffset: 147;
  }
  100% {
    stroke-dashoffset: 221;
  }
}
@keyframes pathRect {
  25% {
    stroke-dashoffset: 64;
  }
  50% {
    stroke-dashoffset: 128;
  }
  75% {
    stroke-dashoffset: 192;
  }
  100% {
    stroke-dashoffset: 256;
  }
}
@keyframes pathCircle {
  25% {
    stroke-dashoffset: 125;
  }
  50% {
    stroke-dashoffset: 175;
  }
  75% {
    stroke-dashoffset: 225;
  }
  100% {
    stroke-dashoffset: 275;
  }
}
.container-circle {
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

input {
  display: none;
}

label[for="toggle-circle"] {
  min-width: 0px;
  min-height: 0px;
  background-color: transparent;
  font-size: 74px;
  border-radius: 50%;
  overflow: visible;
  text-align: center;
  vertical-align: center;
  border: 0px solid #fff;
  transition: border 1s, background-color 0.8s;
  transition-timing-function: ease;
  position: absolute;
  text-align: center;
  z-index: 0;
}

input:checked + label[for="toggle-circle"] {
  border-width: 200vh;
  transform: rotate(45deg);
}
</style>
