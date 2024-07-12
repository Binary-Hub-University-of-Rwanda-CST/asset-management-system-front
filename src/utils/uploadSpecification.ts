

export interface AssetSpecification {
    name: string;
    type: string;
    required: boolean;
    unique?: boolean;
    allowedValues?: string[]; 


}

const assetSpecifications: AssetSpecification[] = [
    { name: "asset_code", type: "string", required: true, unique: true },
    { name: "serial_number", type: "string", required: true , unique: true}, 
    { name: "asset_name", type: "string", required: true },
    { name: "asset_description", type: "string", required: true },
    { name: "asset_category", type: "string", required: true, allowedValues: ["Laptop", "Printer", "Monitor"] },
    { name: "building_code", type: "string", required: true, allowedValues: ["Building A", "Building B"] },
    { name: "room_code", type: "string", required: true, allowedValues: ["Room 101", "Room 102"] },
    { name: "department", type: "string", required: true },
    { name: "source_of_fund", type: "string", required: true },
    { name: "asset_acquisition_date", type: "string", required: true },
    { name: "acquisition_cost", type: "number", required: true },
    { name: "useful_life", type: "number", required: true },
    { name: "date_of_disposal", type: "string", required: false },
    { name: "condition_status", type: "string", required: false },
    { name: "valuation_date", type: "string", required: false },
    { name: "replacement_cost", type: "number", required: false },
    { name: "actual_depreciation_rate_percent", type: "number", required: false },
    { name: "remarks", type: "string", required: false }
];

export default assetSpecifications;
