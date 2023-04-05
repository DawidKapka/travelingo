<template>
  <div class="trip">
    <div class="header">
      <div class="location">
        <h4>{{trip.country.value}}</h4>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  props: ['trip', 'ongoing']
})
</script>
<style lang="scss">
@import '../../../theme/colors.scss';
@import '../../../theme/typography.scss';

.trip {
  width: 100%;
  height: 128px;
  border: 2px solid $color-black-025;
  border-radius: 16px;
  padding: 0 16px;
  box-shadow: 2px 2px 2px 0 $color-black-025;
}
</style>
