import { Header } from "components";
import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import type { Route } from "./+types/create-trip";
import { comboBoxItems, interests, selectItems } from "~/constants";
import { cn, formatKey } from "~/lib/utils";
import {
  LayerDirective,
  MapsComponent,
  LayersDirective,
} from "@syncfusion/ej2-react-maps";
import { useState } from "react";
import { world_map } from "~/constants/world_map";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { account } from "~/appwrite/client";
import { useNavigate } from "react-router";

export const loader = async () => {
  const response = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,latlng,maps,flags"
  );

  const data = await response.json();
  return data.map((country: any) => ({
    name: country.name.common,
    flag: country.flags.png,
    coordinates: country.latlng,
    value: country.name.common,
    openStreetMap: country.maps?.openStreetMaps,
  }));
};

const CreateTrip = ({ loaderData }: Route.ComponentProps) => {
  const countries = loaderData as Country[];
  const navigate = useNavigate();

  const [formData, setFormData] = useState<TripFormData>({
    country: countries[0]?.name || "",
    travelStyle: "",
    interest: "",
    budget: "",
    duration: 0,
    groupType: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (
      !formData.country ||
      !formData.travelStyle ||
      !formData.interest ||
      !formData.budget ||
      !formData.groupType
    ) {
      setError("Please provide value for all fields");
      setLoading(false);
    }

    if (formData.duration < 1 || formData.duration > 10) {
      setError("Duration must be between 1 to 10 days");
    }

    const user = await account.get();

    //Check if user is authenticated
    if (!user.$id) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/create-trip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          country: formData.country,
          numberOfDays: formData.duration,
          travelStyle: formData.travelStyle,
          interests: formData.interest,
          budget: formData.budget,
          groupType: formData.groupType,
          userId: user.$id,
        }),
      });
      const result: CreateTripResponse = await response.json();

      if (result?.id) navigate(`/trips/${result.id}`);
      else console.error("Failed to generate a trip");
    } catch (error) {
      console.error("Error generating trip");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key: keyof TripFormData, value: string | number) => {
    setFormData({ ...formData, [key]: value });
  };

  const countryData = countries.map((country: any) => ({
    name: country.name,
    flag: country.flag,
    value: country.value,
  }));

  const mapData = [
    {
      country: formData.country,
      color: "#EA382E",
      coordinates:
        countries.find((c: Country) => c.name === formData.country)
          ?.coordinates || [],
    },
  ];

  return (
    <main className="flex flex-col gap-10 pb-20 wrapper">
      <Header
        title="Add a New Trip"
        description="View and edit AI Generated travel plans"
      />
      <section className="mt-2.5 wrapper-md">
        <form className="trip-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="country">Country</label>

            <ComboBoxComponent
              id="country"
              dataSource={countryData}
              fields={{ text: "name", value: "value" }}
              placeholder="Select a country"
              itemTemplate={(data: any) => (
                <div className="flex items-center gap-2">
                  <img
                    src={data.flag}
                    alt={data.name}
                    className="w-4 h-5 ml-3"
                  />
                  <span>{data.name}</span>
                </div>
              )}
              change={(e: { value: string | undefined }) => {
                if (e.value) {
                  handleChange("country", e.value);
                }
              }}
              className="combo-box"
              allowFiltering
              filtering={(e) => {
                const query = e.text.toLowerCase();

                e.updateData(
                  countries
                    .filter((country) =>
                      country.name.toLowerCase().includes(query)
                    )
                    .map((country) => ({
                      name: country.name,
                      flag: country.flag,
                      value: country.value,
                    }))
                );
              }}
            />
          </div>

          <div>
            <label htmlFor="duration">Duration</label>
            <input
              id="duration"
              name="duration"
              placeholder="Enter a number of days(5, 12 ...)"
              className="form-input placeholder:text-gray-100"
              onChange={(e) => handleChange("duration", Number(e.target.value))}
            />
          </div>

          {selectItems.map((key) => (
            <div key={key}>
              <label htmlFor={key}>{formatKey(key)}</label>

              <ComboBoxComponent
                id={key}
                dataSource={comboBoxItems[key].map((item) => ({
                  text: item,
                  value: item,
                }))}
                fields={{ text: "text", value: "value" }}
                placeholder={`Select ${formatKey(key)}`}
                allowFiltering
                filtering={(e) => {
                  const query = e.text.toLowerCase();

                  e.updateData(
                    comboBoxItems[key]
                      .filter((item) => item.toLowerCase().includes(query))
                      .map((item) => ({
                        name: item,
                        value: item,
                      }))
                  );
                }}
                change={(e: { value: string | undefined }) => {
                  if (e.value) {
                    handleChange(key, e.value);
                  }
                }}
                className="combo-box"
              />
            </div>
          ))}

          <div>
            <label htmlFor="location">Location on the world map</label>
            <MapsComponent>
              <LayersDirective>
                <LayerDirective
                  dataSource={mapData}
                  shapeData={world_map}
                  shapeDataPath="country"
                  shapePropertyPath="name"
                  shapeSettings={{ colorValuePath: "color", fill: "#e5e5e5" }}
                />
              </LayersDirective>
            </MapsComponent>
          </div>
          <div className="bg-gray-200 h-px w-full" />

          {error && (
            <div className="error">
              <p>{error}</p>
            </div>
          )}
          <footer className="px-6 w-full">
            <ButtonComponent
              type="submit"
              className="button-class !h-12 !w-full"
              disabled={loading}
            >
              <img
                src={`/assets/icons/${loading ? "loader.svg" : "magic-star.svg"}`}
                className={cn("size-5", { "animate-spin": loading })}
                alt=""
              />
              <span className="p-16-semibold text-white">
                {loading ? "Generating..." : "Generate Trip"}
              </span>
            </ButtonComponent>
          </footer>
        </form>
      </section>
    </main>
  );
};

export default CreateTrip;
