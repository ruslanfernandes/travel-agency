import { GoogleGenerativeAI } from "@google/generative-ai";
import { ID } from "appwrite";
import { data, type ActionFunctionArgs } from "react-router";
import { appwriteConfig, database } from "~/appwrite/client";
import { parseMarkdownToJson } from "~/lib/utils";

export const action = async ({ request }: ActionFunctionArgs) => {
  const {
    country,
    numberOfDays,
    travelStyle,
    interests,
    budget,
    groupType,
    userId,
  } = await request.json();

  /* Exclamation (!) in the end is to tell the browser that we know api_key exists */
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const unsplashApiKey = process.env.UNSPLASH_ACCESS_KEY;

  try {
    const prompt = `Generate a ${numberOfDays}-day travel itinerary for ${country} based on the following user information:
		Budget: '${budget}'
		Interests: '${interests}'
		TravelStyle: '${travelStyle}'
		GroupType: '${groupType}'
		Return the itinerary and lowest estimated price in a clean, non-markdown JSON format with the following structure:
		{
		"name": "A descriptive title for the trip",
		"description": "A brief description of the trip and its highlights not exceeding 100 words",
		"estimatedPrice": "Lowest average price for the trip in USD, e.g.$price",
		"duration": ${numberOfDays},
		"budget": "${budget}",
		"travelStyle": "${travelStyle}",
		"country": "${country}",
		"interests": ${interests},
		"groupType": "${groupType}",
		"bestTimeToVisit": [
		  '🌸 Season (from month to month): reason to visit',
		  '☀️ Season (from month to month): reason to visit',
		  '🍁 Season (from month to month): reason to visit',
		  '❄️ Season (from month to month): reason to visit'
		],
		"weatherInfo": [
		  '☀️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
		  '🌦️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
		  '🌧️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
		  '❄️ Season: temperature range in Celsius (temperature range in Fahrenheit)'
		],
		"location": {
		  "city": "name of the city or region",
		  "coordinates": [latitude, longitude],
		  "openStreetMap": "link to open street map"
		},
		"itinerary": [
		{
		  "day": 1,
		  "location": "City/Region Name",
		  "activities": [
		    {"time": "Morning", "description": "🏰 Visit the local historic castle and enjoy a scenic walk"},
		    {"time": "Afternoon", "description": "🖼️ Explore a famous art museum with a guided tour"},
		    {"time": "Evening", "description": "🍷 Dine at a rooftop restaurant with local wine"}
		  ]
		}
		]
		}`;
    // Pass the MODEL + Pass the PROMPT + Generate text
    const textResult = await genAI
      .getGenerativeModel({ model: "gemini-2.0-flash" })
      .generateContent([prompt]);

    const trip = parseMarkdownToJson(textResult.response.text());

    // Search Unsplash for images

    const imageResponse = await fetch(
      //Query and Client-Id are 2 attribues of the syntax
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(`${country} ${interests} ${travelStyle}`)}&client_id=${unsplashApiKey}`
    );

    const imageJson = await imageResponse.json();
    const imageUrls = (imageJson.results || [])
      .slice(0, 3)
      .map((result: any) => result.urls?.regular || null);

    const result = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.tripCollectionId,
      ID.unique(),
      {
        tripDetail: JSON.stringify(trip),
        createdAt: new Date().toISOString(),
        imageUrls,
        userId,
      }
    );

    // after succesful completion return the id i.e the id of the generated trip
    return data({ id: result.$id });
  } catch (error) {
    console.error("Error generating travel plan", error);
  }
};
