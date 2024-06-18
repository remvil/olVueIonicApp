<template>
	<ion-page>
		<ion-tabs>
			<ion-router-outlet></ion-router-outlet>
			<ion-tab-bar slot="bottom" color="dark">
				<ion-tab-button tab="homepage" href="/tabs/home">
					<ion-icon aria-hidden="true" :icon="home" />
					<ion-label>Home</ion-label>
				</ion-tab-button>

				<ion-tab-button tab="navigate" href="/tabs/navigate">
					<ion-icon aria-hidden="true" :icon="navigate" />
					<ion-label>Map</ion-label>
				</ion-tab-button>

				<ion-tab-button tab="search" href="/tabs/search">
					<ion-icon :icon="list" />
					<ion-label>Assets</ion-label>
				</ion-tab-button>
			</ion-tab-bar>
		</ion-tabs>
	</ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { home, search, navigate, list } from 'ionicons/icons';
</script>
