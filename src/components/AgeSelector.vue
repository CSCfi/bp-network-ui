<template>
  <b-dropdown>
    <template #trigger="{ active }">
      <b-button
        class="dropdownButton"
        size="is-medium"
        type="is-secondary"
        :icon-right="active ? 'menu-up' : 'menu-down'"
      >
        <p v-if="ageOpt.length == 0">Select</p>
        <p v-else>{{ ageOpt[0] }}</p>
      </b-button>
    </template>
    <b-dropdown-item aria-role="list-item" :focusable="false" custom>
      <div class="modal-card" style="width: 250px">
        <div class="modal-card-body">
          <b-switch v-model="toggleAgeLess" @input="toggleSwitch('less')"
            >Age less than
          </b-switch>
          <div class="ageSelector">
            <b-button
              type="is-ghost"
              class="buttonWithImage"
              v-if="ageLess == 0"
              rounded
              size="is-small"
            >
              <img class="image" src="../assets/minus.png" />
            </b-button>
            <b-button
              type="is-ghost"
              class="buttonWithImage"
              v-if="ageLess > 0"
              @click="ageLess--"
              rounded
              size="is-small"
            >
              <img class="image" src="../assets/minus.png" />
            </b-button>

            <input
              class="ageField"
              v-model="ageLess"
              :disabled="!toggleAgeLess"
            />
            <b-button
              v-if="toggleAgeLess"
              type="is-ghost"
              class="buttonWithImage"
              @click="ageLess++"
              rounded
              size="is-small"
            >
              <img class="image" src="../assets/plus.png" />
            </b-button>
            <b-button
              v-else
              type="is-ghost"
              class="buttonWithImage"
              rounded
              size="is-small"
            >
              <img class="image" src="../assets/plus.png" />
            </b-button>
          </div>
        </div>
        <section class="modal-card-body">
          <b-switch v-model="toggleAgeMore" @input="toggleSwitch('more')"
            >Ages more than
          </b-switch>
          <div class="ageSelector">
            <b-button
              type="is-ghost"
              class="buttonWithImage"
              v-if="ageMore == 0"
              rounded
              size="is-small"
            >
              <img class="image" src="../assets/minus.png" />
            </b-button>
            <b-button
              type="is-ghost"
              class="buttonWithImage"
              v-if="ageMore > 0"
              @click="ageMore--"
              rounded
              size="is-small"
            >
              <img class="image" src="../assets/minus.png" />
            </b-button>
            <input
              class="ageField"
              v-model="ageMore"
              :disabled="!toggleAgeMore"
            />
            <b-button
              v-if="toggleAgeMore"
              type="is-ghost"
              class="buttonWithImage"
              @click="ageMore++"
              rounded
              size="is-small"
            >
              <img class="image" src="../assets/plus.png" />
            </b-button>
            <b-button
              v-else
              type="is-ghost"
              class="buttonWithImage"
              rounded
              size="is-small"
            >
              <img class="image" src="../assets/plus.png" />
            </b-button>
          </div>
        </section>

        <section class="modal-card-body">
          <b-switch v-model="toggleAgeBetween" @input="toggleSwitch('between')"
            >Ages between
          </b-switch>
          <div>
            <div class="ageSelector">
              <b-button
                type="is-ghost"
                class="buttonWithImage"
                v-if="ageFrom == 0"
                rounded
                size="is-small"
                style="padding-bottom: 10px"
              >
                <img class="image" src="../assets/minus.png" />
              </b-button>
              <b-button
                type="is-ghost"
                class="buttonWithImage"
                v-if="ageFrom > 0"
                @click="ageFrom--"
                rounded
                size="is-small"
                style="padding-bottom: 10px"
              >
                <img class="image" src="../assets/minus.png" />
              </b-button>

              <input
                class="ageField"
                v-model="ageFrom"
                :disabled="!toggleAgeBetween"
              />
              <b-button
                v-if="toggleAgeBetween"
                type="is-ghost"
                class="buttonWithImage"
                @click="ageFrom++"
                rounded
                size="is-small"
                style="padding-bottom: 10px"
              >
                <img class="image" src="../assets/plus.png" />
              </b-button>
              <b-button
                v-else
                type="is-ghost"
                class="buttonWithImage"
                rounded
                size="is-small"
                style="padding-bottom: 10px"
              >
                <img class="image" src="../assets/plus.png" />
              </b-button>
            </div>
            <p class="and">and</p>
            <div class="ageSelector">
              <b-button
                type="is-ghost"
                class="buttonWithImage"
                v-if="ageTo == 0"
                rounded
                size="is-small"
                style="padding-bottom: 10px"
              >
                <img class="image" src="../assets/minus.png" />
              </b-button>
              <b-button
                type="is-ghost"
                class="buttonWithImage"
                v-if="ageTo > 0"
                @click="ageTo--"
                rounded
                size="is-small"
                style="padding-bottom: 10px"
              >
                <img class="image" src="../assets/minus.png" />
              </b-button>

              <input
                class="ageField"
                v-model="ageTo"
                :disabled="!toggleAgeBetween"
              />
              <b-button
                v-if="toggleAgeBetween"
                type="is-ghost"
                class="buttonWithImage"
                @click="ageTo++"
                rounded
                size="is-small"
                style="padding-bottom: 10px"
              >
                <img class="image" src="../assets/plus.png" />
              </b-button>
              <b-button
                v-else
                type="is-ghost"
                class="buttonWithImage"
                rounded
                size="is-small"
                style="padding-bottom: 10px"
              >
                <img class="image" src="../assets/plus.png" />
              </b-button>
            </div>
            <p v-if="ageFrom >= ageTo && toggleAgeBetween">
              Starting age needs to be less than max age
            </p>
          </div>
        </section>
        <b-dropdown-item class="modal-card-foot" custom>
          <b-dropdown-item :focusable="false" custom>
            <b-button
              class="clearButton"
              label="Clear"
              type="is-secondary"
              @click="clearAgeForm"
            />
          </b-dropdown-item>
          <b-dropdown-item :focusable="false">
            <b-button
              class="saveButton"
              label="Save"
              type="is-primary"
              @click="saveForm"
            />
          </b-dropdown-item>
        </b-dropdown-item>
      </div>
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
export default {
  props: {
    ageOptions: Array,
  },
  data() {
    return {
      ageOpt: this.ageOptions,
      ageLess: 0,
      ageMore: 0,
      ageFrom: 0,
      ageTo: 0,
      toggleAgeLess: false,
      toggleAgeMore: false,
      toggleAgeBetween: false,
    };
  },
  methods: {
    saveForm: function () {
      if (this.toggleAgeLess) {
        this.ageOpt = [];
        this.ageOpt.push("Less than " + this.ageLess);
        this.$emit("updateAgeOptions", ["<", this.ageLess]);
      } else if (this.toggleAgeMore) {
        this.ageOpt = [];
        this.ageOpt.push("More than " + this.ageMore);
        this.$emit("updateAgeOptions", [">", this.ageMore]);
      } else if (this.toggleAgeBetween) {
        if (this.ageFrom < this.ageTo) {
          this.ageOpt = [];
          this.ageOpt.push("Ages between " + this.ageFrom + " - " + this.ageTo);
          this.$emit("updateAgeOptions", [this.ageFrom, "-", this.ageTo]);
        }
      } else {
        this.ageOpt = [];
        this.$emit("updateAgeOptions", this.ageOpt);
      }
    },
    clearAgeForm: function () {
      this.ageOpt = [];
      this.ageFrom = 0;
      this.ageLess = 0;
      this.ageMore = 0;
      this.ageTo = 0;
      this.toggleAgeLess = false;
      this.toggleAgeMore = false;
      this.toggleAgeBetween = false;
    },
    toggleSwitch: function (toggle) {
      if (toggle == "less") {
        this.toggleAgeMore = false;
        this.toggleAgeBetween = false;
      } else if (toggle == "more") {
        this.toggleAgeLess = false;
        this.toggleAgeBetween = false;
      } else if (toggle == "between") {
        this.toggleAgeLess = false;
        this.toggleAgeMore = false;
      }
      this.ageLess = 0;
      this.ageMore = 0;
      this.ageTo = 0;
      this.ageFrom = 0;
    },
    setAgeOpt: function () {
      this.ageOpt = [];
      this.ageOpt.push("Less than 3");
      this.$emit("updateAgeOptions", this.ageOpt);
    },
  },
};
</script>

<style>
.buttonWithImage {
  padding-bottom: 10px;
}
.and {
  margin-left: 60px;
}
.ageField {
  width: 30px;
}
.ageSelector {
  margin-top: 10px;
  width: 150px;
  height: 43px;
  padding-top: 10px;
  padding-bottom: 15px;
  background: #f2f0f7;
  border-radius: 8px;
}
.dropdownButton {
  min-width: 188px;
}
.saveButton {
  color: white !important;
  background-color: #1c007b !important;
}
.saveButton:hover {
  color: #1c007b !important;
  background-color: white !important;
  border-color: #1c007b !important;
}
.clearButton {
  color: #1c007b !important;
  background-color: white !important;
  border-color: #1c007b !important;
}
.clearButton:hover {
  color: white !important;
  background-color: #1c007b !important;
}
</style>
