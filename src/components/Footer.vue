<template>
  <footer class="footer">
    <!-- Upper Footer -->
    <div class="footerContainer centered">
      <div class="content">
        <div class="columns">
          <div
            class="column"
            title="ELIXIR Beacon Network website internal navigation"
          >
            <div class="footer_container">
              <div>
                <ul class="list">
                  <li>
                    <router-link
                      class="is-underlined"
                      data-testid="quide"
                      to="/guide"
                      title="About us"
                      >About us</router-link
                    >
                  </li>
                  <li>
                    <router-link
                      class="is-underlined"
                      data-testid="join"
                      to="/join"
                      title="Contact"
                      >Contact</router-link
                    >
                  </li>
                  <li>
                    <router-link
                      class="is-underlined"
                      data-testid="docs"
                      to="/docs"
                      title="Help"
                      >Help</router-link
                    >
                  </li>
                </ul>
              </div>
              <div class="right_container">
                <ul class="list">
                  <li>
                    <router-link
                      class="is-underlined"
                      data-testid="apiDocs"
                      to="/docsapi"
                      title="Accessibility"
                      >Accessibility</router-link
                    >
                  </li>
                  <li>
                    <router-link
                      class="is-underlined"
                      data-testid="accessibility"
                      to="/accessibility"
                      title="Datasets"
                      >Datasets</router-link
                    >
                  </li>
                  <li>
                    <router-link
                      class="is-underlined"
                      data-testid="accessibility"
                      to="/accessibility"
                      title="Link to webpage"
                      >Link to webpage</router-link
                    >
                  </li>
                </ul>
              </div>
              <div class="footerText">
                Bigpicture will set up the first European, ethical- and General
                Data Protection Regulation-compliant, quality-controlled and
                community-based platform, in which both large-scale data and
                Artificial Intelligence (AI) algorithms will coexist.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "footer-bar",
};
</script>

<style lang="scss" scoped>
.footerText {
  color: #1c007b;
  padding-left: 300px;
}
.list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 20px;

  width: 120px;
  height: 100px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
}
.footer_container {
  display: flex;
}
.footer .footerContainer.centered h5 {
  color: #1c007b;
  padding-bottom: 5px;
  border-bottom: solid 1px #1c007b;
  width: 50%;
  min-width: 300px;
}
.footer .footerContainer.centered ul {
  margin: 0;
  padding: 0;
}
.footer .footerContainer.centered ul li {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.footer .footerContainer.centered ul li a {
  color: #1c007b;
}
.footer .footerContainer.centered ul li a:hover {
  color: #004d8c;
}
.footer a {
  color: #1c007b;
}
.footer a:hover {
  color: #f47d21;
}
.footer .footerContainer.centered {
  padding: 2rem 0;
  max-width: 1200px;
  margin: 0 auto;
}
.footer .footerContainer.centered .is-one-fifth {
  text-align: center;
}
.footer .footerContainer + .footerContainer {
  background: #023452;
  padding-left: 3rem;
  padding-right: 3rem;
}
.footer .footerContainer + .footerContainer .content {
  max-width: 1200px;
  margin: 0 auto;
}
.footerContainer .contact {
  text-align: right;
}
.footerContainer .contact p {
  margin: 0;
}
.flag {
  height: 30px;
  float: left;
  margin: 5px 10px 0 0;
}
.footer-heading {
  color: #1c007b;
  border-bottom: solid 1px #fff;
  font-weight: 700;
  font-size: 16px;
}
</style>
