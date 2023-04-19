<template>
  <div class="header">
    <div class="content">
      <slot></slot>
    </div>
    <div class="flag"></div>
  </div>
</template>
<script lang="ts"></script>
<style lang="scss">
@import '../../theme/colors.scss';

.header {
  display: flex;
  height: 128px;
  width: 100vw;
  background-color: $color-red-600;
  padding: 40px 32px;

  .content {
    width: calc(100% - 48px);
    margin: 0;
  }

  .flag {
    width: 48px;
    width: 48px;
    border: 1px solid $color-black;
  }
}
</style>
