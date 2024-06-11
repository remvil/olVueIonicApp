<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">Naviga</ion-title>
				</ion-toolbar>
			</ion-header>

			<!-- Map and other components -->
			<ol-map class="map-container" style="height: 90vh" :loadTilesWhileAnimating="true"
				:loadTilesWhileInteracting="true">
				<ol-view ref="view" :center="center" :rotation="rotation" :zoom="zoom" :projection="projection" :minZoom="19"
					@change:center="centerChanged" @change:resolution="resolutionChanged" @change:rotation="rotationChanged" />
				<!-- Layer group and other layers -->
				<ol-layer-group :opacity="1">
					<!-- Other layers -->
					<ol-webgl-vector-layer :styles="webglLineStylePerimetro">
						<ol-source-vector :format="geoJson" crossOrigin="anonymous" :url="perimetroGeojsonUrl" />
					</ol-webgl-vector-layer>
				</ol-layer-group>
			</ol-map>

			<ul>
				<li>center: {{ currentCenter }}</li>
				<li>resolution: {{ currentResolution }}</li>
				<li>zoom: {{ currentZoom }}</li>
				<li>rotation: {{ currentRotation }}</li>
			</ul>
		</ion-content>
	</ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { fetchGeoJson } from '@/services/apiService';
import type { ObjectEvent } from 'ol/Object';
import type { View } from 'ol';
import proj4 from 'proj4';

// Proiezione e centri
const projection = ref('EPSG:3857');
const center = ref([1652960.865991945, 4958960.611020285]);
const zoom = ref(21);
const rotation = ref(0);

const currentCenter = ref(center.value);
const currentZoom = ref(zoom.value);
const currentRotation = ref(rotation.value);
const currentResolution = ref(0);

// Formati e stili
const geoJson = new format.GeoJSON();
const webglLineStyle = { 'stroke-width': 3, 'stroke-color': 'rgba(255,6,34,0.7)' };
const webglLineStylePerimetro = { 'stroke-width': 3, 'stroke-color': 'rgba(255,6,34,0.7)' };

// GeoJson data
const perimetroGeojsonUrl = ref(null);
onMounted(async () => {
	try {
		const data = await fetchGeoJson('map');
		perimetroGeojsonUrl.value = `data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data))}`;
	} catch (error) {
		console.error('Errore durante la richiesta API:', error);
	}
});

// Gestione degli eventi di mappa
function resolutionChanged(event: any) {
	currentResolution.value = event.target.getResolution();
	currentZoom.value = event.target.getZoom();
}
function centerChanged(event: any) {
	currentCenter.value = event.target.getCenter();
}
function rotationChanged(event: any) {
	currentRotation.value = event.target.getRotation();
}
</script>

<style scoped>
/* Styles */
ion-content {
	ion-toolbar {
		--background: #D62828;

		ion-title {
			place-content: center;
			font-size: 1.4rem;
		}
	}

	ul {
		font-weight: 600;
		font-size: 12px;
		padding-left: 1rem;

		li {
			list-style-type: none;
		}
	}
}


.ol-map {
	position: relative;
	background: repeating-linear-gradient(45deg, #dde1ce, #dde1ce 10px, #d7d7d7 10px, #d7d7d7 20px);
}
</style>
