<template>
  <div class="tile is-parent is-15">
    <div class="tile is-child box">
      <article class="media">
        <div class="media-left">
          <div class="content">
            <p class="title is-size-5">{{ beacon.organization.name }}</p>
            <p class="subtitle is-6">{{ beacon.name }}</p>
            <p class="subtitle is-6">{{ beacon.description }}</p>
          </div>
        </div>

        <div class="media-body">
          Beacon API Web Server based on the GA4GH Beacon API
        </div>
        <div class="media-right">
          <small
            ><a
              v-bind:href="beacon.organization.url"
              :title="
                'Visit ' + beacon.organization.name + ' organisation website'
              "
              >Visit Us</a
            >
            ·
            <a
              v-bind:href="beacon.url"
              :title="'Visit ' + beacon.name + ' Beacon API'"
              >Beacon API</a
            >
            ·
            <a
              v-bind:href="beacon.contactUrl"
              :title="beacon.organization.name + '\'s contact address'"
              >Contact Us</a
            >
          </small>
          <b-button
            :data-testid="beaconId"
            @click="displayResults"
            class="show-more"
            :title="
              !display ? 'Show detailed response' : 'Hide detailed response'
            "
            >View details</b-button
          >
        </div>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  props: ["beacon"],
};
</script>
<style scoped>
#versionTag {
  margin-right: auto;
}
a {
  color: #1c007b;
}
</style>
