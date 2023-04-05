<template>
  <ion-page>
    <ion-content>
      <div class="background">
        <div class="current-trip">
          <p class="ongoing-subtitle">Ongoing trip</p>
          <h1 class="trip-title">
            Japan
            <div class="flag"></div>
          </h1>
          <div class="button-container">
            <tr-button
                :color="buttonColor.LIGHT"
                :size="buttonSize.BIG"
                :type="buttonType.FLAT">
              Continue
            </tr-button>
          </div>
        </div>
        <tr-card>
          <tr-trips></tr-trips>
        </tr-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import ButtonComponent from "@/components/button/ButtonComponent";
import {ButtonColor, ButtonSize, ButtonType} from "@/components/button/types";
import CardComponent from "@/components/card/CardComponent";
import TripsComponent from "@/components/trips/TripsComponent";

export default {
  components: {
    TrButton: ButtonComponent,
    TrCard: CardComponent,
    TrTrips: TripsComponent
  },
  data() {
    return {
      buttonColor: ButtonColor,
      buttonType: ButtonType,
      buttonSize: ButtonSize,
    }
  }
}
</script>

<style lang="scss">
@import '../theme/colors.scss';
@import "../theme/typography.scss";

.background {
  height: 100%;
  width: 100%;
  background: $gradient-main;
  position: absolute;
  top: 0;
  overflow: hidden;

  .button-container {
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-top: 32px;
  }

  .trip-title {
    @include header-1-light;
    width: 100%;
    margin: 0 32px;
    display: flex;
    align-items: center;

    .flag {
      height: 32px;
      width: 32px;
      border: 1px solid black;
      margin-left: 16px;
    }
  }

  .ongoing-subtitle {
    @include subtitle-light;
    margin: 96px 32px 0 32px;
  }
}
</style>
