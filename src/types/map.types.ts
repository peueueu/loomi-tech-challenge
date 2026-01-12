export interface Location {
	id: string;
	name: string;
	description: string;
	coordinates: [number, number];
	category: string;
	address: string;
	icon: string;
	color: string;
}

export interface ClientMarker {
	id: string;
	name: string;
	lon: number;
	lat: number;
	type: "active" | "inactive" | "pending" | "warning";
}
