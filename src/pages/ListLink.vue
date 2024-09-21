<template>
  <div class="q-pa-md row items-start link-card">
    <q-card class="my-card">
      <q-btn class="btn-card" @click="useUrl.OpenLink(link)">
        <q-card-section class="bg-teal text-white text-info">
          <div class="text-h6">{{ link.nanoLink }}</div>
          <div class="text-subtitle2">{{ link.longLink }}</div>
        </q-card-section>
      </q-btn>

      <q-card-actions align="around">
        <q-btn flat @click="useUrl.EditLink(link, item)">
          <q-icon name="edit_document" color="primary" size="2em" />
        </q-btn>
        <q-btn flat @click="useUrl.Delete(link, item)">
          <q-icon name="delete" class="text-red" size="2em" />
        </q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>


import {useUrlStore} from "stores/bundle";

export default {
  name: 'ListLink',
  props: {
    link: {
      type: Object,
      required: true,
      default: () => ({})
    },
    item: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      useUrl: useUrlStore()
    }
  }
}
</script>

<style lang="css" scoped>
</style>
