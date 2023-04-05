<template>
  <button :class="{
    transparent: color === buttonColor.TRANSPARENT,
    light: color === buttonColor.LIGHT,
    inverted: color === buttonColor.INVERTED,
    primary: color === buttonColor.PRIMARY,
    default: type === buttonType.DAFAULT,
    flat: type === buttonType.FLAT,
    big: size === buttonSize.BIG,
    small: size === buttonSize.SMALL
  }">
    <slot></slot>
  </button>
</template>
<script>
import {ButtonColor, ButtonSize, ButtonType} from './types'
export default {
  props: {
    color: ButtonColor,
    type: ButtonType,
    size: ButtonSize
  },
  data() {
    return {
      buttonColor: ButtonColor,
      buttonType: ButtonType,
      buttonSize: ButtonSize
    }
  },
  methods: {

  }
}
</script>
<style lang="scss">
@import "../../theme/colors.scss";

  button {
    font-family: 'Inter', sans-serif;
    transition: all 200ms;
  }

  .small {
    height: 32px;
    min-width: 96px;
    font-size: 12px;
  }

  .big {
    height: 48px;
    min-width: 196px;
    font-size: 16px;
  }

  .default {
    border-radius: 32px;
    border-width: 1px;
    border-style: solid;
  }

  .flat {
    border-bottom: 1px solid $color-white;
    background: transparent !important;
    color: $color-white !important;
    font-size: 24px !important;
  }

  .light {
    background: $color-white;
    color: $color-black;
    border-color: $color-white;
  }

  .transparent {
    background: $color-white;
    border-color: $color-black-025;
  }

  .primary {
    background: $color-red-600;
    color: $color-white;
    border-color: $color-red-600;
  }

  .inverted {
    background: $color-white;
    color: $color-red-600;
    border-color: $color-white;
  }
</style>
