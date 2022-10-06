<template>
  <section>
    <div class="results-section">
      <b-button
        :data-testid="beaconId"
        @click="displayResults"
        class="show-more"
        :title="!display ? 'Show detailed response' : 'Hide detailed response'"
      >
        {{ !display ? "View details" : "Hide details" }}
      </b-button>
      <b-button class="accessButton"> Apply access </b-button>
      <div v-if="display" class="details-rows">
        <b-table :data="results" :striped="true" class="column details-table">
          <b-table-column label="Access">
            placeholder
            <!-- <template v-slot:default="results">
               <b-tag
                class="accessibility-green-tag"
                v-if="checkForPublicDatasets(results.row)"
                title="Dataset is in public access"
                ><b>Public</b></b-tag
              >
              <b-tag
                class="accessibility-yellow-tag"
                v-else-if="checkForRegisteredDatasets(results.row)"
                title="Dataset requires ELIXIR Bona Fide status to access"
                ><b>Registered</b></b-tag
              >
              <b-tag
                class="accessibility-red-tag"
                v-else-if="checkForControlledDatasets(results.row)"
                title="Dataset requires permissions from data owner to access"
                ><b>Controlled</b></b-tag
              >
              <b-tag class="access-tag" type="is-light" v-else>Unknown</b-tag>
            </template> -->
          </b-table-column>
          <b-table-column label="Dataset" title="Unique identifier of dataset">
            placeholder
          </b-table-column>
          <b-table-column
            label="Images"
            title="Amount of corresponding images in dataset"
          >
            <template>
              {{ results }}
            </template>
          </b-table-column>
        </b-table>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ["results", "beaconId"],
  data() {
    return {
      display: false,
    };
  },
  watch: {},
  methods: {
    displayResults: function () {
      if (this.display) this.display = false;
      else this.display = true;
    },
    checkForPublicDatasets: function (result) {
      if (
        result.info &&
        result.info.accessType &&
        result.info.accessType == "PUBLIC"
      )
        return true;
    },
    checkForRegisteredDatasets: function (result) {
      if (
        result.info &&
        result.info.accessType &&
        result.info.accessType == "REGISTERED"
      )
        return true;
    },
    checkForControlledDatasets: function (result) {
      if (
        result.info &&
        result.info.accessType &&
        result.info.accessType == "CONTROLLED"
      )
        return true;
    },
  },
  beforeMount() {},
};
</script>

<style scoped>
.accessButton {
  display: block;
  margin: 0 auto;
  margin-right: 30px;
  margin-top: -65px;
  margin-bottom: 25px;
  color: white !important;
  background-color: #1c007b !important;
  border-color: #1c007b !important;

  border-width: 1.5px !important;
}
.accessButton:hover {
  color: #1c007b !important;
  background-color: #f2f0f7 !important;
  border-color: #1c007b !important;
  border-width: 1.5px !important;
}
.word-wrap {
  word-break: break-all;
}
.show-more {
  display: block;
  margin: 0 auto;
  margin-right: 180px;
  margin-top: -65px;
  margin-bottom: 25px;
  color: #1c007b;
  background-color: #f2f0f7 !important;
  border-color: #1c007b !important;
  border-width: 1.5px !important;
  /* width: 95%; */
  /* border-top: none; */
  /* border-top-left-radius: 0; */
  /* border-top-right-radius: 0; */
  /* background: rgb(224,224,224);
  background: linear-gradient(0deg, rgba(224,224,224,1) 0%, rgba(255,255,255,1) 10%);  */
  /* border-bottom: 5px solid #047eaa; */
}
.show-more:hover {
  color: white !important;
  background-color: #1c007b !important;
  border-color: #1c007b !important;
  border-width: 1.5px !important;
}
.narrow-column {
  width: 15%;
}
.detail-row-vertical {
  padding-top: 5px;
  padding-bottom: 0;
}
.details-rows {
  margin: 10px 20px;
}
.details-table {
  background: rgb(247, 247, 247);
  background: linear-gradient(
    180deg,
    rgba(247, 247, 247, 1) 0%,
    rgba(255, 255, 255, 1) 100%
  );
  margin-top: -10px;
}
.accessibility-green-tag {
  background-color: #29852a;
  color: #fff;
}
.accessibility-yellow-tag {
  background-color: #ffcc00;
  color: #000;
}
.accessibility-red-tag {
  background-color: #e90000;
  color: #fff;
}
</style>
