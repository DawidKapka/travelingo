<template>
  <div class="roadmap">
    <div v-bind:key="day.index" v-for="day of days" class="day-wrapper" :class="{'right': day.index % 2 === 0, 'past': isPast(day.date), 'current': isCurrent(day.date)}">
      <div class="point-wrapper wrapper-left" v-if="day.index % 2 === 0">
        <div class="point left"></div>
      </div>
      <div class="subwrapper" :class="{'subwrapper-right': day.index % 2 === 0}">
        <div class="day">
          <h5 class="day-title">Day {{day.index}}</h5>
        </div>
      </div>
      <div class="point-wrapper wrapper-right" v-if="day.index % 2 !== 0">
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
      days: [] as {index: number, date: string}[]
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
        this.days.push({index, date: startDate.toISOString().substring(0, 10)});
        index++;
        startDate.setDate(startDate.getDate() + 1);
      }
    },
    isPast(date: string): boolean {
      // for test purposes
      //const currentDate = Date.now()
      const currentDate = Date.parse('2023-07-15T00:00:00');
      const dayDate = Date.parse(`${date}T00:00:00`)
      return dayDate < currentDate
    },
    isCurrent(date: string): boolean {
      const currentDate = new Date(Date.now()).toISOString().substring(0, 10);
      //return date === currentDate;
      //for test purposes
      return date === '2023-07-15'
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

.current .day {
  background-color: $color-red-600;
  border: $color-red-600;

  .day-title {
    color: $color-white;
    opacity: 1;
  }
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
  outline: 2px solid $color-black-025;
  border-radius: 16px;
}

.past .point {
  outline: none;
  background-color: $color-success;
}

.current .point {
  outline: 2px solid $color-success;
}

.day-wrapper:not(:first-child) {
  .point::before {
    content: '';
    display: flex;
    width: 7px;
    height: 112px;
    border-right: 2px dashed $color-black-025;
    transform: translateY(-112px);
  }
}

.past:not(:first-child), .current:not(:first-child) {
  .point::before {
    border-color: $color-success;
  }
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
