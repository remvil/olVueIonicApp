<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>Home page</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">Home page</ion-title>
				</ion-toolbar>
			</ion-header>
			<HomeContainer size="small" name="This app helps you navigate inside buildings and find rooms and objects." />
		</ion-content>
	</ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import HomeContainer from '@/components/HomeContainer.vue';
</script>

<style scoped>
.welcome-page {
	--ion-background-color: #f0f0f0;
	/* Colore di sfondo della pagina */
}

.welcome-container {
	text-align: center;
	/* Centra il contenuto */
}

.app-logo {
	width: 150px;
	height: 150px;
	margin-bottom: 20px;
}

/* Stili per il testo */
.ion-text-center {
	text-align: center;
}

.ion-padding-top {
	padding-top: 20px;
}

.ion-padding {
	padding: 0 20px;
}
</style>