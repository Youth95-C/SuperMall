// import { debounce } from "./utils";
export const itemListenerMixin = {
  mounted() {
    this.refresh = this.debounce(this.$refs.homeScroll.refresh, 100);
  }
};
