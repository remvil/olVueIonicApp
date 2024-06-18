<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="small"> Floor 4 </ion-title>
				</ion-toolbar>
			</ion-header>

			<ol-map class="map-container" style="height: 90vh" :loadTilesWhileAnimating="true"
				:loadTilesWhileInteracting="true">
				<ol-view ref="view" :center="absoluteCenter" :rotation="rotation" :zoom="zoom" :minZoom="1"
					:projection="projection" @change:center="centerChanged" @change:resolution="resolutionChanged"
					@change:rotation="rotationChanged" />
				<button class="btn-map btn-locate" type="button" @click="changeCenter()">
					<ion-icon aria-hidden="true" :icon="locate" />
				</button>
				<button class="btn-map btn-layers" id="open-action-sheet">
					<ion-icon aria-hidden=" true" :icon="layers" />
				</button>
				<ol-layer-group :opacity="1">
					<!-- <ol-tile-layer>
						<ol-source-osm crossOrigin="anonymous" />
					</ol-tile-layer> -->

					<!-- BBox Layer -->
					<ol-webgl-vector-layer :styles="[webglBBStyle]">
						<ol-source-vector :format="geoJson" crossOrigin="anonymous" url="geojson/battipagliabbox.geojson" />
					</ol-webgl-vector-layer>


					<!-- Planimetry Layer -->
					<ol-vector-layer>
						<ol-source-vector :format="geoJson" crossOrigin="anonymous" :features="planimetriaFeatures" />
						<ol-style>
							<ol-style-stroke color="rgba(5, 6, 34, 0.5)" width="1" dash="true" />
						</ol-style>
					</ol-vector-layer>

					<!-- Features path Layer-->
					<ol-vector-layer>
						<ol-source-vector :format="geoJson" crossOrigin="anonymous" :features="pathFeatures" />
						<ol-style>
							<ol-style-stroke color="rgba(255,6,34,0.9)" width="2" :lineDash="[2, 5]" />
						</ol-style>
					</ol-vector-layer>

					<!-- Features assets Layer -->
					<ol-vector-layer>
						<ol-source-vector :format="geoJson" crossOrigin="anonymous" :features="assetsFeatures"
							:projection="projection">
						</ol-source-vector>
						<ol-style>
							<ol-style-circle :radius="8" color="green">
								<ol-style-fill color="#00aaffff"></ol-style-fill>
								<ol-style-stroke color="#0077ffff" width="4"></ol-style-stroke>
							</ol-style-circle>
						</ol-style>

					</ol-vector-layer>

					<!-- <ol-rotate-control></ol-rotate-control> -->
					<!-- Event handler Drag -->
					<!-- <ol-interaction-pointer @down="log('⬇️ down', $event)" @up="log('⬆️ up', $event)"
						@drag="log('🤚🏽 drag', $event)" @move="log('🚗 move', $event)" /> -->

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
			<ion-action-sheet trigger="open-action-sheet" header="Actions" :buttons="actionSheetButtons"></ion-action-sheet>
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
import { Feature, View } from "ol";
import { Geometry } from "ol/geom";
import type { ObjectEvent } from "ol/Object";
import { locate, layers } from 'ionicons/icons';


// Map Init Settings
const projection = ref("EPSG:3857"); //  EPSG:4326 or EPSG:3857
const zoom = ref(22);
const rotation = ref(0);
// const fakePosition = ref([1652955.865991945, 4958950.611020285]); // Fake position Infotel Salerno
// const absoluteCenterPosition = ref([1652940.865991945, 4958940.611020285]); // Absolute position Infotel Salerno

const fakePosition = ref([1666762.63257, 4956026.94507]); // Fake position Infotel Battipaglia
const currentCenter = ref(fakePosition.value);
const absoluteCenterPosition = ref([1666763.27053, 4956024.30346]); // Absolute position Infotel Battipaglia
const absoluteCenter = ref(absoluteCenterPosition.value);
const currentZoom = ref(zoom.value);
const currentRotation = ref(rotation.value);
const currentResolution = ref(0);

// Location and geolocalitation settings
const here = ref("imgs/here.png");
const view = ref<View>();
const geoLocChange = (event: ObjectEvent) => {
	console.log("geoLocChange: ", event);
};

const changeCenter = () => {
	view.value?.setCenter(absoluteCenter.value);
}

// Features refs for rendering
const planimetriaFeatures = ref<Feature<Geometry>[]>([]);
const assetsFeatures = ref<Feature<Geometry>[]>([]);
const pathFeatures = ref<Feature<Geometry>[]>([]);

// Setup properties geoJSON
const format = inject("ol-format");
const geoJson = new format.GeoJSON();

// Styles GeoJSON
const webglBBStyle = {
	"stroke-width": 2,
	"stroke-color": "rgba(100,100,100,0.4)",
	"fill-color": "#F3EFF5CC",
};

// Makes some API call when component is mounted
onMounted(async () => {
	try {
		// Setup Planimetry
		// const planimetriaData = await fetchGeoJson('map/salerno');
		const planimetriaData = await fetchGeoJson('map/battipaglia/plan4');
		const planFeatures = geoJson.readFeatures(planimetriaData, {
			featureProjection: 'EPSG:3857'
		});
		planimetriaFeatures.value = planFeatures as Feature<Geometry>[];

		// Setup Assets
		const assetsData = await fetchGeoJson('assets/battipaglia');
		const assFeatures = geoJson.readFeatures(assetsData, {
			featureProjection: 'EPSG:3857'
		});
		assetsFeatures.value = assFeatures as Feature<Geometry>[];

		// Setup Path
		const pathData = await fetchGeoJson('path/battipaglia/plan4');
		const pathFeats = geoJson.readFeatures(pathData, {
			featureProjection: 'EPSG:3857'
		});
		pathFeatures.value = pathFeats as Feature<Geometry>[];

	} catch (error) {
		console.error('Errore durante la richiesta API:', error);
	}
});
// const log = (type: string, event: MapBrowserEvent<UIEvent>) => {
// 	console.log(type, event);
// };

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

	if (distance > maxDistance) {
		event.target.setCenter(currentCenter.value);
	} else {
		currentCenter.value = absoluteCenter.value;
	}
}
function rotationChanged(event: any) {
	currentRotation.value = event.target.getRotation();
}

const actionSheetButtons = [
	{
		text: 'Floor 1',
		data: {
			action: 'cancel',
		},
	},
	{
		text: 'Floor 2',
		role: 'destructive',
		data: {
			action: 'cancel',
		},
	},
	{
		text: 'Floor 3',
		data: {
			action: 'cancel',
		},
	},
	{
		text: 'Floor 4',
		data: {
			action: 'cancel',
		},
	},
	{
		text: 'Cancel',
		role: 'cancel',
		data: {
			action: 'cancel',
		},
	},
];
</script>

<style scoped>
ion-content {
	ion-toolbar {
		--background: #FF5555;
		--color: #283044;

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
			#fffafa,
			#fffafa 10px,
			#ffffff 10px,
			#ffffff 20px);
}

.btn-map {
	position: absolute;
	z-index: 9;
	background: var(--ol-background-color);
	border-radius: 3px;
	border: 1px solid lightgray;
	width: 35px;
	height: 35px;
	font-size: 1.5rem;
	padding: 0.24rem;

	ion-icon {
		color: var(--ol-subtle-foreground-color)
	}
}

.btn-locate {
	left: 8px;
	top: 78px;
}

.btn-layers {
	right: 8px;
	top: 6px;
}
</style>