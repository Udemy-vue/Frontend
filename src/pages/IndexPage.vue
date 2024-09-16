<template>
  <q-page padding>
<!--    <q-btn @click="access">{{ button }}</q-btn>-->
    <q-btn @click="btnUser.access">{{ btnUser.button }}</q-btn>
    <div>
      <label>Token: </label>
      <p>{{ btnUser.token }}</p>
    </div>
    <div>
      <label>expiresIn: </label>
      <p>{{ btnUser.expiresIn }}</p>
    </div>
    <q-form v-if="btnUser.token != ''">
      <q-input v-model="btnUser.longLink" />
      <q-btn @click="btnUser.createLink">Ingresar</q-btn>
    </q-form>
  </q-page>
</template>

<script>
import {defineComponent, ref} from 'vue';
import { ButtonUser } from "stores/bundle";

export default defineComponent({
  name: 'IndexPage',
  components: {
    // ButtonUser
  },
  data() {
    return {
      button: ref('ingresar'),
      counter: 0,
      btnUser: ButtonUser()
    }
  },
  methods: {
    access() {
      // console.log('Click realizado!');
      this.counter++;
      this.button = ref(`ingresar ${this.counter}`);
    }
  },
  mounted() {
    this.btnUser.refreshToken();
  }
});
</script>
