<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>Hospital Assets</ion-title>
			</ion-toolbar>
		</ion-header>

		<ion-content class="ion-padding">
			<ol-map :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" style="height: 400px">
				<ol-view ref="view" :center="center" :zoom="zoom" :projection="projection" />

				<ol-tile-layer>
					<ol-source-osm />
				</ol-tile-layer>

				<ol-interaction-select @select="featureSelected" :condition="selectCondition" :filter="selectInteactionFilter">
					<ol-style>
						<ol-style-stroke color="blue" :width="20"></ol-style-stroke>
						<ol-style-fill color="rgba(255,255,255,0.5)"></ol-style-fill>
						<ol-style-circle :radius="10">
							<ol-style-fill color="#3333ffff"></ol-style-fill>
						</ol-style-circle>
					</ol-style>
				</ol-interaction-select>


				<ol-vector-layer>
					<ol-source-vector ref="cities"
						url="https://raw.githubusercontent.com/alpers/Turkey-Maps-GeoJSON/master/tr-cities-airports.json"
						:format="geoJson" :projection="projection">
					</ol-source-vector>

					<ol-style>
						<ol-style-stroke color="red" :width="2"></ol-style-stroke>
						<ol-style-fill color="rgba(255,255,255,0.1)"></ol-style-fill>
						<ol-style-circle :radius="7">
							<ol-style-fill color="red"></ol-style-fill>
						</ol-style-circle>
					</ol-style>
				</ol-vector-layer>

				<!-- OVERLAY POSITION -->
				<ol-overlay :position="selectedCityPosition" v-if="selectedCityName != ''">
					<template v-slot="slotProps">
						<div class="overlay-content">
							{{ selectedCityName }}
						</div>
					</template>
				</ol-overlay>
			</ol-map>

		</ion-content>
	</ion-page>
</template>

<script setup lang="ts">
import { ref, inject } from "vue";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';

const center = ref([40, 40]);
const projection = ref("EPSG:4326");
const zoom = ref(8);
const format = inject("ol-format");
const geoJson = new format.GeoJSON();


const extent = inject("ol-extent");
const selectedCityPosition = ref([]);
const selectedCityName = ref("");
const selectConditions = inject("ol-selectconditions");
const selectCondition = selectConditions.pointerMove;

const featureSelected = (event: any) => {
	if (event.selected.length == 1) {
		console.log(event.selected[0].values_.name)

		selectedCityPosition.value = extent.getCenter(
			event.selected[0].getGeometry().extent_,
		);
		selectedCityName.value = event.selected[0].values_.name;
	} else {
		selectedCityName.value = "";
	}
};

const selectInteactionFilter = (feature: { values_: { name: undefined; }; }) => {
	return feature.values_.name != undefined;
};

</script>

<style>
#map {
	width: 100%;
	height: 400px;
}

.overlay-content {
	background-color: white;
	padding: 1rem;
	margin: 20px 0px 0px -40px;
	border-radius: 5px;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}
</style>