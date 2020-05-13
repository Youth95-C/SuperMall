<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.nav-bar {
  height: 44px;
  line-height: 44px;
  text-align: center;
  display: flex;
  box-shadow: 0 1px 1px rgba(100, 100, 100, 0.1);
}
.center {
  flex: 1;
}
.left,
.right {
  width: 60px;
  /* background-color: red; */
}
</style>