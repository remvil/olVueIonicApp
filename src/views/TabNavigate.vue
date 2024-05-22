<template>

	<ion-page>
		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large"> Naviga </ion-title>
				</ion-toolbar>
			</ion-header>

			<!-- <form>
				<label for="zoom" style="width: 50px; margin-left: 10px;">Zoom:</label>
				<input type="number" id="zoom" v-model="zoom" style="width: 50px; margin-left: 5px;" />
				<label for="rotation" style="width: 50px; margin-left: 10px;">Rotation:</label>
				<input type="number" id="rotation" v-model="rotation" style="width: 50px; margin-left: 5px;" />
			</form> -->

			<ol-map class="map-container" style="height: 70vh" :loadTilesWhileAnimating="true"
				:loadTilesWhileInteracting="true">
				<ol-view ref="view" :center="center" :rotation="rotation" :zoom="zoom" :projection="projection" :minZoom="18"
					@change:center="centerChanged" @change:resolution="resolutionChanged" @change:rotation="rotationChanged" />

				<ol-layer-group :opacity="1">
					<ol-tile-layer>
						<!-- <ol-source-osm crossOrigin="anonymous" /> -->
					</ol-tile-layer>

					<ol-image-layer id="xkcd">
						<ol-source-image-static :url="imgUrl" :imageSize="size" :imageExtent="extent"
							:projection="projectionImg"></ol-source-image-static>
					</ol-image-layer>


					<ol-webgl-vector-layer :styles="webglLineStyle">
						<ol-source-vector :format="geoJson" crossOrigin="anonymous" url="geojson/percorso.geojson" />
					</ol-webgl-vector-layer>

					<!-- <ol-rotate-control></ol-rotate-control> -->

					<!-- Event handler Drag -->
					<ol-interaction-pointer @down="log('⬇️ down', $event)" @up="log('⬆️ up', $event)"
						@drag="log('🤚🏽 drag', $event)" @move="log('🚗 move', $event)" />

					<ol-interaction-link />

					<!-- Geolocation -->
					<ol-geolocation :projection="projection" @change:position="geoLocChange">
						<template>
							<ol-vector-layer :zIndex="2">
								<ol-source-vector>
									<ol-feature ref="positionFeature">
										<ol-geom-point :coordinates="position"></ol-geom-point>
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
import { ref, inject, reactive } from "vue";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
// import { Geolocation } from '@capacitor/geolocation';
import type { ObjectEvent } from "ol/Object";
import type { MapBrowserEvent, View } from "ol";

// import hereIcon from "@/imgs/here.png";
// console.log(hereIcon);


// import proj4 from 'proj4'
// let lat = 0;
// let lon = 0;
// let centerEPSG3857 = [1392627.5909088855, 5142874.478341418];
const projection = ref("EPSG:3857"); //  EPSG:4326 or EPSG:3857

const center = ref([1392627.5909088855, 5142874.478341418]);
const zoom = ref(20);
const rotation = ref(0);

const currentCenter = ref(center.value);
const currentZoom = ref(zoom.value);
const currentRotation = ref(rotation.value);
const currentResolution = ref(0);

// Lines
const format = inject("ol-format");
const geoJson = new format.GeoJSON();
const webglLineStyle = {
	"stroke-width": 3,
	"stroke-color": "rgba(255,6,34,0.7)",
};

// Image
const imgUrl = ref("imgs/cutilia-building.png");
const here = ref("imgs/here.png");
// const imgUrl = ref("imgs/planex.png");
const size = ref([100, 900]);
const extent = ref([1392545.6062, 5142840.6205, 1392739.6845, 5142985.1342]);
const projectionImg = reactive({
	code: "xkcd-image",
	units: "pixels",
	extent: extent,
});

// Point
const log = (type: string, event: MapBrowserEvent<UIEvent>) => {
	console.log(type, event);
};

const view = ref<View>();
const position = ref([]);
const geoLocChange = (event: ObjectEvent) => {
	console.log("AAAAA", event);
	position.value = event.target.getPosition();
	view.value?.setCenter(event.target?.getPosition());
};
// Geolocation.getCurrentPosition()
// 	.then(el => {
// 		lat = el.coords.latitude;
// 		lon = el.coords.longitude;
// 		centerEPSG3857 = proj4("EPSG:4326", "EPSG:3857", [lon, lat]);
// 		console.log('centerEPSG3857:');
// 		console.log(centerEPSG3857);

// 	})
// 	.catch()
// 	.finally(() => {

// 	});

// const center = ref(proj4("EPSG:4326", "EPSG:3857", [lon, lat]));
// console.log(proj4("EPSG:4326", "EPSG:3857", [lon, lat]));
// const center = ref(centerEPSG3857);
// const projection = ref("EPSG:3857"); //  EPSG:4326 or  EPSG:3857
// const zoom = ref(18);
// const rotation = ref(0);

// const currentCenter = ref(center.value);
// const currentZoom = ref(zoom.value);
// const currentRotation = ref(rotation.value);
// const currentResolution = ref(0);

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
ion-content {
	--background: #D62828;

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

.ol-map-loading:after {
	content: "";
	box-sizing: border-box;
	position: absolute;
	top: 50%;
	left: 50%;
	width: 80px;
	height: 80px;
	margin-top: -40px;
	margin-left: -40px;
	border-radius: 50%;
	border: 5px solid rgba(180, 180, 180, 0.6);
	border-top-color: var(--vp-c-brand-1);
	animation: spinner 0.6s linear infinite;
}

@keyframes spinner {
	to {
		transform: rotate(360deg);
	}
}
</style>