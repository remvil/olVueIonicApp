<!-- <template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>Ricerca</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">Ricerca</ion-title>
				</ion-toolbar>
			</ion-header>

			<ExploreContainer name="Tab 3 page" />
		</ion-content>
	</ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
</script> -->


<!-- Esempio shapes -->
<!-- <template>
	<ol-map :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" style="height: 400px">
		<ol-view ref="view" :center="center" :zoom="zoom" :projection="projection" />
		<ol-tile-layer>
			<ol-source-osm crossOrigin="anonymous" />
		</ol-tile-layer>
		<ol-webgl-vector-layer :styles="webglPointStyle">
			<ol-source-vector :format="geoJson" crossOrigin="anonymous"
				url="https://openlayers.org/en/latest/examples/data/geojson/point-samples.geojson" />
		</ol-webgl-vector-layer>
		<ol-webgl-vector-layer :styles="webglLineStyle">
			<ol-source-vector :format="geoJson" crossOrigin="anonymous"
				url="https://openlayers.org/en/latest/examples/data/geojson/line-samples.geojson" />
		</ol-webgl-vector-layer>
		<ol-webgl-vector-layer :styles="webglPolyStyle">
			<ol-source-vector :format="geoJson" crossOrigin="anonymous"
				url="https://openlayers.org/en/latest/examples/data/geojson/polygon-samples.geojson" />
		</ol-webgl-vector-layer>
	</ol-map>
</template>

<script setup lang="ts">
import { ref, inject } from "vue";

const center = ref([-73.3, 48.0]);
const projection = ref("EPSG:4326");
const zoom = ref(7);

const format = inject("ol-format");
const geoJson = new format.GeoJSON();

const webglLineStyle = {
	"stroke-width": 5,
	"stroke-color": "rgba(24,86,34,0.7)",
};
const webglPointStyle = {
	"shape-points": 3,
	"shape-radius": 10,
	"shape-opacity": 0.5,
	"shape-fill-color": "blue",
};


const webglPolyStyle = {
	"stroke-width": 5,
	"stroke-color": "rgba(24,86,34,0.4)",
	"fill-color": "#0000ff40",
};
</script>


<!-- <template>
	<ol-map :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" style="height: 400px">
		<ol-view ref="view" :center="center" :zoom="zoom" :projection="projection" />
		<ol-zoom-control />
		<ol-attribution-control />
		<ol-image-layer id="xkcd">
			<ol-source-image-static :url="imgUrl" :imageSize="size" :imageExtent="extent"
				:projection="projection"></ol-source-image-static>
		</ol-image-layer>
	</ol-map>
</template>

<script setup>
import { ref, reactive } from "vue";

const zoom = ref(0);
const size = ref([1, 1]);
const center = ref([size.value[0] / 2, size.value[1] / 2]);
const extent = ref([0.1, 0.2, ...size.value]);
const projection = reactive({
	code: "xkcd-image",
	units: "pixels",
	extent: extent,
});
// const imgUrl = ref("https://imgs.xkcd.com/comics/online_communities.png");
// const imgUrl = ref("https://e7.pngegg.com/pngimages/647/669/png-clipart-house-plan-floor-plan-architecture-house-angle-building-thumbnail.png");
const imgUrl = ref("imgs/cutilia-building.png");
// const imgUrl = ref("imgs/planimetryexample.ppm");
</script> -->