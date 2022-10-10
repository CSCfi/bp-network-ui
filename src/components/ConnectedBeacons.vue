<template>
  <section v-on:load="queryAPI" title="List of connected Beacons">
    <div
      class="tile is-ancestor container"
      style="margin: auto"
      v-for="beacon in beacons"
      v-bind:key="beacons.indexOf(beacon)"
    >
      <ConnectedBeaconTile
        :title="beacon.name"
        v-bind:key="beacon.url"
        v-bind:beacon="beacon"
      ></ConnectedBeaconTile>
    </div>
    <div class="tile is-ancestor" style="text-align: center" v-if="error">
      <p class="error">
        {{ error }}
      </p>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import ConnectedBeaconTile from "@/components/ConnectedBeaconTile.vue";

export default {
  components: {
    ConnectedBeaconTile,
  },
  data() {
    return {
      beacons: [],
      error: "",
      registry: process.env.VUE_APP_REGISTRY_URL,
    };
  },
  methods: {
    queryAPI: function () {
      var vm = this;
      vm.beacons = []; // Clear view

      var url = `${vm.registry}services?type=beacon`;

      axios
        .get(url)
        .then((response) => {
          response.data.forEach((element) => {
            this.beacons.push(element);
          });
        })
        .catch((error) => {
          this.error = "Could not find any Beacons to display.";
          console.log(error);
        });
    },
  },
  beforeMount() {
    this.queryAPI();
  },
};
</script>

<style scoped>
.error {
  margin: auto;
  padding-bottom: 20px;
}
</style>
