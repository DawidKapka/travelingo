<template>
  <div class="card"
       @touchstart="this.startDrag()"
       @touchend="this.stopDrag()"
       @touchmove="this.drag($event)"
       ref="card">
    <div class="instant-open-wrapper">
      <div class="instant-open" @click="openCard()"></div>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: 'CardComponent',
  data() {
    return {
      dragging: false,
      currentTranslation: 0,
      lastTouchY: 0
    }
  },
  mounted() {
    this.currentTranslation = window.innerHeight * .66;
    this.setCardTranslation();
  },
  methods: {
    openCard() {
      this.currentTranslation = window.innerHeight * .1;
      this.setCardTranslation();
    },
    setCardTranslation() {
      (this.$refs.card as HTMLElement).style.transform = `translateY(${this.currentTranslation}px)`
    },
    startDrag() {
      this.dragging = true;
    },
    stopDrag() {
      this.dragging = false;
      if (this.currentTranslation > window.innerHeight * .5) {
        this.currentTranslation = window.innerHeight * .66;
      } else {
        this.currentTranslation = window.innerHeight * .1;
      }
      this.lastTouchY = 0;
      this.setCardTranslation()
    },
    drag(event: TouchEvent) {
      const clientY = event.changedTouches[0].clientY;
      if (this.lastTouchY) {
        const delta = this.lastTouchY - event.changedTouches[0].clientY;
        this.currentTranslation -= delta;
        this.setCardTranslation()
      }
      this.lastTouchY = clientY;
    }
  }
})
</script>
<style lang="scss">
@import "../../theme/colors.scss";

.content {
  margin: 12px 32px 0 32px;
}

.card {
  transition: all 200ms;
  background: $color-white;
  position: absolute;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  box-shadow: 4px 0 4px 4px $color-black-025;
  border-radius: 16px 16px 0 0;
}

.instant-open-wrapper {
  width: 100%;
  display: flex;
  justify-content: space-around;
  height: 12px;
  align-items: center;
  margin-top: 6px;

  .instant-open {
    width: 32px;
    height: 2px;
    background: $color-black;
    border-radius: 2px;
  }
}
</style>
