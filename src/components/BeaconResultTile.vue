<template>
  <span class="tile is-parent">
    <span class="tile is-child box">
      <article class="media">
        <span class="media-left">
          <b>{{ data.name }}</b>
          <p>{{ data.organization.name }}</p>
        </span>

        <span class="media-content"> beacon description</span>
        <span class="media-right">
          <p>{{ images[0] }}/ {{ images[1] }}</p>
          <b-button class="accessButton">Apply access</b-button>
        </span>
      </article>
    </span>
  </span>
</template>

<script>
import axios from "axios";

export default {
  props: ["beaconId", "exists", "images"],
  data() {
    return {
      registry: process.env.VUE_APP_REGISTRY_URL,
      data: { name: "", organization: { name: "", logoUrl: "" } },
    };
  },
  watch: {
    "$route.query.query": function () {
      // Watch query string for changes in case the user makes a new
      // search while displaying results.
      this.getInfo();
    },
  },
  methods: {
    // we first try the registry to fetch info
    // if that does not work we try the beacon directly
    // because there is no way to know the information that
    // comes from another aggregator
    getInfo: function () {
      axios
        .get(`${this.registry}services/${this.$props.beaconId}`)
        .then((response) => {
          this.data = response.data;
        })
        .catch((error) => {
          var try_url = this.$props.beaconId.split(".").reverse().join(".");
          axios
            .get(`https://${try_url}`)
            .then((response) => {
              this.data = response.data;
            })
            .catch((error) => {
              // We could not fetch info for beacon
            });
        });
    },
  },
  beforeMount() {
    this.getInfo();
  },
};
</script>

<style scoped>
.media {
  display: flex;
  justify-content: center;
  align-items: center;
}
.media-right {
  display: flex;
  justify-content: center;
  align-items: center;
}
a {
  color: #1c007b;
}

.accessibility-green-tag {
  background-color: #29852a;
  color: #fff;
}
.accessibility-red-tag {
  background-color: #e90000;
  color: #fff;
}
.accessibility-yellow-tag {
  background-color: #e6e200;
  color: #fff;
}
.accessButton {
  color: #fff;
  margin-left: 40px;
  background: #1c007b;
  border: 1px solid #1c007b;
  border-radius: 8px;
}
.accessButton:hover {
  color: #1c007b;
  margin-left: 40px;
  background: #fff;
  border: 1px solid #1c007b;
  border-radius: 8px;
}
</style>
