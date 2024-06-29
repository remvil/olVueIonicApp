<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>Asset Locator</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content class="ion-padding ion-center">
			<br /><br />
			<img :src="logoPath" class="login-logo" alt="Logo">
			<form @submit.prevent="handleLogin">
				<ion-item>
					<ion-input label-placement="stacked" label="Username" placeholder="" v-model="credentials.username">
						<ion-icon slot="start" :icon="personCircle" aria-hidden="true"></ion-icon>
					</ion-input>
				</ion-item>
				<ion-item>
					<ion-input :type="passwordFieldType" label-placement="stacked" label="Password" placeholder=""
						v-model="credentials.password">
						<ion-icon slot="start" :icon="lockClosed" aria-hidden="true"></ion-icon>
						<ion-button fill="clear" slot="end" aria-label="Show/hide" @click="togglePasswordVisibility">
							<ion-icon slot="icon-only" :icon="passwordFieldType === 'password' ? eye : eyeOff"
								aria-hidden="true"></ion-icon>
						</ion-button>
					</ion-input>
				</ion-item>
				<br />
				<ion-button expand="block" type="submit">Login</ion-button>
				<ion-button expand="block" @click="presentToast('bottom', 'testo di esempio')">Present Toast At the
					Top</ion-button>

			</form>
		</ion-content>
	</ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useIonRouter, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonInput, IonItem, IonButton } from '@ionic/vue';
import { eye, eyeOff, lockClosed, personCircle } from 'ionicons/icons';
import { login } from '@/services/apiService';
import { TextFieldTypes } from '@ionic/core';
import type { ExtAPIResponse } from '../models/apiResponses';
import { presentToast } from '@/services/ionicComponentsService';


const credentials = ref({ username: '', password: '' });
const router = useIonRouter();
const logoPath = '/img/login-logo.png'; // Sostituisci con il percorso della tua immagine
const passwordFieldType = ref<TextFieldTypes>('password');

const handleLogin = async () => {

	try {
		const loginResp = await login(credentials.value);
		const { msg, code }: ExtAPIResponse = JSON.parse(loginResp);
		if (code === -1) {
			presentToast('bottom', msg, 'warning');
		}
		if (code === 200) {
			presentToast('middle', msg, 'success')
			router.push('/tabs/navigate');
		}
	} catch (error) {
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
