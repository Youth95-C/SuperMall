<template>
  <div class="check-button" :class="{'checked':isChecked}">
    <img src="~assets/img/cart/tick.svg" alt />
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.check-button {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #aaa;
  overflow: hidden;
}
.checked {
  border-color: red;
  background-color: red;
}
</style>