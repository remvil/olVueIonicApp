import {HospitalAsset} from "./types";

function getRandomBatteryStatus(): number {
	return Math.floor(Math.random() * 101);
}

const fakeDescription =
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue. Eu ultrices vitae auctor eu augue ut lectus arcu bibendum. Et molestie ac feugiat sed lectus vestibulum mattis ullamcorper. Pretium quam vulputate dignissim suspendisse in. Nibh tortor id aliquet lectus proin.";

export const getHospitalFakeAssets = (): HospitalAsset[] => {
	const hospitalAssets = <HospitalAsset[]>[
		{id: 1, batteryLevel: getRandomBatteryStatus(), tagId: "1a2b3c4d", name: "ECG", description: fakeDescription, floor: 4},
		{id: 2, batteryLevel: getRandomBatteryStatus(), tagId: "5e6f7g8h", name: "Scanner CT", description: fakeDescription, floor: 4},
		{id: 3, batteryLevel: getRandomBatteryStatus(), tagId: "9i0j1k2l", name: "MRI Machine", description: fakeDescription, floor: 2},
		{id: 4, batteryLevel: getRandomBatteryStatus(), tagId: "3m4n5o6p", name: "X-ray Machine", description: fakeDescription, floor: 2},
		{id: 5, batteryLevel: getRandomBatteryStatus(), tagId: "7q8r9s0t", name: "Ultrasound Machine", description: fakeDescription, floor: 4},
		{id: 6, batteryLevel: getRandomBatteryStatus(), tagId: "1u2v3w4x", name: "Defibrillator", description: fakeDescription, floor: 4},
		{id: 7, batteryLevel: getRandomBatteryStatus(), tagId: "5y6z7a8b", name: "Ventilator", description: fakeDescription, floor: 4},
		{id: 8, batteryLevel: getRandomBatteryStatus(), tagId: "9c0d1e2f", name: "Anesthesia Machine", description: fakeDescription, floor: 4},
		{id: 9, batteryLevel: getRandomBatteryStatus(), tagId: "3g4h5i6j", name: "Blood Gas Analyzer", description: fakeDescription, floor: 2},
		{id: 10, batteryLevel: getRandomBatteryStatus(), tagId: "7k8l9m0n", name: "Surgical Microscope", description: fakeDescription, floor: 4},
		{id: 11, batteryLevel: getRandomBatteryStatus(), tagId: "1o2p3q4r", name: "Infusion Pump", description: fakeDescription, floor: 4},
		{id: 12, batteryLevel: getRandomBatteryStatus(), tagId: "5s6t7u8v", name: "Patient Monitor", description: fakeDescription, floor: 2},
		{id: 13, batteryLevel: getRandomBatteryStatus(), tagId: "9w0x1y2z", name: "Autoclave", description: fakeDescription, floor: 4},
		{id: 14, batteryLevel: getRandomBatteryStatus(), tagId: "3a4b5c6d", name: "Sphygmomanometer", description: fakeDescription, floor: 4},
		{id: 15, batteryLevel: getRandomBatteryStatus(), tagId: "7e8f9g0h", name: "Stethoscope", description: fakeDescription, floor: 4},
		{id: 16, batteryLevel: getRandomBatteryStatus(), tagId: "1i2j3k4l", name: "Endoscope", description: fakeDescription, floor: 4},
		{id: 17, batteryLevel: getRandomBatteryStatus(), tagId: "5m6n7o8p", name: "Spirometer", description: fakeDescription, floor: 4},
		{id: 18, batteryLevel: getRandomBatteryStatus(), tagId: "9q0r1s2t", name: "Electrocardiograph", description: fakeDescription, floor: 4},
		{id: 19, batteryLevel: getRandomBatteryStatus(), tagId: "3u4v5w6x", name: "Fetal Doppler", description: fakeDescription, floor: 4},
		{id: 20, batteryLevel: getRandomBatteryStatus(), tagId: "7y8z9a0b", name: "Laboratory Centrifuge", description: fakeDescription, floor: 4},
	];

	return hospitalAssets;
};
