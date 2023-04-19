<template>
  <div class="trip" :class="{'activable': status !== tripStatus.PAST}">
    <div class="trip-header" :class="{'header-upcoming': status === tripStatus.UPCOMING}">
      <div class="location">
        <h4 class="country">{{country[trip.country]}}<div class="flag"></div></h4>
        <p class="places">
          <span v-bind:key="place.from" v-for="place of trip.locations">
            {{place.place}}{{trip.locations.indexOf(place) < trip.locations.length - 1 ? ', ' : ''}}
          </span>
        </p>
      </div>
      <div class="time">
        <div class="ongoing" v-if="status === tripStatus.ONGOING"><div class="blink"></div>ongoing</div>
        <div class="date" v-else>{{status === tripStatus.UPCOMING ? parseDate(trip.startDate) : parseDate(trip.endDate)}}</div>
      </div>
    </div>
    <div v-if="status === tripStatus.ONGOING" class="status">
      <tr-trip-progress :trip="trip"></tr-trip-progress>
    </div>
    <div class="review" v-if="status === tripStatus.PAST">
      <tr-button :size="buttonSize.SMALL" :type="buttonType.DAFAULT" :color="buttonColor.PRIMARY">Review</tr-button>
    </div>
  </div>
</template>
<script lang="ts">
import {defineComponent} from "vue";
import {Country} from "@/types/Country";
import {TripStatus} from "@/types/Trip";
import TripProgressComponent from "@/components/trips/trip/trip-progress/TripProgressComponent.vue";
import ButtonComponent from "@/components/button/ButtonComponent.vue";
import {ButtonSize, ButtonColor, ButtonType} from "@/components/button/types";

export default defineComponent({
  props: ['trip', 'status'],
  components: {
    trTripProgress: TripProgressComponent,
    trButton: ButtonComponent
  },
  data() {
    return {
      country: Country,
      tripStatus: TripStatus,
      buttonSize: ButtonSize,
      buttonType: ButtonType,
      buttonColor: ButtonColor
    }
  },
  methods: {
    parseDate(date: string): string {
      return `${date.substring(8, 10)}.${date.substring(5, 7)}.${date.substring(0, 4)}`;
    }
  }
})
</script>
<style lang="scss">
@import '../../../theme/colors.scss';
@import '../../../theme/typography.scss';

.activable:active {
  background-color: $color-white-active;
}

.trip {
  width: 100%;
  height: 128px;
  border: 2px solid $color-black-025;
  border-radius: 16px;
  padding: 0 16px;
  box-shadow: 2px 2px 2px 0 $color-black-025;
  transition: all 200ms;

  .header-upcoming {
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 128px;
    margin-top: 16px;

    .country {
      margin-left: 50%;
      transform: translateX(-50%);
    }

    .country, .places {
      text-align: center;
    }
  }

  .status, .review {
    height: calc(100% - 50px);
    margin: 0 16px;
    display: flex;
    align-items: center;
  }

  .review {
    justify-content: space-around;
  }

  .trip-header, .country {
    display: flex;
  }

  .location {
    width: 100%;
  }

  .country {
    @include header-5-dark;
    height: 48px;
    line-height: 48px;

    .flag {
      height: 16px;
      width: 16px;
      border: 1px solid black;
      margin-top: 15px;
      margin-left: 8px;
    }
  }

  .ongoing {
    @include subtitle-mini-dark;
    display: flex;
    margin: 16px 0;

    .blink {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: $color-red-600;
      margin-right: 8px;
      margin-top: 3.5px;
      animation: blink 2000ms infinite;
    }
  }

  .date {
    @include subtitle-mini-dark;
    margin: 16px 0;
  }

  .places {
    @include subtitle-mini-dark;
    margin-top: -12px;
  }
}

@keyframes blink {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
