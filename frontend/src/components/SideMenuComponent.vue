<template>
	<ion-menu :type="`overlay`" content-id="main-content">
		<ion-header>
			<ion-toolbar>
				<ion-title>Profile</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content class="ion-padding">
			<ion-menu-toggle>
				<ion-button @click="handleLogout">Logout</ion-button>
			</ion-menu-toggle>
		</ion-content>
	</ion-menu>
</template>

<script setup lang="ts">
import { removeToken } from '@services/apiService';
import { IonContent, IonMenuToggle, IonButton, IonTitle, IonMenu, IonHeader, IonToolbar } from '@ionic/vue';

defineProps({
	name: String,
});

const handleLogout = () => {
	removeToken();
	window.location.href = '/login';
};	
</script>

<style scoped></style>
