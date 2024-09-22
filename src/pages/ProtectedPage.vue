<template>
  <div>
    <h3>Ruta protegida</h3>
    <p>{{ btnUser.token }}</p>
  </div>
</template>

<script>
import {ButtonUser} from "stores/bundle";

export default {
  name: 'ProtectedPage',
  components: {
  },
  data() {
    return {
      btnUser: ButtonUser()
    }
  }
}
</script>
