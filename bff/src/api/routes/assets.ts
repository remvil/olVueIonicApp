import express from "express";
import path from "path";
import fs from "fs";

export const assetsRouter = express.Router();

/**
 * @swagger
 * components:
 *    schemas:
 *      GeoJsonObject:
 *        description:
 *          GeoJSon object
 *          The coordinate reference system for all GeoJSON coordinates is a
 *          geographic coordinate reference system, using the World Geodetic System
 *          1984 (WGS 84) datum, with longitude and latitude units of decimal
 *          degrees.
 *          This is equivalent to the coordinate reference system identified by the
 *          Open Geospatial Consortium (OGC) URN
 *          An OPTIONAL third-position element SHALL be the height in meters above
 *          or below the WGS 84 reference ellipsoid.
 *          In the absence of elevation values, applications sensitive to height or
 *          depth SHOULD interpret positions as being at local ground or sea level.
 *        externalDocs:
 *          url: 'https://tools.ietf.org/html/rfc7946#section-3'
 *        type: object
 *        properties:
 *          type:
 *            type: string
 *            enum:
 *            - FeatureCollection
 *            - Feature
 *            - Point
 *            - MultiPoint
 *            - LineString
 *            - MultiLineString
 *            - Polygon
 *            - MultiPolygon
 *            - GeometryCollection
 *          name:
 *            type: string
 *          features:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Feature'
 *        required:
 *        - type
 *        discriminator:
 *          propertyName: type
 *      Geometry:
 *        description:
 *          Abstract type for all GeoJSon object except Feature and
 *          FeatureCollection
 *        externalDocs:
 *          url: 'https://tools.ietf.org/html/rfc7946#section-3'
 *        allOf:
 *        - $ref: '#/components/schemas/GeoJsonObject'
 *        - type: object
 *          properties:
 *            type:
 *              type: string
 *              enum:
 *              - Point
 *              - MultiPoint
 *              - LineString
 *              - MultiLineString
 *              - Polygon
 *              - MultiPolygon
 *              - GeometryCollection
 *            coordinates:
 *              type: array
 *          required:
 *          - type
 *          discriminator:
 *            propertyName: type
 *      GeometryElement:
 *        description: >
 *          Abstract type for all GeoJSon 'Geometry' object the type of which is not
 *          'GeometryCollection'
 *        externalDocs:
 *          url: 'https://tools.ietf.org/html/rfc7946#section-3'
 *        allOf:
 *        - $ref: '#/components/schemas/Geometry'
 *        - type: object
 *          properties:
 *            type:
 *              type: string
 *              enum:
 *              - Point
 *              - MultiPoint
 *              - LineString
 *              - MultiLineString
 *              - Polygon
 *              - MultiPolygon
 *          required:
 *          - type
 *          discriminator:
 *            propertyName: type
 *      Feature:
 *        description: GeoJSon 'Feature' object
 *        externalDocs:
 *          url: 'https://tools.ietf.org/html/rfc7946#section-3.2'
 *        allOf:
 *        - $ref: '#/components/schemas/GeoJsonObject'
 *        - type: object
 *          required:
 *          - geometry
 *          - properties
 *          properties:
 *            geometry:
 *              allOf:
 *              - nullable: true
 *              - $ref: '#/components/schemas/Geometry'
 *            properties:
 *              type: object
 *              nullable: true
 *            id:
 *              oneOf:
 *              - type: number
 *              - type: string
 *      FeatureCollection:
 *        description: GeoJSon 'FeatureCollection' object
 *        externalDocs:
 *          url: 'https://tools.ietf.org/html/rfc7946#section-3.3'
 *        allOf:
 *        - $ref: '#/components/schemas/GeoJsonObject'
 *        - type: object
 *          required:
 *          - features
 *          properties:
 *            features:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Feature'
 *      Position:
 *        description: >
 *          GeoJSon fundamental geometry construct.
 *          A position is an array of numbers. There MUST be two or more elements.
 *          The first two elements are longitude and latitude, or easting and
 *          northing, precisely in that order and using decimal numbers.
 *          Altitude or elevation MAY be included as an optional third element.
 *          Implementations SHOULD NOT extend positions beyond three elements
 *          because the semantics of extra elements are unspecified and ambiguous.
 *          Historically, some implementations have used a fourth element to carry
 *          a linear referencing measure (sometimes denoted as "M") or a numerical
 *          timestamp, but in most situations a parser will not be able to properly
 *          interpret these values. The interpretation and meaning of additional
 *          elements is beyond the scope of this specification, and additional
 *          elements MAY be ignored by parsers.
 *        externalDocs:
 *          url: 'https://tools.ietf.org/html/rfc7946#section-3.1.1'
 *        type: array
 *        minItems: 2
 *        maxItems: 3
 *        items:
 *          type: number
 *      LineStringCoordinates:
 *        description: >
 *          GeoJSon fundamental geometry construct, array of two or more positions.
 *        externalDocs:
 *          url: 'https://tools.ietf.org/html/rfc7946#section-3.1.4'
 *        type: array
 *        items:
 *          $ref: '#/components/schemas/Position'
 *        minItems: 2
 *      LinearRing:
 *        description: >
 *          A linear ring is a closed LineString with four or more positions.
 *          The first and last positions are equivalent, and they MUST contain
 *          identical values; their representation SHOULD also be identical.
 *          A linear ring is the boundary of a surface or the boundary of a hole in
 *          a surface.
 *          A linear ring MUST follow the right-hand rule with respect to the area
 *          it bounds, i.e., exterior rings are counterclockwise, and holes are
 *          clockwise.
 *        externalDocs:
 *          url: 'https://tools.ietf.org/html/rfc7946#section-3.1.6'
 *        type: array
 *        items:
 *          $ref: '#/components/schemas/Position'
 *        minItems: 4
 *      Point:
 *        description: GeoJSon geometry
 *        externalDocs:
 *          url: 'https://tools.ietf.org/html/rfc7946#section-3.1.2'
 *        allOf:
 *          - $ref: '#/components/schemas/GeometryElement'
 *          - type: object
 *            required:
 *            - type
 *            - coordinates
 *            properties:
 *              type:
 *                type: 'string'
 *                enum: [Point]
 *              coordinates:
 *                $ref: '#/components/schemas/Position'
 *
 * /api/assets:
 *       get:
 *         summary: Restituisce la lista di tutti gli assets registrati.
 *         responses:
 *           200:
 *             description: Restituisce gli assets.
 *             content:
 *               application/json:
 *                 schema:
 *                  $ref: '#/components/schemas/GeoJsonObject'
 *           500:
 *             description: Errore del server. Non riesce a trovare la risorsa richiesta
 *             content:
 *               application/json:
 *                 schema:
 *                   $ref: '#/components/schemas/GetAssetsError'
 *         tags:
 *           - Assets
 *         security:
 *           - Authorization: []
 */
assetsRouter.get("/", (req, res) => {
	const geojsonFilePath = path.resolve(__dirname, "../../../data/geojson/assets_aziendali.geojson");
	fs.readFile(geojsonFilePath, "utf8", (err, data) => {
		if (err) {
			return res.status(500).json({error: `Unable to read GeoJSON ${geojsonFilePath}`});
		}
		const geojson = JSON.parse(data);
		res.json(geojson);
	});
});
