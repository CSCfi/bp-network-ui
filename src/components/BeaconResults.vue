<template>
  <section class="container results-table">
    <div class="column">
      <span class="resultHeader">Search results for:</span>
      <span v-for="(item, index) in this.searchValues" :key="index">
        <span class="resultBox">
          {{ item }}
        </span>
      </span>
    </div>

    <b-table
      :data="combinedResponse"
      :default-sort-direction="defaultSortDirection"
      :sort-icon="sortIcon"
      :sort-icon-size="sortIconSize"
      default-sort="beaconName"
      hoverable
    >
      <b-table-column
        field="beaconName"
        sortable
        label="Beacon name"
        v-slot="props"
      >
        {{ props.row.beaconName }}</b-table-column
      >
      <b-table-column
        field="beaconDescription"
        label="Description"
        sortable
        v-slot="props"
      >
        {{ props.row.description }}</b-table-column
      >
      <b-table-column
        field="accessType"
        label="Access to images"
        v-slot="props"
        sortable
      >
        {{ props.row.accessType }}
      </b-table-column>
      <b-table-column field="images" , label="Matches" v-slot="props" sortable>
        {{ props.row.images[0] }} / {{ props.row.images[1] }}
      </b-table-column>
      <b-table-column>
        <b-button class="accessButton">Apply access</b-button>
      </b-table-column>
    </b-table>
    <div v-if="isLoading" class="loading-indicator spinner">
      <Loading></Loading>
    </div>
  </section>
</template>

<script>
import Loading from "vue-material-design-icons/Loading.vue";
import axios from "axios";

export default {
  components: {
    Loading,
  },
  data() {
    return {
      defaultSortDirection: "asc",
      sortIcon: "arrow-up",
      sortIconSize: "is-small",

      beaconV2: false,
      notFound: false,
      queryParams: undefined,
      hits: true,
      errors: false,
      isLoading: false,
      response: [],
      variantTypes: [
        "DEL:ME",
        "INS:ME",
        "DUP:TANDEM",
        "DUP",
        "DEL",
        "INS",
        "INV",
        "CNV",
        "SNP",
        "MNP",
      ],
      aggregator: process.env.VUE_APP_AGGREGATOR_URL,
      filteringTerms: [],
      filterValue: [],
      showDetailIcon: true,
      searchValues: [],
      registry: process.env.VUE_APP_REGISTRY_URL,
      beaconInfoResponse: [],
      combinedResponse: [],
    };
  },
  watch: {
    "$route.query": function () {
      // Watch query string for changes in case the user makes a new
      // search while displaying results.
      this.queryAPI();
    },
  },
  methods: {
    parseSearchValues: function () {
      if (this.$route.query.searchTerm != "") {
        this.searchValues.push(this.$route.query.searchTerm);
      }
      if (this.$route.query.anatomicalSite != "") {
        this.searchValues.push(this.$route.query.anatomicalSite);
      }
      if (this.$route.query.sex != "") {
        this.searchValues.push(this.$route.query.sex);
      }

      if (this.$route.query.biologicalSpecies != "") {
        this.searchValues.push(this.$route.query.biologicalSpecies);
      }
      if (typeof this.$route.query.age === "object") {
        if (
          Object.keys(this.$route.query.age).length > 1 &&
          this.$route.query.ageOption != ""
        ) {
          this.searchValues.push(
            "Ages between " +
              this.$route.query.age[0] +
              " " +
              this.$route.query.ageOption +
              " " +
              this.$route.query.age[1]
          );
        } else if (
          this.$route.query.age != "" &&
          this.$route.query.ageOption != ""
        ) {
          if (this.$route.query.ageOption == "<") {
            this.searchValues.push("Age less than " + this.$route.query.age);
          } else {
            this.searchValues.push("Age higher than " + this.$route.query.age);
          }
        }
      }
    },
    filterResults: function (filters) {
      var queryParamsObj = Object.assign({}, this.$route.query);
      var filterStrign = "";
      if (filters.length != 0) {
        for (var filter in filters) {
          if (filter == 0) {
            filterStrign += filters[filter];
          } else {
            filterStrign += "," + filters[filter];
          }
        }
      }
      queryParamsObj.filters = filterStrign;
      this.$router.push(
        {
          path: "results",
          query: queryParamsObj,
        },
        undefined,
        () => {}
      );
    },
    checkIfV2: function (beacon) {
      if (beacon.meta != undefined) {
        return true;
      }

      return false;
    },
    checkIfV2Inresponse: function () {
      this.response.forEach((response) => {
        if (response.meta != undefined) {
          return true;
        }
      });
      return false;
    },
    getErrorBeaconId: function (response) {
      // This function generates beaconId for errored beacon queries since these queries don't currently return the beaconId
      if (
        response.beaconId == undefined &&
        response.meta == undefined &&
        response.response == undefined &&
        response != "No results found."
      ) {
        // Creates the beacon id from the url
        var splitUrl = response.service.split("/");
        var beaconId = splitUrl[2].split(".").reverse().join(".");
        response.beaconId = beaconId;
      }
      return response;
    },
    sortNumbers(a, b, isAsc) {
      if (isAsc) {
        return (
          a.datasetAlleleResponses.length > b.datasetAlleleResponses.length
        );
      } else {
        return (
          a.datasetAlleleResponses.length < b.datasetAlleleResponses.length
        );
      }
    },
    queryAPI: async function () {
      var vm = this;
      vm.response = []; // Clear table
      vm.filterValue = [];
      vm.filteringTerms = [];
      if (process.env.VUE_APP_DEVELOPMENT) {
        var wss = vm.aggregator.replace("http", "ws"); // change aggregator http url to ws
      } else {
        var wss = vm.aggregator.replace("https", "wss"); // change aggregator https url to wss
      }

      // Query params parsing from string https://stackoverflow.com/a/6566471/8166034
      // Copy the query object and remove the unwanted keys, so that we can use
      // the pristine query object in BasicSearch and AdvancedSearch
      var queryParamsObj = Object.assign({}, this.$route.query);
      // Remove the `searchType` and `coordType` keys, which are not sent to Beacons
      delete queryParamsObj.searchType;
      delete queryParamsObj.coordType;
      var queryParamsString = "";
      for (var key in queryParamsObj) {
        if (queryParamsString != "") {
          queryParamsString += "&";
        }
        queryParamsString +=
          key + "=" + encodeURIComponent(queryParamsObj[key]);
      }

      // Create websocket
      var websocket = new WebSocket(`${wss}query?${queryParamsString}`);
      websocket.onopen = function () {
        // The connection was opened
        vm.isLoading = true;
      };
      websocket.onclose = async function () {
        // The connection was closed

        vm.isLoading = false;
        vm.checkResponse();

        for (const i in vm.response) {
          await vm.getInfo(vm.response[i].beaconId);
        }

        vm.parseBeaconInfo();
      };
      websocket.onmessage = function (event) {
        // New message arrived
        // check if a beacon with the same id exists already
        // prevent results appearing 2 times.
        // this can occur when aggregators query the same beacons
        if (JSON.parse(event.data) != null) {
          //checks if response is filteringTerms or not
          if (JSON.parse(event.data).filteringTerms != undefined) {
            if (vm.filteringTerms.length == 0) {
              vm.filteringTerms.push(JSON.parse(event.data).filteringTerms);
            } else {
              // check if filtering term exists and add ids to it
              JSON.parse(event.data).filteringTerms.forEach((newObject) => {
                var exists = false;
                vm.filteringTerms.forEach((object) => {
                  if (object.label == newObject.label) {
                    object.id.push(newObject.id);
                    exists = true;
                  }
                });
                if (!exists) {
                  vm.filteringTerms.push(newObject);
                }
              });
            }
          } else {
            if (JSON.parse(event.data).meta != undefined) {
              vm.beaconV2 = true;
            }
            const found = vm.response.some((resp) => {
              if (JSON.parse(event.data).meta == undefined) {
                resp.beaconId == JSON.parse(event.data).beaconId;
              } else {
                resp.beaconId == JSON.parse(event.data).meta.beaconId;
              }
            });
            // checks if filter result and adds to filteringTerms

            var nobeaconid = vm.getErrorBeaconId(JSON.parse(event.data));

            const found_nobeaconid = vm.response.some((resp) => {
              if (nobeaconid.meta == undefined) {
                resp.beaconId === nobeaconid.beaconId;
              } else {
                resp.beaconId === nobeaconid.meta.beaconId;
              }
            });
            if (!found && !found_nobeaconid) vm.response.push(nobeaconid);
          }
        }
        vm.searchValues = [];
        vm.parseSearchValues();
      };
      websocket.onerror = function () {
        // There was an error with your WebSocket
        vm.isLoading = false;
        vm.checkResponse();
      };
    },
    checkResponse: function () {
      // Checks if the response from aggregator contains any exists=true
      // If it doesn't, it clears the entire response array
      // This solution stems from buefy's requirements for displaying
      // an empty table template (display only if there is no data)
      if (this.response.find((resp) => resp.exists === true)) {
        this.notFound = false;
        return true;
      } else if (
        this.response.find(
          (resp) => resp.response !== undefined && resp.response.exists === true
        )
      ) {
        this.notFound = false;
        return true;
      } else {
        this.response = [];
        this.notFound = true;
      }
    },
    setSearchToLocaStorage: function () {
      if (localStorage.getItem("searches") == null) {
        var searches = [];
        var currentdate = new Date();
        var hours = currentdate.getHours();
        var minutes = currentdate.getMinutes();
        var seconds = currentdate.getSeconds();

        if (hours < 10) {
          hours = "0" + hours;
        }
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        if (seconds < 10) {
          seconds = "0" + seconds;
        }
        var date =
          currentdate.getFullYear() +
          "-" +
          (currentdate.getMonth() + 1) +
          "-" +
          currentdate.getDate() +
          " " +
          hours +
          ":" +
          minutes +
          ":" +
          seconds;
        var search = {
          url: window.location.href,
          date: date,
        };
        searches.push(search);
        localStorage.setItem("searches", JSON.stringify(searches));
      } else {
        var currentdate = new Date();
        var hours = currentdate.getHours();
        var minutes = currentdate.getMinutes();
        var seconds = currentdate.getSeconds();

        if (hours < 10) {
          hours = "0" + hours;
        }
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        if (seconds < 10) {
          seconds = "0" + seconds;
        }
        var date =
          currentdate.getFullYear() +
          "-" +
          (currentdate.getMonth() + 1) +
          "-" +
          currentdate.getDate() +
          " " +
          hours +
          ":" +
          minutes +
          ":" +
          seconds;

        var searches = JSON.parse(localStorage.getItem("searches"));
        var search = {
          url: window.location.href,
          date: date,
        };
        searches.push(search);
        localStorage.setItem("searches", JSON.stringify(searches));
      }
    },
    getInfo: async function (beaconId) {
      await axios
        .get(`${this.registry}services/${beaconId}`)
        .then((response) => {
          this.beaconInfoResponse.push(response.data);
        })
        .catch(async (error) => {
          var try_url = beaconId.split(".").reverse().join(".");
          await axios
            .get(`https://${try_url}`)
            .then((response) => {
              this.beaconInfoResponse.push(response.data);
            })
            .catch((error) => {
              // We could not fetch info for beacon
              return error;
            });
        });
      console.log(this.beaconInfoResponse);
    },
    parseBeaconInfo: function () {
      this.response.forEach((resp) => {
        this.beaconInfoResponse.forEach((infoResp) => {
          if (resp.beaconId == infoResp.id) {
            resp.beaconName = infoResp.name;
            resp.description = infoResp.description;
            resp.organization = infoResp.organization;
            resp.access = infoResp.acceess;
          }
        });
      });
      this.combinedResponse = this.response;
    },
  },
  beforeMount() {
    this.queryAPI();
    this.setSearchToLocaStorage();
  },
};
</script>

<style scoped>
.resultHeader {
  color: #000000;
}
.resultBox {
  background-color: #f2f0f7;
  color: #1c007b;
  margin-left: 10px;
  padding: 10px;
}
.results-table {
  margin: 0 auto;
  margin-top: 50px;
}
.column.is-one-fifth {
  padding-top: 25px;
}
.column.is-one-fifth > .subtitle {
  padding: 0 0 8px 5px;
  color: black;
  border-bottom: solid 2px #7a7a7a;
  font-weight: 700;
  font-size: 16px;
}
.filtered {
  /* commented to avoid switches going over filters
  might be useful in the future with more search results
  position: sticky; */
  top: 20px;
}
.field {
  width: 100%;
}
.loading-indicator {
  text-align: center;
}
.spinner {
  animation: rotate 1s linear infinite;
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
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
<style>
.b-table .table th {
  color: #000000;
  background: #f2f0f7;
}
</style>
