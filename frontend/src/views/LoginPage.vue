<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Asset Locator</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding ion-center">
			<br/><br/>
      <img :src="logoPath" class="login-logo" alt="Logo">
      <form @submit.prevent="handleLogin">
				<ion-item>
					<ion-input label-placement="stacked" label="Username" placeholder="" v-model="credentials.username">
						<ion-icon slot="start" :icon="personCircle" aria-hidden="true"></ion-icon>
					</ion-input>
				</ion-item>
				<ion-item>
          <ion-input :type="passwordFieldType" label-placement="stacked" label="Password" placeholder="" v-model="credentials.password">
            <ion-icon slot="start" :icon="lockClosed" aria-hidden="true"></ion-icon>
            <ion-button fill="clear" slot="end" aria-label="Show/hide" @click="togglePasswordVisibility">
              <ion-icon slot="icon-only" :icon="passwordFieldType === 'password' ? eye : eyeOff" aria-hidden="true"></ion-icon>
            </ion-button>
          </ion-input>
        </ion-item>
				<br/>
        <ion-button expand="block" type="submit">Login</ion-button>
      </form>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useIonRouter, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonInput, IonItem, IonButton } from '@ionic/vue';
import { eye, eyeOff, lockClosed, personCircle } from 'ionicons/icons';
import { login, setToken, getToken } from '@/services/apiService';
import { TextFieldTypes } from '@ionic/core';

const credentials = ref({ username: '', password: '' });
const router = useIonRouter();
const logoPath = '/img/login-logo.png'; // Sostituisci con il percorso della tua immagine
const passwordFieldType = ref<TextFieldTypes>('password');

const handleLogin = async () => {
  try {
    await login(credentials.value);
    const token = getToken(); // Ottieni il token dall'api
    if (token) {
      setToken(token); // Setta il token
      router.push('/tabs/navigate'); 
    } else {
      // Se il token non è stato impostato, ricarica la pagina
      // router.push({ path: router.currentRoute.value.path });
    }
  } catch (error) {
    // Gestisci l'errore di login, ad esempio ricaricando la pagina
    // router.push({ path: router.currentRoute.value.path });
    console.error(error);
  }
};

const togglePasswordVisibility = () => {
  passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password';
};
</script>

<style>
.login-logo {
  display: block;
  margin: 0 auto;
  padding: 20px 0;
  max-width: 150px;
}
.content-center {
	display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
