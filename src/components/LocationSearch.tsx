import React, {ChangeEvent} from "react";
import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import Select from "@/components/Select";
import {states} from "@/types/types";

interface LocationSearchProps {
    city: string | undefined;
    stateVal: string | undefined;
    setLocationSearch: React.Dispatch<React.SetStateAction<{city?: string; state?: string}>>;
    locations: {city: string; state: string; zip_code: string}[];
    locationLoading: boolean;
    selectedZipCodes: string[];
    toggleZipCode: (zip: string) => void;
}

const LocationSearch: React.FC<LocationSearchProps> = ({
    city,
    stateVal,
    setLocationSearch,
    locations,
    locationLoading,
    selectedZipCodes,
    toggleZipCode,
}) => {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Search by Location</h2>
            <div className="flex gap-4 flex-wrap">
                <input
                    type="text"
                    placeholder="Search by city..."
                    value={city || ""}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setLocationSearch((prev) => ({...prev, city: e.target.value}))
                    }
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Select
                    value={stateVal || ""}
                    onChange={(value) =>
                        setLocationSearch((prev) => ({...prev, state: value || undefined}))
                    }
                    options={[
                        {value: "", label: "All States"},
                        ...states.map((st) => ({value: st, label: st})),
                    ]}
                />
            </div>

            {/* Location Results */}
            {locationLoading ? (
                <div className="flex justify-center">
                    <Spin indicator={<LoadingOutlined style={{fontSize: 24}} spin />} />
                </div>
            ) : (
                locations.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {locations.map((location) => (
                            <button
                                key={location.zip_code}
                                onClick={() => toggleZipCode(location.zip_code)}
                                className={`px-3 py-1 rounded-full text-sm ${selectedZipCodes.includes(location.zip_code)
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-200 hover:bg-gray-300"
                                    }`}
                            >
                                {location.city}, {location.state} ({location.zip_code})
                            </button>
                        ))}
                    </div>
                )
            )}
        </div>
    );
};

export default LocationSearch;
