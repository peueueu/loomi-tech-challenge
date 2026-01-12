"use client";

import { useEffect, useRef, useState } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ClientMarker } from "@/types/map.types";
import { LocationType } from "@/lib/location-type-enum";

export function DashboardMap() {
	const mapElement = useRef<HTMLDivElement>(null);
	const mapInstance = useRef<Map | null>(null);
	const [clients, setClients] = useState<ClientMarker[]>([]);
	const [loading, setLoading] = useState(true);
	const [selectedLocation, setSelectedLocation] = useState<string>("all");
	const [selectedType, setSelectedType] = useState<string>("all");

	const handleLocationChange = (value: string) => {
		setSelectedLocation(value);

		if (value !== "all" && mapInstance.current) {
			const selectedClient = clients.find((c) => c.name === value);
			if (selectedClient) {
				const coords = fromLonLat([selectedClient.lon, selectedClient.lat]);
				const view = mapInstance.current.getView();
				view.animate({
					center: coords,
					zoom: 6,
					duration: 600,
				});
			}
		}
	};

	useEffect(() => {
		const fetchClients = async () => {
			try {
				const response = await fetch("/api/map");
				const result = await response.json();
				if (result.success) {
					setClients(result.data);
					console.log(`Loaded ${result.data.length} markers`);
				}
			} catch (error) {
				console.error("Failed to fetch clients:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchClients();
	}, []);

	useEffect(() => {
		if (!mapElement.current || loading || clients.length === 0) return;

		const vectorSource = new VectorSource();

		const filteredClients = clients.filter((client) => {
			const locationMatch =
				selectedLocation === "all" || client.name === selectedLocation;
			const typeMatch = selectedType === "all" || client.type === selectedType;
			return locationMatch && typeMatch;
		});

		filteredClients.forEach((client) => {
			const feature = new Feature({
				geometry: new Point(fromLonLat([client.lon, client.lat])),
				name: client.name,
				type: client.type,
			});

			vectorSource.addFeature(feature);
		});

		const vectorLayer = new VectorLayer({
			source: vectorSource,
			style: (feature) => {
				const type = feature.get("type");
				const colorMap: Record<string, string> = {
					active: "#3b82f6",
					inactive: "#64748b",
					pending: "#eab308",
					warning: "#ef4444",
				};

				return new Style({
					image: new Icon({
						src: `data:image/svg+xml;base64,${btoa(
							`<svg width="32" height="48" viewBox="0 0 32 48" xmlns="http://www.w3.org/2000/svg">
								<defs>
									<filter id="shadow">
										<feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.3"/>
									</filter>
								</defs>
								<circle cx="16" cy="16" r="10" fill="${
									colorMap[type] || "#3b82f6"
								}" filter="url(#shadow)"/>
								<path d="M16 28 L8 18 L24 18 Z" fill="${colorMap[type] || "#3b82f6"}"/>
							</svg>`,
						)}`,
						scale: 1,
						anchor: [0.5, 1],
					}),
				});
			},
		});

		const map = new Map({
			target: mapElement.current,
			controls: [],
			layers: [
				new TileLayer({
					source: new OSM({
						url: "https://{a-c}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
					}),
				}),
				vectorLayer,
			],
			view: new View({
				center: fromLonLat([-87.6298, 41.8781]),
				zoom: 5,
			}),
		});

		if (filteredClients.length > 0) {
			const extent = vectorSource.getExtent();
			if (extent[0] !== Infinity) {
				map.getView().fit(extent, { padding: [50, 50, 50, 50] });
			}
		}

		mapInstance.current = map;

		return () => {
			map.setTarget(undefined);
		};
	}, [clients, loading, selectedLocation, selectedType]);

	const uniqueLocations = Array.from(
		new Set(clients.map((c) => c.name)),
	).sort();
	const uniqueTypes = Array.from(new Set(clients.map((c) => c.type))).sort();

	return (
		<Card className='bg-slate-900 border-slate-700'>
			<CardHeader className='flex flex-row items-center justify-between'>
				<CardTitle className='text-slate-100'>
					Mapa de clientes por região
				</CardTitle>
				<div className='flex gap-2'>
					<Select
						value={selectedLocation}
						onValueChange={handleLocationChange}
					>
						<SelectTrigger className='w-40 bg-slate-800 border-slate-700 text-card-foreground rounded-lg'>
							<SelectValue placeholder='Todos os locais' />
						</SelectTrigger>
						<SelectContent className='bg-slate-800 border-slate-700 rounded-lg text-card-foreground'>
							<SelectItem
								value='all'
								className='text-card-foreground data-highlighted:bg-slate-700 data-highlighted:text-primary-foreground'
							>
								Todos os locais
							</SelectItem>
							{uniqueLocations.map((location) => (
								<SelectItem
									key={location}
									value={location}
									className='text-card-foreground data-highlighted:bg-slate-700 data-highlighted:text-primary-foreground'
								>
									{location}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<Select
						value={selectedType}
						onValueChange={setSelectedType}
					>
						<SelectTrigger className='w-40 bg-slate-800 border-slate-700 text-card-foreground rounded-lg'>
							<SelectValue placeholder='Todos os tipos' />
						</SelectTrigger>
						<SelectContent className='bg-slate-800 border-slate-700 rounded-lg text-card-foreground'>
							<SelectItem
								value='all'
								className='text-card-foreground data-highlighted:bg-slate-700 data-highlighted:text-primary-foreground'
							>
								Todos os tipos
							</SelectItem>
							{uniqueTypes.map((type) => (
								<SelectItem
									key={type}
									value={type}
									className='text-card-foreground data-highlighted:bg-slate-700 data-highlighted:text-primary-foreground'
								>
									{
										LocationType[
											type.toUpperCase() as keyof typeof LocationType
										]
									}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</CardHeader>
			<CardContent>
				<div
					ref={mapElement}
					className='w-full h-96 rounded-lg overflow-hidden border border-slate-700'
				/>
			</CardContent>
		</Card>
	);
}
