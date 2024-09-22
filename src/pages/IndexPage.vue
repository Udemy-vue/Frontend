<template>
  <q-page padding class="home-insert">
    <div class="info texto_centrado">
      <h3 class="justify-center">Home</h3>
    </div>
    <add-link/>
    <div class="list-links">
      <list-link v-for="(index, item) in useUrl.links" :key="item" :link="index" :item="item"/>
    </div>
    <div class="q-pa-lg flex flex-center">
    <q-pagination
      v-if="btnUser.token"
      v-model="useUrl.current"
      :max="useUrl.size"
      direction-links
      @update:model-value="useUrl.onPageChange"
    />
  </div>
  </q-page>
</template>

<script>
import {defineComponent, ref} from 'vue';
import {ButtonUser, useUrlStore} from "stores/bundle";
import AddLink from "components/AddLink.vue";
import ListLink from "pages/ListLink.vue";

export default defineComponent({
  name: 'IndexPage',
  components: {
    AddLink,
    ListLink
  },
  data() {
    return {
      useUrl: useUrlStore(),
      btnUser: ButtonUser(),
      addLink: AddLink,
      listLink: ListLink
    }
  },
  methods: {},
  mounted() {
    if (this.btnUser.token) this.useUrl.loadLink();
  }
});
</script>
