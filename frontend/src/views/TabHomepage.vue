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

			<HomeContainer name="Homepage text name component property" />
		</ion-content>
	</ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import HomeContainer from '@/components/HomeContainer.vue';
</script>
