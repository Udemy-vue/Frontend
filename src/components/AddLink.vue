<template>
  <q-form
    v-if="btnUser.token"
    @submit="useUrl.createLink"
    @reset="useUrl.resetUser"
    class="q-gutter-md">

    <q-input
      filled
      v-model="useUrl.longLink"
      label="Link *"
      type="text"
      lazy-rules
      :rules="[
        val => val && val.length > 0 || 'Link Obligatorio',
         val => /^(https?:\/\/)?([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})(\/\S*)?$/.test(val) || 'Link no válido'
      ]"/>
    <div>
      <q-btn label="Save" type="submit" color="primary"/>
      <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm"/>
    </div>
  </q-form>
</template>

<script>
import {ButtonUser, useUrlStore} from "stores/bundle";

export default {
  name: 'AddLink',
  data() {
    return {
      btnUser: ButtonUser(),
      useUrl: useUrlStore()
    }
  }
}
</script>

<style lang="css" scoped>
</style>
