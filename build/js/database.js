export const useDatabaseStore = defineStore('database', {
	state: () => ({
		documents: [],
		loadingDoc: false,
		userUid: ''
	}),
	getters: {

	},
	actions: {
		async getUrls() {
			if (this.documents.length !== 0) {
				return;
			}
			this.loadingDoc = true;
			this.documents = [];
			try {
				const q = query(collection(db, 'urls'),
					where("user", "==", auth.currentUser.uid));
				const querySnapshot = await getDocs(q)
				// console.log(querySnapshot);
				querySnapshot.forEach((doc) => {
					// console.log(doc.id, doc.data());
					this.documents.push({
						id: doc.id,
						...doc.data()
					});
				});
				 // console.log(this.documents);
			} catch(e) {
				// statements
				console.log(e);
			} finally {
				// statements
				this.loadingDoc = false;
			}
		},
		signOutUser() {
			this.documents = [];
		},
		lectura(texto) {
			console.log("hola a todos", texto)
		},
		async addUrl(name) {
			this.loadingDoc = true;
			try {
				const objetoDoc = {
					name: name,
					short: nanoid(6),
					user: auth.currentUser.uid
				};
				const docRef = await addDoc(collection(db, "urls"), objetoDoc);
				// console.log(docRef);
				this.documents.push({
					...objetoDoc,
					id: docRef.id
				});
			} catch(e) {
				// statements
				console.log(e);
			} finally {
				// statements<
				this.loadingDoc = false;
			}
		},
		async deleteUrl(id) {
			this.loadingDoc = true;
			try {
				const docRef = await doc(db, "urls", id);
				const docSnap = await getDoc(docRef);

				if (!docSnap.exists()) {
					throw new Error('no existe el documentos');
				}
				if(docSnap.data().user !== auth.currentUser.uid) {
					throw new Error('no existe el documentos');
				}
				await deleteDoc(docRef);
				this.documents = this.documents.filter(item => item.id !== id);
				const success = (error) => {
					message
						.loading('Verificando credenciales...', 1)
						.then(() => {
							if (error === 'ok') {
								message.success('Dato Eliminado', 2.5);
							} else {
								message.error(this.useUser.validation(error), 2.5);
							}
						});
				};
				success('ok');
			} catch(e) {
				// statements
				console.log(e);
			} finally {
				// statements
				this.loadingDoc = false;
			}
		},

		async readUrl() {
			this.loadingDoc = true;
			try {
				const docRef = await doc(db, "urls", this.userUid);
				const docSnap = await getDoc(docRef);

				if (!docSnap.exists()) {
					throw new Error('no existe el documentos');
				}
				if(docSnap.data().user !== auth.currentUser.uid) {
					throw new Error('no existe el documentos');
				}
				return docSnap.data().name;
			} catch(e) {
				// statements
				console.log(e);
			} finally {
				// statements
				this.loadingDoc = false;
			}
		},

		async updateUrl(name){
			// console.log(name);
			this.loadingDoc = true;
			try {
				const docRef = await doc(db, "urls", this.userUid);
				const docSnap = await getDoc(docRef);

				if (!docSnap.exists()) {
					throw new Error('no existe el documentos');
				}
				if(docSnap.data().user !== auth.currentUser.uid) {
					throw new Error('no existe el documentos');
				}
				await updateDoc(docRef, { name: name });
				this.documents = this.documents.map((item) => 
					item.id === this.userUid ? { ...item, name: this.userUid } : item
				);
				router.push("/");
			} catch(e) {
				// statements
				console.log(e);
			} finally {
				// statements
				this.loadingDoc = false;

			}
		},
		returnData() {
			this.loadingDoc = true;

			try {
				// statements
				router.push('/');
			} catch(e) {
				// statements
				console.log(e);
			} finally {
				this.loadingDoc = false;
				// statements
			}
		}
	}
})