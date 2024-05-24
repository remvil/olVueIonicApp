<template>

	<ion-page>
		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large"> Naviga </ion-title>
				</ion-toolbar>
			</ion-header>

			<!-- <ol-source-vector :url=geojsonUrl ref="sourceRef" /> -->
			<ol-map class="map-container" style="height: 90vh" :loadTilesWhileAnimating="true"
				:loadTilesWhileInteracting="true">
				<ol-view ref="view" :center="center" :rotation="rotation" :zoom="zoom" :projection="projection" :minZoom="19"
					@change:center="centerChanged" @change:resolution="resolutionChanged" @change:rotation="rotationChanged" />

				<ol-layer-group :opacity="1">
					<!-- Mappa Layer 0 -->
					<ol-tile-layer>
						<ol-source-osm crossOrigin="anonymous" />
					</ol-tile-layer>

					<!-- Img Cutilia -->
					<ol-image-layer id="xkcd">
						<ol-source-image-static :url="imgUrlCutilia" :imageSize="sizeCutilia" :imageExtent="extentCutilia"
							:projection="projectionImgCutilia"></ol-source-image-static>
					</ol-image-layer>

					<!-- Img Infotel -->
					<ol-image-layer id="xkcd">
						<ol-source-image-static :url="imgUrlInfotel" :imageSize="sizeInfotel" :imageExtent="extentInfotel"
							:projection="projectionImgInfotel" :rotation="45"></ol-source-image-static>
					</ol-image-layer>

					<!-- Features percorso -->
					<ol-webgl-vector-layer :styles="webglLineStyle">
						<ol-source-vector :format="geoJson" crossOrigin="anonymous" url="geojson/percorso.geojson" />
					</ol-webgl-vector-layer>

					<!-- Feature perimetro Infotel -->
					<ol-webgl-vector-layer :styles="webglLineStylePerimetro">
						<ol-source-vector :format="geoJson" crossOrigin="anonymous" url="geojson/perimetro_infotel.geojson" />
					</ol-webgl-vector-layer>

					<!-- <ol-rotate-control></ol-rotate-control> -->

					<!-- Event handler Drag -->
					<!-- <ol-interaction-pointer @down="log('⬇️ down', $event)" @up="log('⬆️ up', $event)"
						@drag="log('🤚🏽 drag', $event)" @move="log('🚗 move', $event)" /> -->

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
import type { ObjectEvent } from "ol/Object";
import type { View } from "ol";
import proj4 from "proj4";
// import { GeoJSON } from "ol/format";


const projection = ref("EPSG:3857"); //  EPSG:4326 or EPSG:3857

// Center Cutilia
// const center = ref([1392627.5909088855, 5142874.478341418]); 
// Center Via degli Imbimbo
// const center = ref([1646191.7949547486, 5000527.044859039]);
// Center Infotel
const center = ref([1652960.865991945, 4958960.611020285]);
const zoom = ref(21);
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

// Perimetro Infotel
const webglLineStylePerimetro = {
	"stroke-width": 3,
	"stroke-color": "rgba(255,6,34,0.7)",
}

// Image
const imgUrlCutilia = ref("imgs/cutilia-building.png");
const imgUrlInfotel = ref("imgs/infotel-plan.png");
const sizeCutilia = ref([100, 900]);
const extentCutilia = ref([1392545.6062, 5142840.6205, 1392739.6845, 5142985.1342]);
const sizeInfotel = ref([900, 900]);
const extentInfotel = ref([1652918.5089, 4958912.2427, 1652970.9849, 4958964.7887])
const projectionImgCutilia = reactive({
	code: "xkcd-image",
	units: "pixels",
	extent: extentCutilia,
});
const projectionImgInfotel = reactive({
	code: "xkcd-image",
	units: "pixels",
	extent: extentInfotel,
});


// Point - geolocalizzazione
const here = ref("imgs/here.png");
const view = ref<View>();
// Fake position Infotel
const position = ref([1652960.865991945, 4958960.611020285]);
// const position = ref([]);
const geoLocChange = (event: ObjectEvent) => {
	console.log("geoLocChange: ", event);
	position.value = event.target.getPosition();
	// view.value?.setCenter(event.target?.getPosition());
	// Fake position Infotel
	view.value?.setCenter([1652960.865991945, 4958960.611020285]);
};

// console.log(proj4("EPSG:4326", "EPSG:3857", [lon, lat]));

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
getGeoJsonBBox();

function getGeoJsonBBox() {
	const features = [[14.8488468, 40.6370796], [14.848775, 40.6371295], [14.8487435, 40.637102], [14.8487334, 40.6371086], [14.8487234, 40.6371005], [14.8487113, 40.6371086], [14.8486295, 40.6370394], [14.8486147, 40.6370476], [14.8485933, 40.6370283], [14.8485779, 40.6370374], [14.848435, 40.6369178], [14.8484612, 40.6369005], [14.8484196, 40.6368644], [14.8484947, 40.6368089], [14.8485001, 40.6368135], [14.848537, 40.6367871], [14.8485564, 40.6368033], [14.8486047, 40.6367713], [14.8487267, 40.6369097], [14.8487576, 40.6368873], [14.848891, 40.6370466], [14.8488468, 40.6370796]];
	let minLon = 1000;
	let minLat = 1000;
	let maxLon = 0;
	let maxLat = 0;
	features.forEach(element => {
		minLon = (element[0] < minLon) ? element[0] : minLon;
		minLat = (element[1] < minLat) ? element[1] : minLat;
		maxLon = (element[0] > maxLon) ? element[0] : maxLon;
		maxLat = (element[1] > maxLat) ? element[1] : maxLat;
	});
	// console.log([minLon, minLat, maxLon, maxLat]);
	console.log(proj4("EPSG:4326", "EPSG:3857", [minLon, minLat]));
	console.log(proj4("EPSG:4326", "EPSG:3857", [maxLon, maxLat]));
}

</script>

<style scoped>
ion-content {
	/* --background: #D62828; */

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