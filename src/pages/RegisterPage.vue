<template>
  <div class="login-insert">
    <div class="info texto_centrado">
      <h3 class="justify-center">Registrar</h3>
    </div>
    <q-form
      @submit="btnUser.registerUser"
      @reset="btnUser.resetUser"
      class="q-gutter-md">

      <q-input
        filled
        v-model="btnUser.email"
        label="Link *"
        type="text"
        lazy-rules
        :rules="[
          val => val && val.length > 0 || 'Email obligatorio'
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

      <q-input
        filled
        type="password"
        v-model="btnUser.Rpassword"
        label="Contraseña *"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Escribe una contraseña valida',
          val => val && val.length >= 6 || 'Mas de 6 caracteres'
        ]"
      />

      <div>
        <q-btn label="Register" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm"/>
      </div>
    </q-form>
  </div>
</template>

<script>
import { ButtonUser } from "stores/bundle";

export default {

  name: 'RegisterPage',

  data() {
    return {
      btnUser: ButtonUser()
    }
  }
}
</script>

<style lang="css" scoped>
</style>
