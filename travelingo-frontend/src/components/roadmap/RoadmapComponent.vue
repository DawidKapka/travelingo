<template>
  <div class="roadmap">
    <div v-bind:key="day" v-for="day of days" class="day-wrapper" :class="{'right': day % 2 === 0}">
      <div class="point-wrapper wrapper-left" v-if="day % 2 === 0">
        <div class="point left"></div>
      </div>
      <div class="subwrapper" :class="{'subwrapper-right': day % 2 === 0}">
        <div class="day">
          <h5 class="day-title">Day {{day}}</h5>
        </div>
      </div>
      <div class="point-wrapper wrapper-right" v-if="day % 2 !== 0">
        <div class="point right"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "RoadmapComponent",
  components: {},
  data() {
    return {
      trip: this.$store.getters.currentTrip,
      days: [] as number[]
    };
  },
  mounted() {
    this.calculateDays();
  },
  methods: {
    calculateDays() {
      const startDate = new Date(Date.parse(this.trip.startDate));
      const endDate = new Date(Date.parse(this.trip.endDate))
      let index = 1;
      while (startDate.getDate() >= endDate.getDate()) {
        this.days.push(index);
        index++;
        startDate.setDate(startDate.getDate() + 1);
      }
      console.log(this.days);
    }
  },
});
</script>
<style lang="scss">
@import '../../theme/colors.scss';
@import '../../theme/typography.scss';

.roadmap, .visual {
  overflow: scroll;
  max-height: calc(100% - 81px);
  height: calc(100% - 81px);
  width: 100%;
  padding: 0 64px;
}

.day-wrapper {
  display: flex;
  width: 100%;
}

.right {
  justify-content: end;
}

.day {
  height: 96px;
  width: 96px;
  border: 2px solid $color-black-025;
  border-radius: 16px;
  box-shadow: 4px 4px 4px $color-black-025;
  margin: 16px 0;

  .day-title {
    @include header-5-dark;
    line-height: 96px;
    margin-top: -1px;
    text-align: center;
    opacity: .25;
  }
}

.subwrapper {
  width: 50%;
  display: flex;
}

.subwrapper-right {
  justify-content: end;
}

.point {
  height: 16px;
  width: 16px;
  background-color: $color-red-600;
  border-radius: 16px;
}

.point-wrapper {
  margin-top: 56px;
}

.wrapper-left {
  transform: translateX(8px);
}

.wrapper-right {
  transform: translateX(-8px);
}

.right {
}

.left {
}
</style>
