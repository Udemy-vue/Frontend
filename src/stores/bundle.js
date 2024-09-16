import axios from 'axios';
import { defineStore } from "pinia";
import { api, nano, links } from "boot/axios";
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

export const ButtonUser = defineStore('button', {
  state: () => ({
    button: 'Registrar',
    counter: 0,
    token: '',
    expiresIn: 0,
    longLink: ''
  }),
  actions: {
    async access() {
      try {
        const res = await api.post('login', {
          "email": " penelope@test.com ",
          "password": "123123"
        });
        this.token = res.data.token;
        this.expiresIn = res.data.expiresIn;
        this.setTime();
      } catch (e) {
        console.log(e);
      }
    },

    async refreshToken() {
      try {
        const res = await api.get('refresh');
        this.token = res.data.token;
        this.expiresIn = res.data.expiresIn;
        this.setTime();
      } catch (e) {
        console.log(e);
      }
    },

    setTime() {
      setTimeout(() => {
        this.refreshToken();
      }, this.expiresIn * 1000 - 6000)
    },

    async createLink() {
      // console.log(this.longLink)
      try {
        const res = await links({
          method: "POST",
          url: "ok",
          headers: {
            Authorization: "Bearer " + this.token,
          },
          data: {
            longLink: this.longLink
          }
        });
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }
  }
});

//# sourceMappingURL=bundle.js.map
