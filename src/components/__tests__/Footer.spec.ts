import { mount, shallowMount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import Footer from "@/components/Footer.vue";

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

const wrapper = mount(Footer, {
  localVue,
  router,
});

describe("Footer.vue internal links", () => {
  it('"How to use Beacon Network" router-link works', async () => {
    const link = wrapper.find("[data-testid=quide]");

    expect(link.exists()).toBe(true);
    link.trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$route.fullPath).toBe("/guide");
  });
  it('"Join the Network" router-link works', async () => {
    const link = wrapper.find("[data-testid=join]");

    expect(link.exists()).toBe(true);
    link.trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$route.fullPath).toBe("/join");
  });
  it('"For Developers" router-link works', async () => {
    const link = wrapper.find("[data-testid=docs]");

    expect(link.exists()).toBe(true);
    link.trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$route.fullPath).toBe("/docs");
  });
  it('"API Documentation" router-link works', async () => {
    const link = wrapper.find("[data-testid=apiDocs]");

    expect(link.exists()).toBe(true);
    link.trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$route.fullPath).toBe("/docsapi");
  });
  it('"Accessibility Statement" router-link works', async () => {
    const link = wrapper.find("[data-testid=accessibility]");

    expect(link.exists()).toBe(true);
    link.trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$route.fullPath).toBe("/accessibility");
  });
});