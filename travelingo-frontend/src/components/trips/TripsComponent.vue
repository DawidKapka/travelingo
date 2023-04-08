<template>
  <h3 class="title">My Trips</h3>
  <div class="current" v-if="hasCurrentTrip()">
    <p class="subtitle">Current</p>
    <tr-trip :trip="this.currentTrip" :status="tripStatus.ONGOING"></tr-trip>
  </div>
  <div class="upcoming" v-if="hasUpcomingTrips()">
    <p class="subtitle">Upcoming</p>
    <tr-trip v-bind:key="trip.startDate" v-for="trip of this.upcomingTrips" :trip="trip" :status="tripStatus.UPCOMING"></tr-trip>
  </div>
  <div class="past" v-if="hasPastTrips()">
    <p class="subtitle">Past</p>
    <tr-trip v-bind:key="trip.startDate" v-for="trip of this.pastTrips" :trip="trip" :status="tripStatus.PAST"></tr-trip>
  </div>

</template>
<script lang="ts">
import { Trip, TripStatus } from "@/types/Trip";
import {defineComponent} from "vue";
import TripComponent from "@/components/trips/trip/TripComponent.vue";


export default defineComponent({
  components: {
    trTrip: TripComponent
  },
  data() {
    return {
      trips: [] as Trip[],
      currentTrip: undefined as Trip | undefined,
      pastTrips: [] as Trip[],
      upcomingTrips: [] as Trip[],
      tripStatus: TripStatus
    }
  },
  mounted() {
    this.$store.dispatch('fetchTrips').then((trips: Trip[]) => {
      this.trips = trips;
      if (trips.length > 0) {
        this.selectCurrentTrip()
        this.selectPastTrips()
        this.selectUpcomingTrips()
      }
    })
  },
  methods: {
    selectCurrentTrip(): void {
      this.trips.forEach(trip => {
        const startDate = Date.parse(trip.startDate.toString());
        const endDate = Date.parse(trip.endDate.toString());
        // for test purposes
        const currentDate = /* Date.now() */ Date.parse('2023-07-22T00:00:00');
        if (currentDate >= startDate && currentDate < endDate) {
          this.$store.dispatch('setCurrentTrip', trip);
          this.currentTrip = trip;
        }
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
      this.$store.dispatch('setPastTrips', this.pastTrips);
    },
    selectUpcomingTrips(): void {
      this.trips.forEach(trip => {
        const startDate = Date.parse(trip.startDate.toString());
        // for test purposes
        const currentDate = /* Date.now() */ Date.parse('2023-07-22T00:00:00');
        if (startDate > currentDate) {
          this.upcomingTrips.push(trip)
        }
      })
      this.$store.dispatch('setPastTrips', this.upcomingTrips);
    },
    hasCurrentTrip(): boolean {
      return !!this.currentTrip
    },
    hasPastTrips(): boolean {
      return this.pastTrips.length > 0;
    },
    hasUpcomingTrips(): boolean {
      return this.upcomingTrips.length > 0;
    }
  }
})
</script>
<style lang="scss">
@import '../../theme/colors.scss';
@import '../../theme/typography.scss';

  .title {
    @include header-5-dark;
  }

.subtitle {
  @include subtitle-dark;
  margin: 10px 0 0 5px;
  width: 100%;
  text-align: center;
}
</style>
