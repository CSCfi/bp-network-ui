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
            <p class="footer-heading">Big Picture Beacon Network</p>
            <ul>
              <li>
                <router-link
                  data-testid="quide"
                  to="/guide"
                  title="A guide on how to user the Beacon Network user interface"
                  >How to use Beacon Network</router-link
                >
              </li>
              <li>
                <router-link
                  data-testid="join"
                  to="/join"
                  title="How to register a new Beacon to ELIXIR Beacon Network"
                  >Join the Network</router-link
                >
              </li>
              <li>
                <router-link
                  data-testid="docs"
                  to="/docs"
                  title="Technical documentation for web and API developers"
                  >For Developers</router-link
                >
              </li>
              <li>
                <router-link
                  data-testid="apiDocs"
                  to="/docsapi"
                  title="Technical documentation of advanced API usage"
                  >API Documentation</router-link
                >
              </li>
              <li>
                <router-link
                  data-testid="accessibility"
                  to="/accessibility"
                  title="Accessibility statement"
                  >Accessibility Statement</router-link
                >
              </li>
            </ul>
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
.footer {
  background: #f2f0f7;
  color: white;
  padding: 0;

  margin-top: auto;
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
  color: #f47d21;
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
