import axios from 'axios';
import { defineStore } from "pinia";
import { api, nano, links } from "boot/axios";
import {ref} from "vue";
import Router from "src/router";
import {useRouter} from "vue-router";
import {Notify, useQuasar} from "quasar";
// import { auth, db, storage } from "../../firebaseConfig";
// import { createUserWithEmailAndPassword,
// 		signInWithEmailAndPassword,
// 		onAuthStateChanged,
// 		signOut, updateProfile} from "firebase/auth";
// import { collection, query, where, getDoc,
// 		getDocs, addDoc, deleteDoc, doc,
// 		updateDoc, setDoc } from 'firebase/firestore';
// import { getDownloadURL, uploadBytes, ref } from 'firebase/storage'
// import router from '../router';
// import { nanoid } from 'nanoid';
// import { errorAutentication } from "../../src/Constans";
// import { message } from "ant-design-vue";

const privateUser = defineStore('private', {
  state: () => ({
    $q: useQuasar()
  }),
  actions: {

    // Función privada para manejar errores
    _handleError(e) {
      let message = '';
      if (!e.response) {
        if (e.request) {
          message = e.request;
        } else {
          message = e.message;
        }
      } else {
        message = e.response.data.error;
        console.log(e.response.status);
      }
      console.log(e.config);
      this._showNotif('top',
        {message, type: 'warning'});
    },

    _setSessionToken(token, expiresIn) {
      this.token = token;
      this.expiresIn = expiresIn;
      this.counter = ref(true);
      sessionStorage.setItem('user', 'true');
      this.router.push('/');
    },

    _showNotif(position, alerts) {
      const {textColor, multiLine, icon, message, avatar, type} = alerts;
      this.$q.notify({
        type,
        timeout: 1500,
        progress: true,
        icon,
        textColor,
        message,
        position,
        avatar,
        multiLine
      });
    }
  }
});

export const ButtonUser = defineStore('button', {
  state: () => ({
    button: ref('Registrar'),
    counter: ref(false),
    token: ref(''),
    expiresIn: ref(0),
    // longLink: ref(''),
    email: ref('penelope@test.com'),
    password: ref('123123'),
    Rpassword: ref('123123'),
    router: useRouter(),
  }),

  actions: {
    // Función privada para establecer el token de sesión
    async access() {
      try {
        const res = await api.post('login', {
          "email": this.email,
          "password": this.password
        });
        privateUser()._setSessionToken(res.data.token, res.data.expiresIn);
        this._setTime();
        this.resetUser();
        privateUser()._showNotif(
          'top',
          {message: 'Usuario Valido', type: 'positive', icon: 'login'});
      } catch (e) {
        privateUser()._handleError(e);
      }
    },

    async registerUser() {
      try {
        const res = await api.post('register', {
          "email": this.email,
          "password": this.password,
          "repassword": this.Rpassword
        });
        privateUser()._setSessionToken(res.data.token, res.data.expiresIn);
        this._setTime();
        this.resetUser();
        privateUser()._showNotif(
          'top',
          {message: 'Usuario Registrado', type: 'positive', icon: 'how_to_reg'});
      } catch (e) {
        privateUser()._handleError(e);
      }
    },

    resetUser() {
      this.email = ref('');
      this.password = ref('');
      this.Rpassword = ref('');
    },

    async refreshToken() {
      try {
        // console.log('refresh');
        const res = await api.get('refresh');
        this.token = res.data.token;
        this.counter = ref(true);
        this.expiresIn = res.data.expiresIn;
        this._setTime();
      } catch (e) {
        console.log(e);
        sessionStorage.removeItem('user')
      }
    },

    _setTime() {
      setTimeout(() => {
        this.refreshToken();
      }, this.expiresIn * 1000 - 6000)
    },

    async logout() {
      try {
        await api.get("logout");
        this.router.push('/login');
      } catch (e) {
        console.log(e);
      } finally {
        this.resetStore();
        this.counter = ref(false);
        sessionStorage.removeItem('user')
      }
    },

    resetStore() {
      this.token = null;
      this.expiresIn = null;
    }
  }
});

export const useUrlStore = defineStore('url',  {
  state: () => ({
    longLink: ref(''),
    links: ref([]),
    current: ref(1),
    size: ref(1),
    $q: useQuasar()
  }),
  actions: {
    async createLink() {
      // console.log(this.longLink)
      try {
        const res = await links({
          method: "POST",
          url: "ok",
          headers: {
            Authorization: "Bearer " + ButtonUser().token,
          },
          data: {
            longLink: this.longLink
          }
        });
        // console.log(res.data);
        this.links.push(res.data.newLink);
        privateUser()._showNotif(
          'top',
          {message: 'Link Registrado', type: 'info', icon: 'add_circle'});
      } catch (e) {
        console.log(e.response.data || e);
      }
    },

    async loadLink() {
      try {
        const res = await links({
          url: 'ok',
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + ButtonUser().token
          }
        });
        // console.log(res.data);
        this.links = res.data.links.map((item) => {
          return {
            longLink: item.longLink,
            nanoLink: item.nanoLink,
            uid: item.uid,
            _id: item._id
          }
        });
        // console.log(this.links);
      } catch (e) {
        console.log(e);
      }
    },

    onPageChange() {
      console.log(this.current);
    },

    async Delete(link, item) {
      try {
        this.$q.dialog({
          title: 'Eliminar',
          message: 'Desea eliminar este dato!',
          cancel: true,
          persistent: true
        }).onOk(async () => {
          // console.log('>>>> OK')
          await links({
            url: `ok/${link._id}`,
            method: 'DELETE',
            headers: {
              Authorization: 'Bearer ' + ButtonUser().token
            }
          });
          this.links.splice(item, 1);
          privateUser()._showNotif(
            'top',
            {message: 'Link Eliminado', type: 'negative', icon: 'delete'});
        })

      } catch (e) {
        console.log(e);
      }
    },

    async EditLink(link, item) {
      try {
        this.$q.dialog({
          title: 'Editar',
          message: 'Actualiza el link registrado',
          prompt: {
            model: link.longLink,
            isValid: val => val.length > 2, // << here is the magic
            type: 'text' // optional
          },
          cancel: true,
          persistent: true
        }).onOk(async data => {
          await links({
            url: `ok/${link._id}`,
            method: 'PATCH',
            headers: {
              Authorization: 'Bearer ' + ButtonUser().token
            },
            data: { longLink: data }
          });
          this.links[item].longLink = data;
          privateUser()._showNotif(
            'top',
            {message: 'Link Editado', type: 'info', icon: 'edit_document'});
        })
      } catch (e) {
        console.log(e)
      }
    },

    async OpenLink(link) {
      try {
        const res = await links({
          url: link.nanoLink,
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + ButtonUser().token
          }
        });
        // console.log(res.data);
        window.open(res.data.longLink, '_blank');
        // console.log(this.links);
      } catch (e) {
        console.log(e);
      }
    },

    logout() {
      this.longLink = ref('');
      this.links = ref([]);
      this.current = ref(1);
      this.size = ref(1);
    },

    resetUser() {
      this.longLink = ref('');
    }
  }
})
