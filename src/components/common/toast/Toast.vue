<template>
  <div class="toast">
    <div>
      <span>{{message}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  props: {
    message: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background-color: rgba(0, 0, 0, 0.5);
  padding: 8px 10px;

  color:#fff;
}
</style>