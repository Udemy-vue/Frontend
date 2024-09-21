export const useUserStore = defineStore("user", {
  state: () => ({
      userData: "bluuweb",
      userInfo: {},
      loadingUser: false,
      loading: true,
      loadingSession: false,
      selectedKeys: ['2']
  }),
  getters: {
    minuscula(state) {
      return state.userData.toLowerCase();
    },
    mayusculaInicial(state) {
      return state.userData.replace(/\b\w/g, (match) => match.toUpperCase())
    },
    mayuscula(state) {
      return state.userData.toUpperCase();
    }
  }, 
  actions: {
    registro(name) {
      this.userData = name;
    },
    
    async registerUser(email, password) {
      this.loadingUser = true;
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        // console.log(user);
        this.userInfo = { email: user.email, uid: user.uid }
        this.loading = false;
        router.push("/");
      } catch (e) {
        console.log(e.code);
        return e.code
        this.userInfo = {};
      } finally {
        this.loadingUser = false;
      }
    },

    async loginUser(email, password) {
      this.loadingUser = true;
      try {
        const {user} = await signInWithEmailAndPassword(auth, email, password);
        this.loading = false;
        await this.setUser(user);
        router.push("/");
        return 'ok';
      } catch(e) {
        // statements
        this.userInfo = {};
        return e.code;
      } finally {
        this.loadingUser = false;
      }
    },

    async updateImg(image) {
      this.loadingUser = true;
      try {
        // console.log(image);
        const storageRef = ref(storage, `${this.userInfo.uid}/perfil`);
        await uploadBytes(storageRef, image.originFileObj);
        console.log(image.originFileObj);
        const photoURL = await getDownloadURL(storageRef);
        await updateProfile(auth.currentUser, {
          photoURL
        });
        this.setUser(auth.currentUser)
      } catch (e) {
        console.log(e);
        return e.code;
      } finally {
        this.loadingUser = false;
      }
    },

    async readImg() {
      try {
        // Crear la referencia en Firebase Storage
        const storageRef = ref(storage, `${this.userInfo.uid}/perfil`);

        // Obtener la URL de descarga para la imagen
        const downloadURL = await getDownloadURL(storageRef);

        // Mostramos la URL de la imagen obtenida
        console.log('URL de la imagen:', downloadURL);

        // Aquí podrías retornar la URL o usarla para actualizar la vista
        return downloadURL;
      } catch (e) {
        console.error('Error al leer la imagen:', e);
        return e.code;
      }
    },

    async updateUser(displayName) {
      this.loadingUser = true;
      try {
        await updateProfile(auth.currentUser, {
          displayName,
        });
        this.setUser(auth.currentUser);
      } catch (e) {
        console.log(e);
        return e.code;
      } finally {
        this.loadingUser = false;
      }
    },

    async setUser(user) {
      try {
        const docRef = doc(db, "users", user.uid);
        // const docSpan = await getDoc(docRef);
        this.userInfo = {
          email: user.email,
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL
        };
        await setDoc(docRef, this.userInfo);
      } catch (e) {
        console.log(e)
      }
    },

    async signOutUser() {
      this.loadingUser = true;
      try {
        router.push("/login");
        await auth.signOut();
        // this.userInfo = {};
        this.loading = true;
      } catch(e) {
        // statements
        console.log(e);
      } finally {
        // statements
        this.loadingUser = false;
      }
    },

    currentUser() {
      return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
            // await this.setUser(user);
            this.userInfo = {
              email: user.email,
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL
            };
          } else {
            this.userInfo = {};
            useDatabaseStore().$reset();
          }
          resolve(user);
        }, (error) => {
          console.error('Error en onAuthStateChanged:', error);
          reject(error);
        });

        // Dependiendo de tus necesidades, puedes o no querer desuscribirte inmediatamente.
        // Si lo haces, solo recibirás el primer cambio y luego dejarás de escuchar.
        // Si no lo haces, seguirás escuchando cambios hasta que el componente
        // sea destruido o hasta que desactives manualmente el listener.
        // unsubscribe();
      });
    },

    validation(error){
      return errorAutentication[error]
    },
    fault(error) {
      // console.log(error);
      message
          .loading('Verificando credenciales...', .5)
          .then(() => {
            if (error) {
              message.success('Imagen valida', 2.5);
            } else {
              message.error('Imagen no valida', 2.5);
            }
          });
    },

    Home() {
      router.push('/')
    }
  }
});