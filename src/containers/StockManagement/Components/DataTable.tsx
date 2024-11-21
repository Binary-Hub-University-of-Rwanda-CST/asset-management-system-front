import React, { useState, useEffect } from "react";
import TableModal from "../../../components/TableModal/TableModal";
import { FaFileExcel } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import Modal, {
  ModalMarginTop,
  ModalSize,
} from "../../../components/modal/Modal";
import AssetUpdateForm from "./AssetUpdateForm";
import { fetchSpecifications } from "../../../actions/uploadpecification.action";
import { AppDispatch } from "../../../app/store";
import { useDispatch } from "react-redux";
import {
  updateAsset,
  clearUpdateError,
} from "../../../actions/updateAssets.action";

export interface AssetInterface {
  id: string;
  asset_code: string;
  serial_number: string;
  asset_name: string;
  asset_description: string;
  asset_category: string;
  building_code: string;
  room_code: string;
  department: string;
  source_of_fund: string;
  asset_acquisition_date: string;
  acquisition_cost: number;
  useful_life: number;
  date_of_disposal: string;
  condition_status: string;
  valuation_date: string;
  replacement_cost: number;
  actual_depreciation_rate: number;
  remarks: string;
  current_value: number;
  [key: string]: any;
}

export interface RoomInterface {
  no: string;
  roomName: string;
  floor: string;
  totalAssets: number;
  assets: AssetInterface[];
}

export interface buildingInterface {
  no: string;
  buildingName: string;
  totalRooms: number;
  totalAsset: number;
  totalValue: number;
  rooms: RoomInterface[];
}

interface buildingTableProps {
  activeCategory: string;
  activeCategoryData: buildingInterface[];
}

const BuildingTable: React.FC<buildingTableProps> = ({
  activeCategoryData,
  activeCategory,
}) => {
  const [selectedBuilding, setSelectedBuilding] =
    useState<buildingInterface | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<RoomInterface | null>(null);
  const [isBuildingModalOpen, setIsBuildingModalOpen] = useState(false);
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(activeCategoryData);
  const [selectedAsset, setSelectedAsset] = useState<AssetInterface | null>(
    null
  );
  const [isAssetModalOpen, setIsAssetModalOpen] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  // // Add selector for update status
  // const { loading: updateLoading, error: updateError ,} = useSelector(
  //   (state: RootState) => state.updateAsset
  // );

  const handleBuildingRowClick = (building: buildingInterface) => {
    const filteredRooms = building.rooms.filter((room) => room.totalAssets > 0);
    setSelectedBuilding({ ...building, rooms: filteredRooms });
    setIsBuildingModalOpen(true);
  };

  const handleRoomRowClick = (room: RoomInterface) => {
    setSelectedRoom(room);
    setIsRoomModalOpen(true);
  };

  const handleCloseBuildingModal = () => {
    setSelectedBuilding(null);
    setIsBuildingModalOpen(false);
  };

  const handleCloseRoomModal = () => {
    setSelectedRoom(null);
    setIsRoomModalOpen(false);
  };

  useEffect(() => {
    const filtered = activeCategoryData.filter(
      (building) =>
        building.totalAsset > 0 &&
        building.rooms.length > 0 &&
        Object.values(building).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
    setFilteredData(filtered);
  }, [searchTerm, activeCategoryData]);

  useEffect(() => {
    dispatch(fetchSpecifications());
  }, [dispatch]);

  const exportToCSV = () => {
    const allAssets = activeCategoryData.flatMap((building) =>
      building.rooms.flatMap((room) => room.assets)
    );

    if (allAssets.length === 0) return;

    // Define the fields we want in our CSV (excluding duplicates)
    const fieldsToExport = [
      'asset_code',
      'serial_number',
      'asset_name',
      'asset_description',
      'asset_category',
      'building_code',
      'room_code',
      'department',
      'source_of_fund',
      'asset_acquisition_date',
      'acquisition_cost',
      'useful_life',
      'date_of_disposal',
      'condition_status',
      'valuation_date',
      'replacement_cost',
      'actual_depreciation_rate',
      'remarks',
      'current_value'
    ];

    // Create headers with proper formatting
    const headers = fieldsToExport.map(field => 
      field.split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    );

    const csvData: string[] = [headers.join(',')];

    // Add each asset data in the specified order
    allAssets.forEach((asset) => {
      const rowData = fieldsToExport.map(field => {
        const value = asset[field];
        // Handle values that might contain commas
        return typeof value === 'string' && value.includes(',') 
          ? `"${value}"` 
          : value;
      });
      csvData.push(rowData.join(','));
    });

    // Create CSV file content
    const csvContent = csvData.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    // Create link for download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${activeCategory}_assets.csv`);
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleAssetDoubleClick = (asset: AssetInterface) => {
    setSelectedAsset(asset);
    setIsAssetModalOpen(true);
  };

  const handleCloseAssetModal = () => {
    setSelectedAsset(null);
    setIsAssetModalOpen(false);
    dispatch(clearUpdateError()); // Clear any existing errors when closing modal
  };

  const handleAssetUpdate = async (updatedAsset: AssetInterface) => {
    try {
      await dispatch(updateAsset([updatedAsset]));

      // Update the local state to reflect the changes
      if (selectedRoom) {
        const updatedAssets = selectedRoom.assets.map((asset) =>
          asset.id === updatedAsset.id ? updatedAsset : asset
        );

        setSelectedRoom({
          ...selectedRoom,
          assets: updatedAssets,
        });
      }

      // Update the building data
      if (selectedBuilding) {
        const updatedRooms = selectedBuilding.rooms.map((room) => {
          if (room.no === selectedRoom?.no) {
            return {
              ...room,
              assets: room.assets.map((asset) =>
                asset.id === updatedAsset.id ? updatedAsset : asset
              ),
            };
          }
          return room;
        });

        setSelectedBuilding({
          ...selectedBuilding,
          rooms: updatedRooms,
        });
      }

      handleCloseAssetModal();
    } catch (error) {
      console.error("Failed to update asset:", error);
    }
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex flex-row w-full relative mb-4">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search..."
            className="py-1 text-sm w-11/12 bg-my-gray rounded-lg px-8 focus:outline-my-gray focus:bg-white pl-10 relative"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute left-4 top-4 transform -translate-y-1/2 text-gray-500">
            <FaSearch />
          </span>
          <button
            className="flex items-center justify-center rounded-md px-8 bg-green-600 w-1/12 ml-4 text-white text-sm"
            onClick={exportToCSV}
          >
            <FaFileExcel className="" /> Export
          </button>
        </div>
        <table className="min-w-full bg-white">
          <thead>
            <tr className="min-w-full bg-white border-b-2 border-gray-300 text-left">
              <th className="py-2 px-4">No</th>
              <th className="py-2 px-4">Building Name</th>
              <th className="py-2 px-4">Total Rooms</th>
              <th className="py-2 px-4">Total {activeCategory} Assets</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((stock, index) => (
              <tr
                key={stock.no}
                className="min-w-full bg-white border-b border-gray-300 cursor-pointer hover:bg-blue-white hover:text-my-blue hover:font-bold hover:rounded-lg active:bg-blue-white"
                onClick={() => handleBuildingRowClick(stock)}
              >
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{stock.buildingName}</td>
                <td className="py-2 px-4">{stock.totalRooms}</td>
                <td className="py-2 px-4">{stock.totalAsset}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        {selectedBuilding && (
          <TableModal
            isOpen={isBuildingModalOpen}
            onClose={handleCloseBuildingModal}
            title={`${activeCategory} Rooms for ${selectedBuilding.buildingName}`}
            tableHeaders={["roomName", "floor", "totalAssets"]}
            tableData={selectedBuilding.rooms || []}
            tag={[activeCategory, selectedBuilding.buildingName]}
            onRowClick={handleRoomRowClick}
            modalType="building"
          />
        )}

        {selectedRoom && (
          <TableModal
            isOpen={isRoomModalOpen}
            onClose={handleCloseRoomModal}
            title={`${activeCategory} for Room ${selectedRoom.roomName}`}
            tableHeaders={
              selectedRoom.assets.length > 0
                ? Object.keys(selectedRoom.assets[0])
                : []
            }
            tableData={selectedRoom.assets || []}
            tag={[
              activeCategory,
              selectedBuilding!!.buildingName,
              selectedRoom.roomName,
            ]}
            onRowDoubleClick={handleAssetDoubleClick}
            modalType="room"
          />
        )}

        {selectedAsset && (
          <Modal
            isOpen={isAssetModalOpen}
            onClose={handleCloseAssetModal}
            title={`Update Asset`}
            widthSizeClass={ModalSize.extraLarge}
            marginTop={ModalMarginTop.none}
          >
            <AssetUpdateForm
              asset={selectedAsset}
              onUpdate={handleAssetUpdate}
              onCancel={handleCloseAssetModal}
            />
          </Modal>
        )}
      </div>
    </>
  );
};

export default BuildingTable; 