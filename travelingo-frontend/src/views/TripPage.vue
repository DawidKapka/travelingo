<template>
  <tr-header>
    <h1 class="country">{{trip ? country[trip.country] : ''}}</h1>
  </tr-header>
  <div class="trip-roadmap" v-if="trip">
    <div class="dates">
      <p class="date">{{parseDate(trip.startDate)}} - {{parseDate(trip.endDate)}}</p>
    </div>
    <tr-roadmap></tr-roadmap>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import {Trip} from "@/types/Trip";
import HeaderComponent from "@/components/header/HeaderComponent.vue";
import {Country} from "@/types/Country";
import RoadmapComponent from "@/components/roadmap/RoadmapComponent.vue";

export default defineComponent({
  name: "TripPage",
  components: {
    trHeader: HeaderComponent,
    trRoadmap: RoadmapComponent
  },
  data() {
    return {
      country: Country,
      trip: undefined as Trip | undefined
    }
  },
  async mounted() {
    if (this.$route.query.id === 'current') {
      if (this.$store.getters.trips.length === 0) {
        await this.$store.dispatch('fetchTrips')
        this.selectCurrentTrip(this.$store.getters.trips)
      } else {
        this.trip = this.$store.getters.currentTrip;
      }
    }
  },
  methods: {
    selectCurrentTrip(trips: Trip[]): void {
      trips.forEach(trip => {
        const startDate = Date.parse(trip.startDate.toString());
        const endDate = Date.parse(trip.endDate.toString());
        // for test purposes
        const currentDate = /* Date.now() */ Date.parse('2023-07-22T00:00:00');
        if (currentDate >= startDate && currentDate < endDate) {
          this.$store.dispatch('setCurrentTrip', trip);
          this.trip = trip;
        }
      })
    },
    parseDate(date: string): string {
      return `${date.substring(8, 10)}.${date.substring(5, 7)}.${date.substring(0, 4)}`
    }
  }
});
</script>
<style lang="scss">
@import '../theme/colors.scss';
@import "../theme/typography.scss";

.country {
  @include header-2-light;
  height: 48px;
}

.trip-roadmap {
  height: calc(100% - 128px);
  max-height: calc(100% - 128px);
  width: 100%;
  background-color: $color-white;

  .dates {
    padding: 32px;
    width: 100%;
    border-bottom: 1px solid $color-black-025;
    box-shadow: 0 8px 8px $color-black-025;

    .date {
      @include subtitle-dark;
      margin: 0;
      text-align: center;
    }
  }
}

</style>
