<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>Ospedale Assets</ion-title>
			</ion-toolbar>
		</ion-header>

		<ion-content class="ion-padding">
			<ion-list lines="full">
				<ion-item v-for="asset in hospitalAssets" :key="asset.id">
					<ion-icon :icon="cube" slot="start"></ion-icon>
					<ion-label>{{ asset.name }}</ion-label>
					<ion-button slot="end" @click="doAction(asset)">
						<ion-icon aria-hidden="true" :icon="arrowForward" />
					</ion-button>
				</ion-item>
			</ion-list>
		</ion-content>
	</ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonIcon, IonLabel, IonButton } from '@ionic/vue';
import { arrowForward, cube } from 'ionicons/icons';

export default {
	components: {
		IonPage,
		IonHeader,
		IonToolbar,
		IonTitle,
		IonContent,
		IonList,
		IonItem,
		IonIcon,
		IonLabel,
		IonButton
	},
	data() {
		return {
			hospitalAssets: [
				{ id: 1, name: 'ECG', icon: 'pulse' },
				{ id: 2, name: 'Scanner CT', icon: 'scan' },
				{ id: 3, name: 'MRI Machine', icon: 'magnet' },
				{ id: 4, name: 'X-ray Machine', icon: 'scan-circle' },
				{ id: 5, name: 'Ultrasound Machine', icon: 'thermometer' },
				{ id: 6, name: 'Defibrillator', icon: 'heart' },
				{ id: 7, name: 'Ventilator', icon: 'cloud' },
				{ id: 8, name: 'Anesthesia Machine', icon: 'flask' },
				{ id: 9, name: 'Blood Gas Analyzer', icon: 'water' },
				{ id: 10, name: 'Surgical Microscope', icon: 'search-circle' },
				{ id: 11, name: 'Infusion Pump', icon: 'water-drop' },
				{ id: 12, name: 'Patient Monitor', icon: 'monitor' },
				{ id: 13, name: 'Autoclave', icon: 'flask-outline' },
				{ id: 14, name: 'Sphygmomanometer', icon: 'thermometer-outline' },
				{ id: 15, name: 'Stethoscope', icon: 'medical' },
				{ id: 16, name: 'Endoscope', icon: 'search-circle-outline' },
				{ id: 17, name: 'Spirometer', icon: 'infinite' },
				{ id: 18, name: 'Electrocardiograph', icon: 'pulse-outline' },
				{ id: 19, name: 'Fetal Doppler', icon: 'heart-outline' },
				{ id: 20, name: 'Laboratory Centrifuge', icon: 'flask-sharp' },
			]

		};
	},
	methods: {
		doAction(asset) {
			// Azione da eseguire quando si preme il pulsante accanto all'asset
			console.log(`Esegui azione per ${asset.name}`);
			// Puoi implementare qui la logica per gestire l'azione specifica per ciascun asset
		}
	}
};
</script>

<style scoped>
/* Aggiungi stili personalizzati se necessario */
</style>
