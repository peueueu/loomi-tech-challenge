import { ClientMarker, Location } from "@/types/map.types";
import { NextResponse, NextRequest } from "next/server";

function mapLocationToMarker(location: Location): ClientMarker {
	const categoryTypeMap: Record<string, ClientMarker["type"]> = {
		tourism: "active",
		sports: "active",
		transport: "active",
		heritage: "active",
		education: "pending",
		health: "warning",
		entertainment: "active",
		food: "active",
		commerce: "inactive",
		park: "active",
	};

	return {
		id: location.id,
		name: location.name,
		lon: location.coordinates[0],
		lat: location.coordinates[1],
		type: (categoryTypeMap[location.category] ||
			"active") as ClientMarker["type"],
	};
}

export async function GET(request: NextRequest) {
	try {
		const authToken = request.cookies.get("access_token")?.value;

		if (!authToken) {
			return NextResponse.json(
				{ success: false, error: "Missing authentication token" },
				{ status: 401 },
			);
		}

		const response = await fetch(
			`${process.env.BACKEND_BASE_URL}/map/locations`,
			{
				headers: {
					Authorization: `Bearer ${authToken}`,
					"Content-Type": "application/json",
				},
			},
		);

		if (!response.ok) {
			throw new Error(`API responded with status: ${response.status}`);
		}

		const data = await response.json();
		let locations: Location[] = data.data?.locations || [];

		/*TODO: The API returns something around 1k records.
			- Nice to Have:
				The API could have query params for limiting the amount of records returned.
			- For now, I'm limiting the returned data to 40 records, to avoid performance issues on the client.
		*/
		locations = locations.slice(0, 40);

		const markers: ClientMarker[] = locations.map(mapLocationToMarker);

		return NextResponse.json({
			success: true,
			data: markers,
		});
	} catch (error) {
		console.error("Error fetching locations:", error);
		return NextResponse.json(
			{
				success: false,
				error:
					error instanceof Error ? error.message : "Failed to fetch locations",
			},
			{ status: 500 },
		);
	}
}
