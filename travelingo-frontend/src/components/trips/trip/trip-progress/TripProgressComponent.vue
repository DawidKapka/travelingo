<template>
  <div class="progress-bar">
    <div class="bar">
      <div class="start"></div>
      <div class="progress">
        <div class="completed" :style="{width: calculateProgress() + '%'}"></div>
      </div>
      <div class="end"></div>
    </div>
  </div>
</template>
<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: 'tripProgress',
  props: ['trip'],
  methods: {
    calculateProgress(): number {
      // for test purposes
      const currentDate = /* Date.now() */ Date.parse('2023-07-22T00:00:00');
      const fullLength = Date.parse(this.trip.endDate) - Date.parse(this.trip.startDate);
      const completedLength = currentDate - Date.parse(this.trip.startDate);

      return (100 / fullLength) * completedLength;
    }
  }
})
</script>
<style lang="scss">
@import '../../../../theme/colors.scss';

  .progress-bar {
    width: 100%;

    .bar {
      display: flex;

      .start, .end {
        height: 8px;
        width: 8px;
        border-radius: 6px;
        background-color: $color-red-600;
      }

      .progress {
        width: 100%;
        height: 2px;
        background-color: $color-black-025;
        margin-top: 3px;

        .completed {
          height: 100%;
          width: 0;
          background-color: $color-red-600;
        }
      }
    }
  }
</style>
