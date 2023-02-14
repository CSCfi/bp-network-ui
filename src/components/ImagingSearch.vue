<template>
  <div class="container" style="margin-bottom: 24px">
    <div class="searchComponents">
      <b class="headerText">Discover digital pathology sets</b>
      <section class="searchBarField">
        <form @submit.prevent="onSubmit">
          <div class="stretch searchbar">
            <label for="searchBar">Search from dataset descriptions</label>
            <b-input
              class="stretch searchbar"
              id="searchBar"
              data-testid="testBar"
              size="is-medium"
              type="search"
              placeholder="Type here"
              v-model="query"
              title="Variant search term"
            ></b-input>
          </div>

          <b-message
            v-if="errorTooltip"
            type="is-danger"
            aria-close-label="Close notification"
            role="alert"
            >{{ errorMessage }}
            <router-link to="/guide" style="color: blue"
              >How to make a query?</router-link
            ></b-message
          >
        </form>
      </section>
      <div class="searchbar-footer">
        <div class="dropDownButtonGroup">
          <div class="dropDown1">
            <div>Biological species</div>
            <b-dropdown aria-role="list" v-model="biologicalValue" scrollable>
              <template #trigger="{ active }">
                <b-button
                  class="dropdownButton"
                  size="is-medium"
                  type="is-secondary"
                  :icon-right="active ? 'menu-up' : 'menu-down'"
                >
                  <p v-if="biologicalValue.length == 0">All</p>
                  <p v-else>{{ biologicalValue }}</p>
                </b-button>
              </template>
              <div class="list">
                <b-dropdown-item
                  custom
                  aria-role="listitem"
                  class="search"
                  postion="is-top-left"
                >
                  <b-input
                    class="searchInput"
                    v-model="searchTermBiological"
                    placeholder="search"
                    expanded
                  />
                  <b-button
                    icon-left="refresh"
                    class="resetButton"
                    type="is-primary"
                    @click="clearBiological"
                    title="Clear selection"
                  />
                </b-dropdown-item>
              </div>
              <b-dropdown-item
                v-for="item of filteredDataBiological"
                :key="item"
                aria-role="listitem"
                :value="item"
                >{{ item }}</b-dropdown-item
              >
            </b-dropdown>
          </div>
          <div class="dropDown">
            <div>Anatomical site</div>

            <b-dropdown aria-role="list" v-model="anatomicalValue" scrollable>
              <template #trigger="{ active }">
                <b-button
                  class="dropdownButton"
                  size="is-medium"
                  type="is-secondary"
                  :icon-right="active ? 'menu-up' : 'menu-down'"
                >
                  <p v-if="anatomicalValue.length == 0">All</p>
                  <p v-else>{{ anatomicalValue }}</p>
                </b-button>
              </template>
              <div class="list">
                <b-dropdown-item custom aria-role="listitem" class="search">
                  <b-input
                    class="searchInput"
                    v-model="searchTermAnatomical"
                    placeholder="search"
                    expanded
                  />
                  <b-button
                    icon-left="refresh"
                    class="resetButton"
                    type="is-primary"
                    @click="clearAnatomical"
                    title="Clear selection"
                  />
                </b-dropdown-item>
              </div>

              <b-dropdown-item
                v-for="item of filteredDataAnatomical"
                :key="item"
                :value="item"
                aria-role="listitem"
                >{{ item }}</b-dropdown-item
              >
            </b-dropdown>
          </div>
          <div class="dropDown">
            <div>Sex</div>
            <b-dropdown aria-role="list" v-model="sexOptions">
              <template #trigger="{ active }">
                <b-button
                  class="dropdownButton"
                  size="is-medium"
                  type="is-secondary"
                  :icon-right="active ? 'menu-up' : 'menu-down'"
                >
                  <p v-if="sexOptions.length == 0">All</p>
                  <p v-else>{{ sexOptions }}</p>
                </b-button>
              </template>
              <b-dropdown-item value="Male" aria-role="listitem"
                >Male</b-dropdown-item
              >
              <b-dropdown-item value="Female" aria-role="listitem"
                >Female</b-dropdown-item
              >
            </b-dropdown>
          </div>
          <div class="dropDown">
            <div>Age at extraction</div>

            <component
              :is="ageSelector"
              :ageOptions="ageOptions"
              @updateAgeOptions="setAgeOptions"
              ref="ageSelector"
            ></component>
          </div>
        </div>
      </div>
      <div class="searchButtonField">
        <span>
          <b-button
            class="searchButton"
            v-on:click="imagingSearch()"
            type="is-primary"
            size="is-medium"
            data-testid="searchButton"
            >Search</b-button
          ></span
        >
        <span class="resetSpan">
          <b-button
            icon-left="refresh"
            class="resetButton"
            v-on:click="clearFields()"
            type="is-primary"
            size="is-medium"
            data-testid="clearButton"
            >Clear Fields
          </b-button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import ageSelector from "./AgeSelector.vue";
export default {
  name: "ImagingSearch",
  components: {
    ageSelector,
  },
  data() {
    return {
      searchTermBiological: "",
      searchTermAnatomical: "",
      ageSelector: ageSelector,
      query: "",
      validated: false,
      errorMessage: "",
      errorTooltip: false,
      sexOptions: [],
      ageOptions: [],
      anatomicalValue: [],
      anatomicalOptions: [],
      biologicalOptions: [],
      biologicalValue: [],
      aggregator: process.env.VUE_APP_AGGREGATOR_URL,
      ageOptionsObject: {},
    };
  },
  computed: {
    filteredDataBiological() {
      return this.biologicalOptions.filter(
        (item) =>
          item.toLowerCase().indexOf(this.searchTermBiological.toLowerCase()) >=
          0
      );
    },
    filteredDataAnatomical() {
      return this.anatomicalOptions.filter(
        (item) =>
          item.toLowerCase().indexOf(this.searchTermAnatomical.toLowerCase()) >=
          0
      );
    },
  },
  methods: {
    clearBiological: function () {
      this.biologicalValue = [];
    },
    clearAnatomical: function () {
      this.anatomicalValue = [];
    },
    clearFields: function () {
      this.query = "";
      this.sexOptions = [];
      this.ageOptions = [];
      this.biologicalValue = [];
      this.anatomicalValue = [];
      this.$refs.ageSelector.clearAgeForm();
    },
    setAgeOptions: function (ageOptionsObject) {
      this.ageOptionsObject = ageOptionsObject;
      this.ageOptions = [
        ageOptionsObject.ageOption,
        ageOptionsObject.age,
        ageOptionsObject.ageUnit,
      ];
    },
    changeFormToA: function () {
      this.$emit("changeFormToA");
    },
    onSubmit: function () {
      // onSubmit is called when user inputs ENTER on search bar
      // proxy the event to the imagingSearch function
      var vm = this;
      vm.imagingSearch();
    },
    imagingSearch: function () {
      // imagingSearch is called when user clicks search button
      var vm = this;
      vm.errorTooltip = false;
      // Validate user input with regex
      vm.validateInput();
      if (vm.validated) {
        // Query string
        var queryObj = {};
        queryObj.assemblyId = vm.assembly;
        queryObj = Object.assign(queryObj, vm.buildQueryObj());
        // Change view to results and send GET query string
        this.$router.push(
          {
            path: "results",
            query: queryObj,
          },
          undefined,
          () => {}
        );
      } else {
        vm.errorMessage = "Search term is malformed, please try again.";
        vm.errorTooltip = true;
      }
    },
    exampleSearch: function () {
      var vm = this;
      vm.query = "test";
      this.sexOptions = "Male";

      this.biologicalOptions = "test";
      this.anatomicalOptions = "test";
      this.$refs.ageSelector.setAgeOpt();
      document.getElementById("searchBar").focus();
      this.ageOptions = ["<", "3"];
    },
    parseAgeBetween: function (ageTimeUnit) {
      this.ageOptionsObject.age =
        "P" +
        this.ageOptionsObject.age[0] +
        ageTimeUnit +
        "," +
        "P" +
        this.ageOptionsObject.age[1] +
        ageTimeUnit;
    },
    buildQueryObj: function () {
      var vm = this;
      var sex;
      if (vm.sexOptions == "Male") {
        sex = "M";
      } else if (vm.sexOptions == "Female") {
        sex = "F";
      }
      var ageNumber = vm.ageOptionsObject.age;
      if (vm.ageOptionsObject.ageUnit == "Week(s)") {
        if (vm.ageOptionsObject.age.length == undefined) {
          vm.ageOptionsObject.age = "P" + vm.ageOptionsObject.age + "W";
        } else {
          this.parseAgeBetween("W");
        }
      } else if (vm.ageOptionsObject.ageUnit == "Month(s)") {
        if (vm.ageOptionsObject.age.length == undefined) {
          vm.ageOptionsObject.age = "P" + vm.ageOptionsObject.age + "M";
        } else {
          this.parseAgeBetween("M");
        }
      } else {
        if (vm.ageOptionsObject.age.length == undefined) {
          vm.ageOptionsObject.age = "P" + vm.ageOptionsObject.age + "Y";
        } else {
          this.parseAgeBetween("Y");
        }
      }
      var queryObj = {
        searchTerm: vm.query,
        biologicalSpecies:
          vm.biologicalValue === "string" ? vm.biologicalValue : "",
        anatomicalSite:
          typeof vm.anatomicalValue === "string" ? vm.anatomicalValue : "",
        sex: typeof sex === "string" ? sex : "",
        ageOption: vm.ageOptionsObject.ageOption,
        age:
          typeof vm.ageOptionsObject.age === "string"
            ? vm.ageOptionsObject.age
            : "",
      };

      if (ageNumber != undefined && ageNumber.length == 2) {
        delete queryObj["ageOption"];
      }

      return queryObj;
    },
    validateInput: function () {
      var vm = this;

      vm.validated = true;
    },
    queryAPI: function () {
      var vm = this;
      vm.anatomicalOptions = []; // Clear table
      vm.biologicalOptions = [];
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

      var websocket = new WebSocket(`${wss}query?${"getSearchTerms=true"}`);
      websocket.onopen = function () {
        // The connection was opened
        vm.isLoading = true;
      };
      websocket.onclose = function () {
        // The connection was closed
        vm.isLoading = false;
      };
      websocket.onmessage = function (event) {
        // New message arrived
        // check if a beacon with the same id exists already
        // prevent results appearing 2 times.
        // this can occur when aggregators query the same beacons
        if (JSON.parse(event.data).anatomicalSite != undefined) {
          JSON.parse(event.data).anatomicalSite.forEach((data) => {
            data.specimen.attributes.forEach((element) => {
              if (element.tag == "anatomical_site") {
                var exists = false;
                vm.anatomicalOptions.forEach((option) => {
                  if (option == element.value) {
                    exists = true;
                  }
                });
                if (!exists) {
                  vm.anatomicalOptions.push(element.value);
                }
              }
            });
          });
        }
        if (JSON.parse(event.data).biologicalBeing != undefined) {
          JSON.parse(event.data).biologicalBeing.forEach((data) => {
            data.biologicalBeing.attributes.forEach((element) => {
              if (element.tag == "animal_species") {
                var exists = false;
                vm.biologicalOptions.forEach((option) => {
                  if (option == element.value) {
                    exists = true;
                  }
                });
                if (!exists) {
                  vm.biologicalOptions.push(element.value);
                }
              }
            });
          });
        }
      };
      websocket.onerror = function () {
        // There was an error with your WebSocket
        vm.isLoading = false;
      };
    },
  },
  beforeMount() {
    // If user reloads page, this places the current query params from the address bar into the search bar
    // Check searchType

    // Continue to parse the object into a string

    if (this.$route.query != undefined) {
      if (!Object.keys(this.$route.query).length === 0) {
        this.query = this.$route.query.searchTerm;
      }
    }

    this.queryAPI();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.headerText {
  padding-top: 43.5px;
  font-weight: 800;
  font-size: 29px;
  line-height: 35px;
  /* identical to box height */

  text-align: center;

  /* White */

  color: #ffffff;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
}
h2 {
  font-size: 2em;
}
/* section {
  margin-top: 100px;
} */
.stretch {
  width: 179.8%;
}
.searchbar-footer {
  margin-top: 10px;
  font-size: 0.9em;
  display: flex;
}
.searchComponents {
  display: flex;
  flex-flow: column wrap;
}
.dropDown {
  display: inline-block;
  padding-left: 20px;
}
.dropDown1 {
  display: inline-block;
}
.dropdownButton {
  width: 188px;
}

@media screen and (max-width: 1024px) {
  .searchbar-footer {
    display: flex;
    flex-flow: column;
  }
  #advancedSearch {
    order: 1;
  }
  #example {
    order: 2;
  }
}
.searchBar {
  display: flex;
  border-radius: 0;
}
.searchBarField {
  display: flex;
  padding-top: 20px;
}
/* fix safari bug https://github.com/jgthms/bulma/issues/2626 */
select {
  text-rendering: auto !important;
}
.searchButtonField {
  display: flex;
  padding-top: 20px;
  padding-bottom: 30px;
}
.resetSpan {
  padding-left: 30px;
}
.resetButton.is-primary {
  background-color: #1c007b;
}
.resetButton.is-primary:hover {
  background-color: #1c007b;
}
.searchButton.is-primary {
  background-color: #ff447c;
}
.searchButton.is-primary:hover {
  background-color: #ff2567;
  border-color: #000000;
  border-width: 1px;
}
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  color: aliceblue;
}
.search {
  position: absolute;
  z-index: 999;
  display: flex;
}

.list {
  padding-bottom: 50px;
  overflow: visible !important;
}
.buttonContainerItem {
  padding-top: 100px;
  position: absolute;
}
#test {
  padding-top: 50px;
  position: absolute;
}

.searchInput {
  width: 120px;
  margin-right: 5px;
}
</style>
