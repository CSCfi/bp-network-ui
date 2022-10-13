<template>
  <div class="tile is-parent is-15">
    <div class="tile is-child box">
      <article class="media">
        <div class="media-left">
          <div class="content">
            <p class="title is-size-6">{{ beacon.organization.name }}</p>
            <p class="subtitle is-6">{{ beacon.name }}</p>
          </div>
        </div>

        <div class="media-body">
          <div class="beaconDetail">
            <p class="subtitle is-6">{{ beacon.description }}</p>
          </div>
        </div>
        <div class="media-right">
          <small class="links"
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
          <b-button class="view_details" :title="'Show detailed response'"
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
#versionTag {
  margin-right: auto;
}
a {
  color: #1c007b;
}
.links {
  margin-left: 20px;
}
.view_details {
  margin-left: 40px;
}
</style>
