<template>
  <b-dropdown ref="dropdown">
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
                v-if="currentMenu == false"
                :label="'Select unit of time'"
                icon-right="menu-down"
                class="timeSelectorButton"
              />
              <b-button
                v-else
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
      <div class="modal-card" style="width: 409px">
        <span class="ageSelector">
          <input
            id="moreRadio"
            type="radio"
            v-model="radio"
            :value="'more'"
            @click="checkRadioStatus('more')"
          />
          <label for="moreRadio" class="ageTextRadio"><b>More than</b></label>

          <b-numberinput
            outlined
            :controls="false"
            class="ageField2"
            v-model="ageMore"
            :disabled="radio != 'more'"
          />
        </span>

        <hr class="dropdown-divider" aria-role="menuitem" />
        <span class="ageSelector">
          <input
            id="lessRadio"
            type="radio"
            v-model="radio"
            :value="'less'"
            @click="checkRadioStatus('less')"
          />
          <label for="lessRadio" class="ageTextRadio"><b>Less than</b></label>

          <b-numberinput
            :controls="false"
            v-model="ageLess"
            :disabled="radio != 'less'"
            class="ageField1"
          />
        </span>

        <hr class="dropdown-divider" aria-role="menuitem" />

        <span class="ageSelector">
          <input
            id="betweenRadio"
            type="radio"
            v-model="radio"
            :value="'between'"
            @click="checkRadioStatus('between')"
          />
          <label for="betweenRadio" class="ageTextRadio"><b>Between</b></label>

          <b-numberinput
            :controls="false"
            class="ageFieldBetween"
            v-model="ageFrom"
            :disabled="radio != 'between'"
          />
          <b-numberinput
            :controls="false"
            class="ageFieldBetween1"
            v-model="ageTo"
            :disabled="radio != 'between'"
          />
        </span>
        <p v-if="ageFrom >= ageTo && radio == 'between'">
          Starting age needs to be less than max age
        </p>

        <hr class="dropdown-divider" aria-role="menuitem" />

        <span class="ageSelectorFooter">
          <!-- has link is needed to disable background color change when hovering on item -->

          <b-button
            class="clearButton"
            label="Clear"
            type="is-primary"
            outlined
            @click="clearAgeForm"
          />
          <b-dropdown-item :focusable="false" :has-link="true">
            <b-button
              class="saveButton"
              label="Save"
              type="is-primary"
              @click="saveForm"
            />
          </b-dropdown-item>
        </span>
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
      currentMenu: false,
      menus: ["Year(s)", "Month(s)", "Week(s)", "Day(s)"],
      radio: "",
    };
  },
  methods: {
    saveForm: function () {
      if (this.currentMenu != false) {
        if (this.radio == "less") {
          this.ageOpt = [];
          this.ageOpt.push(
            "Less than " + this.ageLess + " " + this.currentMenu
          );
          this.$emit("updateAgeOptions", {
            ageOption: "<",
            age: this.ageLess,
            ageUnit: this.currentMenu,
          });
        } else if (this.radio == "more") {
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
        this.$refs.dropdown.toggle();
      }
    },
    clearAgeForm: function () {
      this.ageOpt = [];
      this.ageFrom = 0;
      this.ageLess = 0;
      this.ageMore = 0;
      this.ageTo = 0;
      this.radio = "";
      this.toggleAgeLess = false;
      this.toggleAgeMore = false;
      this.toggleAgeBetween = false;
      this.currentMenu = false;
      this.$emit("updateAgeOptions", {
        ageOption: "",
        age: "",
        ageUnit: "",
      });
    },
    checkRadioStatus: function (toggle) {
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
.ageText {
  margin-right: 26px;
}
.ageTextRadio {
  margin-left: 5px;
  width: 115px;
}
.ageBetweenContainer {
  display: inline-flex;
  flex-flow: row wrap;
  align-items: center;
  margin-left: 20px;
}
.ageSelector {
  display: inline-flex;
  flex-flow: row wrap;
  align-items: center;
  margin-left: 20px;
}

.dropdownButton {
  min-width: 350px;
}

.saveButton:hover {
  color: #1c007b !important;
  background-color: transparent !important;
  border-color: #1c007b !important;
}
.saveButton {
  width: 167px;
}
.clearButton {
  margin-right: 23px;
  width: 167px;
}
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.timeSelectorButton {
  width: 289px;
  border-color: #1c007b;
}

.ageFieldBetween {
  width: 90px;
  margin-left: 35px;
  border-color: #1c007b !important;
}

.ageFieldBetween1 {
  width: 90px;
  margin-left: 10px;
  border-color: #1c007b !important;
}
.ageField1 {
  width: 90px;
  margin-left: 135px;
  border-color: #1c007b !important;
}
.ageField2 {
  width: 90px;
  margin-left: 135px;
  border-color: #1c007b !important;
}
.modal-card-body {
  max-width: 409px;
}
.cardBody {
  max-width: 409px;
}
.ageSelectorFooter {
  display: inline-flex;
  flex-flow: row wrap;
  align-items: center;
  margin-left: 20px;
}
.dropdown-time {
  color: #1d1d1b !important;
}
</style>
