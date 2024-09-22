<template>
  <div class="login-insert">
    <div class="info texto_centrado col-12 col-sm-6 col-md-5">
      <h3 class="justify-center">Login</h3>
    </div>

    <q-form
      @submit="btnUser.access"
      @reset="btnUser.resetUser"
      class="q-gutter-md">

      <q-input
        filled
        v-model="btnUser.email"
        label="Email *"
        type="email"
        lazy-rules
        :rules="[
          val => val && val.length > 0 || 'Email obligatorio',
          val => /.+@.+\..+/.test(val) || 'Email no valido'
        ]"
      />

      <q-input
        filled
        type="password"
        v-model="btnUser.password"
        label="Contraseña *"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Escribe una contraseña valida',
          val => val && val.length >= 6 || 'Mas de 6 caracteres'
        ]"
      />

      <div>
        <q-btn label="Login" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm"/>
      </div>
    </q-form>
  </div>
</template>

<script>
import { ButtonUser } from "stores/bundle";

export default {

  name: 'loginPage',
  components: {
    // ButtonUser
  },
  data () {
    return {
      btnUser: ButtonUser()
    }
  },
  mounted() {
    // this.btnUser.private._prueba();
  }
}
</script>

<style lang="css" scoped>
</style>
