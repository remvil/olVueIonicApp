import {Feature, FeatureCollection} from "../api/types";
import {HospitalAsset} from "./types";
import Jabber from "jabber";

const jabber = new Jabber();
function getRandomBatteryStatus(): number {
	return Math.floor(Math.random() * 101);
}

export const getHospitalFakeAssets = (): HospitalAsset[] => {
	const hospitalAssets = <HospitalAsset[]>[
		{
			id: 1,
			batteryLevel: 15,
			tagId: "1u4v5w6x",
			name: "Tag1 Ingresso",
			description:
				"Tempora voluptas animi molestiae. Repellendus omnis eos cumque quam. Quaerat voluptates voluptate autem est ipsam. Consequatur corrupti iste architecto ex aliquam autem quia.",
			floor: 4,
			lat: 40.61715021229716,
			lon: 14.972687877530161,
		},
		{
			id: 2,
			batteryLevel: getRandomBatteryStatus(),
			tagId: "5e6f7g8h",
			name: "Scanner CT",
			description: jabber.createParagraph(150),
			floor: 4,
			lat: 40.61725155434749,
			lon: 14.972804165405624,
		},
		{
			id: 3,
			batteryLevel: getRandomBatteryStatus(),
			tagId: "9i0j1k2l",
			name: "MRI Machine",
			description: jabber.createParagraph(150),
			floor: 2,
			lat: 40.61710253069955,
			lon: 14.972780067291366,
		},
		{
			id: 4,
			batteryLevel: getRandomBatteryStatus(),
			tagId: "3m4n5o6p",
			name: "X-ray Machine",
			description: jabber.createParagraph(150),
			floor: 2,
			lat: 40.61713069805348,
			lon: 14.972988683962657,
		},
		{
			id: 5,
			batteryLevel: getRandomBatteryStatus(),
			tagId: "7q8r9s0t",
			name: "Ultrasound Machine",
			description: jabber.createParagraph(150),
			floor: 4,
			lat: 40.61721626136814,
			lon: 14.972680819102326,
		},
		{
			id: 6,
			batteryLevel: getRandomBatteryStatus(),
			tagId: "1u2v3w4x",
			name: "Defibrillator",
			description: jabber.createParagraph(150),
			floor: 4,
			lat: 40.61702173707747,
			lon: 14.972976616701745,
		},
		{
			id: 7,
			batteryLevel: getRandomBatteryStatus(),
			tagId: "5y6z7a8b",
			name: "Ventilator",
			description: jabber.createParagraph(150),
			floor: 4,
			lat: 40.61723200848598,
			lon: 14.972969138101146,
		},
		{
			id: 8,
			batteryLevel: getRandomBatteryStatus(),
			tagId: "9c0d1e2f",
			name: "Anesthesia Machine",
			description: jabber.createParagraph(150),
			floor: 4,
			lat: 40.61725155434749,
			lon: 14.972804165405624,
		},
		{
			id: 9,
			batteryLevel: getRandomBatteryStatus(),
			tagId: "3g4h5i6j",
			name: "Blood Gas Analyzer",
			description: jabber.createParagraph(150),
			floor: 2,
			lat: 40.61710253069955,
			lon: 14.972780067291366,
		},
		{
			id: 10,
			batteryLevel: getRandomBatteryStatus(),
			tagId: "7k8l9m0n",
			name: "Surgical Microscope",
			description: jabber.createParagraph(150),
			floor: 4,
			lat: 40.61713069805348,
			lon: 14.972988683962657,
		},
		{
			id: 11,
			batteryLevel: getRandomBatteryStatus(),
			tagId: "1o2p3q4r",
			name: "Infusion Pump",
			description: jabber.createParagraph(150),
			floor: 4,
			lat: 40.61721626136814,
			lon: 14.972680819102326,
		},
		{
			id: 12,
			batteryLevel: getRandomBatteryStatus(),
			tagId: "5s6t7u8v",
			name: "Patient Monitor",
			description: jabber.createParagraph(150),
			floor: 2,
			lat: 40.61702173707747,
			lon: 14.972976616701745,
		},
		{
			id: 13,
			batteryLevel: getRandomBatteryStatus(),
			tagId: "9w0x1y2z",
			name: "Autoclave",
			description: jabber.createParagraph(150),
			floor: 4,
			lat: 40.61723200848598,
			lon: 14.972969138101146,
		},
		{
			id: 14,
			batteryLevel: getRandomBatteryStatus(),
			tagId: "3a4b5c6d",
			name: "Sphygmomanometer",
			description: jabber.createParagraph(150),
			floor: 4,
			lat: 40.61725155434749,
			lon: 14.972804165405624,
		},
		{
			id: 15,
			batteryLevel: getRandomBatteryStatus(),
			tagId: "7e8f9g0h",
			name: "Stethoscope",
			description: jabber.createParagraph(150),
			floor: 4,
			lat: 40.61710253069955,
			lon: 14.972780067291366,
		},
		{
			id: 16,
			batteryLevel: getRandomBatteryStatus(),
			tagId: "1i2j3k4l",
			name: "Endoscope",
			description: jabber.createParagraph(150),
			floor: 4,
			lat: 40.61713069805348,
			lon: 14.972988683962657,
		},
		{
			id: 17,
			batteryLevel: getRandomBatteryStatus(),
			tagId: "5m6n7o8p",
			name: "Spirometer",
			description: jabber.createParagraph(150),
			floor: 4,
			lat: 40.61721626136814,
			lon: 14.972680819102326,
		},
		{
			id: 18,
			batteryLevel: getRandomBatteryStatus(),
			tagId: "9q0r1s2t",
			name: "Electrocardiograph",
			description: jabber.createParagraph(150),
			floor: 4,
			lat: 40.61702173707747,
			lon: 14.972976616701745,
		},
		{
			id: 19,
			batteryLevel: getRandomBatteryStatus(),
			tagId: "3u4v5w6x",
			name: "Fetal Doppler",
			description: jabber.createParagraph(150),
			floor: 4,
			lat: 40.61723200848598,
			lon: 14.972969138101146,
		},
		{
			id: 20,
			batteryLevel: getRandomBatteryStatus(),
			tagId: "7y8z9a0b",
			name: "Laboratory Centrifuge",
			description: jabber.createParagraph(150),
			floor: 4,
			lat: 40.61725155434749,
			lon: 14.972804165405624,
		},
	];
	return hospitalAssets;
};
