<template>
  <h3 class="title">My Trips</h3>
  <div class="current" v-if="hasCurrentTrip()">
    <p class="subtitle">Current</p>
    <tr-trip :trip="this.currentTrip" :ongoing="true"></tr-trip>
  </div>
  <div class="past" v-if="hasPastTrips()">
    <p class="subtitle">Past</p>
    <tr-trip v-bind:key="trip.startDate" v-for="trip of this.pastTrips" :trip="trip" :ongoing="false"></tr-trip>
  </div>
</template>
<script lang="ts">
import { Trip } from "@/types/Trip";
import {defineComponent} from "vue";

import trips from '../../../tests/testfiles/trips.json';
import TripComponent from "@/components/trips/trip/TripComponent.vue";

export default defineComponent({
  components: {
    trTrip: TripComponent
  },
  data() {
    return {
      trips: [] as Trip[],
      currentTrip: undefined as Trip | undefined,
      pastTrips: [] as Trip[]
    }
  },
  mounted() {
    this.trips = trips as unknown as Trip[];
    this.selectCurrentTrip()
    this.selectPastTrips()
  },
  methods: {
    selectCurrentTrip(): void {
      this.trips.forEach(trip => {
        const startDate = Date.parse(trip.startDate.toString());
        const endDate = Date.parse(trip.endDate.toString());
        // for test purposes
        const currentDate = /* Date.now() */ Date.parse('2023-07-22T00:00:00');
        if (currentDate >= startDate && currentDate < endDate) {
          this.currentTrip = trip;
          console.log(this.currentTrip)        }
      })
    },
    selectPastTrips(): void {
      this.trips.forEach(trip => {
        const endDate = Date.parse(trip.endDate.toString());
        // for test purposes
        const currentDate = /* Date.now() */ Date.parse('2023-07-22T00:00:00');
        if (currentDate >= endDate) {
          this.pastTrips.push(trip)
        }
      })
    },
    hasCurrentTrip(): boolean {
      return !!this.currentTrip
    },
    hasPastTrips(): boolean {
      return true;
    }
  }
})
</script>
<style lang="scss">
@import '../../theme/colors.scss';
@import '../../theme/typography.scss';

  .title {
    @include header-3-dark;
  }

.subtitle {
  @include subtitle-dark;
  margin: 10px 0 0 5px;
  width: 100%;
  text-align: center;
}
</style>
