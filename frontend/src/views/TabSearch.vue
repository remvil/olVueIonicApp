<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large"> Naviga </ion-title>
				</ion-toolbar>
			</ion-header>

			<ol-map class="map-container" style="height: 90vh" :loadTilesWhileAnimating="true"
				:loadTilesWhileInteracting="true">
				<ol-view ref="view" :center="absoluteCenter" :rotation="rotation" :zoom="zoom" :minZoom="18"
					:projection="projection" @change:center="centerChanged" @change:resolution="resolutionChanged"
					@change:rotation="rotationChanged" />

				<ol-layer-group :opacity="1">
					<!-- Mappa Layer 0 -->
					<ol-tile-layer>
						<!-- <ol-source-osm crossOrigin="anonymous" /> -->
					</ol-tile-layer>

					<ol-vector-layer>
						<ol-source-vector :format="geoJson" crossOrigin="anonymous" :features="planimetriaFeatures" />
						<ol-style>
							<ol-style-fill :color="mapColor" />
							<ol-style-stroke color="rgba(5, 6, 34, 0.9)" width="1" />
						</ol-style>
					</ol-vector-layer>

					<!-- Features assets -->
					<ol-webgl-vector-layer :styles="webglAssetsStyle">
						<ol-source-vector :format="geoJson" crossOrigin="anonymous" :features="assetsFeatures" />
					</ol-webgl-vector-layer>

					<!-- <ol-rotate-control></ol-rotate-control> -->
					<!-- Event handler Drag -->
					<ol-interaction-pointer @down="log('⬇️ down', $event)" @up="log('⬆️ up', $event)"
						@drag="log('🤚🏽 drag', $event)" @move="log('🚗 move', $event)" />

					<ol-interaction-link />

					<!-- Geolocation -->
					<ol-geolocation :projection="projection" @change:fakePosition="geoLocChange">
						<template>
							<ol-vector-layer :zIndex="2">
								<ol-source-vector>
									<ol-feature ref="positionFeature">
										<ol-geom-point :coordinates="fakePosition"></ol-geom-point>
										<ol-style>
											<ol-style-icon :src="here" :scale="0.1"></ol-style-icon>
										</ol-style>
									</ol-feature>
								</ol-source-vector>
							</ol-vector-layer>
						</template>
					</ol-geolocation>
				</ol-layer-group>
			</ol-map>

			<ul>
				<li>center : {{ currentCenter }}</li>
				<li>resolution : {{ currentResolution }}</li>
				<li>zoom : {{ currentZoom }}</li>
				<li>rotation : {{ currentRotation }}</li>
			</ul>
		</ion-content>
	</ion-page>
</template>

<script setup lang="ts">
import { ref, inject, onMounted } from "vue";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { fetchGeoJson } from '@/services/apiService';
import type { Feature, MapBrowserEvent, View } from "ol";
import { Geometry } from "ol/geom";
import type { ObjectEvent } from "ol/Object";
// import proj4 from "proj4";

// Map Init Settings
const projection = ref("EPSG:3857"); //  EPSG:4326 or EPSG:3857
const zoom = ref(20);
const rotation = ref(0);
const fakePosition = ref([1652955.865991945, 4958950.611020285]); // Fake position Infotel
const currentCenter = ref(fakePosition.value);
const absoluteCenterPosition = ref([1652940.865991945, 4958940.611020285]); // Fake position Infotel
const absoluteCenter = ref(absoluteCenterPosition.value);
const currentZoom = ref(zoom.value);
const currentRotation = ref(rotation.value);
const currentResolution = ref(0);

// GeoJson data
const planimetriaFeatures = ref<Feature<Geometry>[]>([]);
const assetsFeatures = ref<Feature<Geometry>[]>([]);
// const pathFeatures = ref<Feature<Geometry>[]>([]);

// Setup properties geoJSON
const format = inject("ol-format");
const geoJson = new format.GeoJSON();

// Stili elementi GeoJSON
const mapColor = ref('rgba(0, 255, 0, 0.5)'); // Green with 50% opacity

const webglAssetsStyle = {
	"stroke-width": 10,
	"stroke-color": "rgba(255,6,34,0.9)",
};
// const webglPathStyle = {
// 	"stroke-width": 3,
// 	"stroke-color": "rgba(255,255,34,0.5)",
// };
// Effettua una chiamata API quando il componente viene montato
onMounted(async () => {
	try {
		// Setup Planimetria
		const planimetriaData = await fetchGeoJson('map');
		const planFeatures = geoJson.readFeatures(planimetriaData, {
			featureProjection: 'EPSG:3857'
		});
		planimetriaFeatures.value = planFeatures as Feature<Geometry>[];

		// Setup Assets
		const assetsData = await fetchGeoJson('assets');
		const assFeatures = geoJson.readFeatures(assetsData, {
			featureProjection: 'EPSG:3857'
		});
		assetsFeatures.value = assFeatures as Feature<Geometry>[];

	} catch (error) {
		console.error('Errore durante la richiesta API:', error);
	}
});

// Point - geolocalizzazione
const here = ref("imgs/here.png");
const view = ref<View>();
const geoLocChange = (event: ObjectEvent) => {
	console.log("geoLocChange: ", event);
};

const log = (type: string, event: MapBrowserEvent<UIEvent>) => {
	console.log(type, event);
};

function resolutionChanged(event: any) {
	currentResolution.value = event.target.getResolution();
	currentZoom.value = event.target.getZoom();
}
function centerChanged(event: any) {
	currentCenter.value = event.target.getCenter();
	// Limit movement over 50 meters from absolute Center
	const maxDistance = 50; // meters
	const newCenter = event.target.getCenter();
	const distance = Math.sqrt(
		Math.pow(newCenter[0] - fakePosition.value[0], 2) +
		Math.pow(newCenter[1] - fakePosition.value[1], 2)
	);
	console.log(distance);

	if (distance > maxDistance) {
		event.target.setCenter(currentCenter.value);
	} else {
		currentCenter.value = absoluteCenter.value;
	}
}
function rotationChanged(event: any) {
	currentRotation.value = event.target.getRotation();
}

// TODO Date una lista di Feature prende la boundary box
// 
// getGeoJsonBBox();
// function getGeoJsonBBox() {
// 	const features = [[14.8488468, 40.6370796], [14.848775, 40.6371295], [14.8487435, 40.637102], [14.8487334, 40.6371086], [14.8487234, 40.6371005], [14.8487113, 40.6371086], [14.8486295, 40.6370394], [14.8486147, 40.6370476], [14.8485933, 40.6370283], [14.8485779, 40.6370374], [14.848435, 40.6369178], [14.8484612, 40.6369005], [14.8484196, 40.6368644], [14.8484947, 40.6368089], [14.8485001, 40.6368135], [14.848537, 40.6367871], [14.8485564, 40.6368033], [14.8486047, 40.6367713], [14.8487267, 40.6369097], [14.8487576, 40.6368873], [14.848891, 40.6370466], [14.8488468, 40.6370796]];
// 	let minLon = 1000;
// 	let minLat = 1000;
// 	let maxLon = 0;
// 	let maxLat = 0;
// 	features.forEach(element => {
// 		minLon = (element[0] < minLon) ? element[0] : minLon;
// 		minLat = (element[1] < minLat) ? element[1] : minLat;
// 		maxLon = (element[0] > maxLon) ? element[0] : maxLon;
// 		maxLat = (element[1] > maxLat) ? element[1] : maxLat;
// 	});
// 	// console.log([minLon, minLat, maxLon, maxLat]);
// 	console.log(proj4("EPSG:4326", "EPSG:3857", [minLon, minLat]));
// 	console.log(proj4("EPSG:4326", "EPSG:3857", [maxLon, maxLat]));
// }

</script>

<style scoped>
ion-content {
	ion-toolbar {
		--background: #D62828;

		ion-title {
			place-content: center;
			font-size: 1.4rem;
		}

		--toolbar-content {
			--background: grey;
			align-items: center;
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
	background: repeating-linear-gradient(45deg,
			#dde1ce,
			#dde1ce 10px,
			#d7d7d7 10px,
			#d7d7d7 20px);
}
</style>