<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>Hospital Assets</ion-title>
			</ion-toolbar>
		</ion-header>

		<ion-content class="ion-padding">
			<ion-searchbar placeholder="Search an asset..." :debounce="500" v-model="searchTerm"></ion-searchbar>
			<ion-list lines="full">
				<ion-item v-for="asset in filteredAssets" :key="asset.id" @click="doAction(asset)">
					<ion-icon size="small" :icon="pricetag" slot="start"></ion-icon>
					<ion-label>{{ asset.name }}</ion-label>
					<ion-button slot="end" color="none">
						<ion-icon :icon="chevronForward" color="medium" />
					</ion-button>
				</ion-item>
			</ion-list>
			<ion-modal :is-open="isModalOpen" @didDismiss="closeModal">
				<template #default>
					<ion-header>
						<ion-toolbar>
							<ion-title>{{ selectedAsset?.name }}</ion-title>
							<ion-buttons slot="end">
								<ion-button @click="closeModal">
									<ion-icon :icon="close" color="medium" />
								</ion-button>
							</ion-buttons>
						</ion-toolbar>
					</ion-header>
					<ion-content class="ion-padding">
						<p><strong>ID:</strong> {{ selectedAsset?.id }}</p>
						<p><strong>Tag ID:</strong> {{ selectedAsset?.tagid }}</p>
						<p><strong>Description:</strong> {{ selectedAsset?.description }}</p>
						<p><strong>Floor:</strong> {{ selectedAsset?.floor }}</p>
					</ion-content>
					<ion-footer>
						<ion-toolbar>
							<ion-button expand="block" @click="navigateToPageMap" color="warning">
								<ion-icon :icon="navigateCircle" size="large" color="dark" />
							</ion-button>
						</ion-toolbar>
					</ion-footer>
				</template>
			</ion-modal>
		</ion-content>
	</ion-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonIcon, IonLabel, IonButton, IonSearchbar, IonModal, IonButtons } from '@ionic/vue';
import { chevronForward, pricetag, close, navigateCircle } from 'ionicons/icons';
import router from '@/router';

interface HospitalAsset {
	id: number;
	tagid: string;
	name: string;
	description: string;
	floor: number;
}

const searchTerm = ref('');
const fakeDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue. Eu ultrices vitae auctor eu augue ut lectus arcu bibendum. Et molestie ac feugiat sed lectus vestibulum mattis ullamcorper. Pretium quam vulputate dignissim suspendisse in. Nibh tortor id aliquet lectus proin.";
const hospitalAssets = ref<HospitalAsset[]>([
	{ id: 1, tagid: '1a2b3c4d', name: 'ECG', description: fakeDescription, floor: 4 },
	{ id: 2, tagid: '5e6f7g8h', name: 'Scanner CT', description: fakeDescription, floor: 4 },
	{ id: 3, tagid: '9i0j1k2l', name: 'MRI Machine', description: fakeDescription, floor: 2 },
	{ id: 4, tagid: '3m4n5o6p', name: 'X-ray Machine', description: fakeDescription, floor: 2 },
	{ id: 5, tagid: '7q8r9s0t', name: 'Ultrasound Machine', description: fakeDescription, floor: 4 },
	{ id: 6, tagid: '1u2v3w4x', name: 'Defibrillator', description: fakeDescription, floor: 4 },
	{ id: 7, tagid: '5y6z7a8b', name: 'Ventilator', description: fakeDescription, floor: 4 },
	{ id: 8, tagid: '9c0d1e2f', name: 'Anesthesia Machine', description: fakeDescription, floor: 4 },
	{ id: 9, tagid: '3g4h5i6j', name: 'Blood Gas Analyzer', description: fakeDescription, floor: 2 },
	{ id: 10, tagid: '7k8l9m0n', name: 'Surgical Microscope', description: fakeDescription, floor: 4 },
	{ id: 11, tagid: '1o2p3q4r', name: 'Infusion Pump', description: fakeDescription, floor: 4 },
	{ id: 12, tagid: '5s6t7u8v', name: 'Patient Monitor', description: fakeDescription, floor: 2 },
	{ id: 13, tagid: '9w0x1y2z', name: 'Autoclave', description: fakeDescription, floor: 4 },
	{ id: 14, tagid: '3a4b5c6d', name: 'Sphygmomanometer', description: fakeDescription, floor: 4 },
	{ id: 15, tagid: '7e8f9g0h', name: 'Stethoscope', description: fakeDescription, floor: 4 },
	{ id: 16, tagid: '1i2j3k4l', name: 'Endoscope', description: fakeDescription, floor: 4 },
	{ id: 17, tagid: '5m6n7o8p', name: 'Spirometer', description: fakeDescription, floor: 4 },
	{ id: 18, tagid: '9q0r1s2t', name: 'Electrocardiograph', description: fakeDescription, floor: 4 },
	{ id: 19, tagid: '3u4v5w6x', name: 'Fetal Doppler', description: fakeDescription, floor: 4 },
	{ id: 20, tagid: '7y8z9a0b', name: 'Laboratory Centrifuge', description: fakeDescription, floor: 4 }
]);

const filteredAssets = computed(() => {
	return hospitalAssets.value.filter(asset =>
		asset.name.toLowerCase().includes(searchTerm.value.toLowerCase())
	);
});

const isModalOpen = ref(false);
const selectedAsset = ref<HospitalAsset | null>(null);

function doAction(asset: HospitalAsset) {
	selectedAsset.value = asset;
	isModalOpen.value = true;
}

function closeModal() {
	isModalOpen.value = false;
	selectedAsset.value = null;
}

function navigateToPageMap() {
	closeModal();
	router.push('/tabs/navigate');
}

</script>

<style scoped>
/* Aggiungi stili personalizzati se necessario */
</style>
