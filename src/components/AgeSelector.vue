<template>
  <b-dropdown>
    <template #trigger="{ active }">
      <b-button
        class="dropdownButton"
        size="is-medium"
        type="is-secondary"
        :icon-right="active ? 'menu-up' : 'menu-down'"
      >
        <p v-if="ageOpt.length == 0">All</p>
        <p v-else>{{ ageOpt[0] }}</p>
      </b-button>
    </template>
    <b-dropdown-item
      aria-role="list-item"
      :focusable="false"
      custom
      class="ageSelector"
    >
      <template>
        <div class="header">
          <b class="ageText">Age in</b>
          <b-dropdown
            v-model="currentMenu"
            aria-role="list"
            class="timeSelector"
          >
            <template #trigger>
              <b-button
                :label="currentMenu"
                icon-right="menu-down"
                class="timeSelectorButton"
              />
            </template>

            <b-dropdown-item
              v-for="(menu, index) in menus"
              :key="index"
              :value="menu"
              aria-role="listitem"
            >
              <div class="media">
                <div class="media-content">
                  <h3>{{ menu }}</h3>
                </div>
              </div>
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </template>
    </b-dropdown-item>
    <hr class="dropdown-divider" aria-role="menuitem" />
    <b-dropdown-item
      aria-role="list-item"
      :focusable="false"
      custom
      class="cardBody"
    >
      <div class="modal-card" style="width: 335px">
        <section class="modal-card-body">
          <span class="ageSelector">
            <input
              type="radio"
              v-model="radio"
              :value="'less'"
              @click="checkRadioStatus('less')"
            />
            <p class="ageTextRadio">Ages less than</p>

            <b-numberinput
              :controls="false"
              v-model="ageLess"
              :disabled="radio != 'less'"
              class="ageField1"
            />
          </span>
        </section>
        <hr class="dropdown-divider" aria-role="menuitem" />
        <section class="modal-card-body">
          <span class="ageSelector">
            <input
              type="radio"
              v-model="radio"
              :value="'more'"
              @click="checkRadioStatus('more')"
            />
            <p class="ageTextRadio">Ages higher than</p>

            <b-numberinput
              outlined
              :controls="false"
              class="ageField2"
              v-model="ageMore"
              :disabled="radio != 'more'"
            />
          </span>
        </section>
        <hr class="dropdown-divider" aria-role="menuitem" />
        <section class="modal-card-body">
          <span class="ageBetweenContainer">
            <input
              type="radio"
              v-model="radio"
              :value="'between'"
              @click="checkRadioStatus('between')"
            />
            <p class="ageTextRadio">Ages between</p>

            <b-numberinput
              :controls="false"
              class="ageFieldBetween"
              v-model="ageFrom"
              :disabled="radio != 'between'"
            />
            <b-numberinput
              :controls="false"
              class="ageFieldBetween"
              v-model="ageTo"
              :disabled="radio != 'between'"
            />
          </span>
          <p v-if="ageFrom >= ageTo && radio == 'between'">
            Starting age needs to be less than max age
          </p>
        </section>
        <b-dropdown-item class="modal-card-foot" custom>
          <b-dropdown-item :focusable="false" custom>
            <b-button
              class="clearButton"
              label="Clear"
              type="is-primary"
              outlined
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
      currentMenu: "Year(s)",
      menus: ["Year(s)", "Month(s)", "Week(s)", "Day(s)"],
      radio: "",
    };
  },
  methods: {
    saveForm: function () {
      if (this.radio == "less") {
        this.ageOpt = [];
        this.ageOpt.push("Less than " + this.ageLess + " " + this.currentMenu);
        this.$emit("updateAgeOptions", {
          ageOption: "<",
          age: this.ageLess,
          ageUnit: this.currentMenu,
        });
      } else if (this.radio == "more") {
        console.log("here");
        this.ageOpt = [];
        this.ageOpt.push(
          "Higher than " + this.ageMore + " " + this.currentMenu
        );
        this.$emit("updateAgeOptions", {
          ageOption: ">",
          age: this.ageMore,
          ageUnit: this.currentMenu,
        });
      } else if (this.radio == "between") {
        if (this.ageFrom < this.ageTo) {
          this.ageOpt = [];
          this.ageOpt.push(
            "Ages between " +
              this.ageFrom +
              " - " +
              this.ageTo +
              " " +
              this.currentMenu
          );
          this.$emit("updateAgeOptions", {
            ageOption: "-",
            age: [this.ageFrom, this.ageTo],
            ageUnit: this.currentMenu,
          });
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
      this.radio = "";
    },
    checkRadioStatus: function (toggle) {
      console.log(toggle + " r " + this.radio);
      if (toggle == this.radio) {
        this.radio = "";
      } else {
        this.radio = toggle;
      }

      this.ageFrom = 0;
      this.ageLess = 0;
      this.ageMore = 0;
      this.ageTo = 0;
    },
  },
};
</script>

<style>
.ageTextRadio {
  margin-left: 5px;
}
.ageBetweenContainer {
  display: inline-flex;
  flex-flow: row wrap;
  align-items: center;
}
.ageSelector {
  border-radius: 8px;
  display: inline-flex;
  flex-flow: row wrap;
  align-items: center;
}
#buttonWithImage {
  flex-grow: 4;
}
.dropdownButton {
  min-width: 188px;
}

.saveButton:hover {
  color: #1c007b !important;
  background-color: transparent !important;
  border-color: #1c007b !important;
}

.header {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.ageText {
  margin-left: 22.8px;
}
.timeSelectorButton {
  width: 289px;
  margin-left: 10px;
  border-color: #1c007b;
}
.timeSelector {
  padding-left: 10px;
}
.ageFieldBetween {
  width: 90px;
  margin-left: 10px;
  border-color: #1c007b !important;
}
.ageField1 {
  width: 90px;
  margin-left: 110px;
  border-color: #1c007b !important;
}
.ageField2 {
  width: 90px;
  margin-left: 93px;
}
.modal-card-body {
  min-width: 410px;
}

.cardBody {
  min-width: 410px;
}
</style>
