import React, { useState, useEffect } from "react";
import TableModal from "../../../components/TableModal/TableModal";
import { FaFileExcel } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import Modal,{ModalMarginTop, ModalSize} from "../../../components/modal/Modal";
import AssetUpdateForm from "./AssetUpdateForm";
import { fetchSpecifications } from "../../../actions/uploadpecification.action";
import { AppDispatch } from "../../../app/store";
import { useDispatch } from "react-redux";
export interface buildingInterface {
  no: string;
  buildingName: string;
  totalRooms: number;
  totalAsset: number;
  totalValue: number;
  rooms: RoomInterface[];
}

export interface AssetInterface {
  [key: string]: any;
  current_value: number; 
}

export interface RoomInterface {
  no: string;
  roomName: string;
  floor: string;
  totalAssets: number;
  assets: AssetInterface[];
}

interface buildingTableProps {
  activeCategory: string;
  activeCategoryData: buildingInterface[];
}

const BuildingTable: React.FC<buildingTableProps> = ({ activeCategoryData, activeCategory }) => {
  const [selectedBuilding, setSelectedBuilding] = useState<buildingInterface | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<RoomInterface | null>(null);
  const [isBuildingModalOpen, setIsBuildingModalOpen] = useState(false);
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(activeCategoryData);
  const [selectedAsset, setSelectedAsset] = useState<AssetInterface | null>(null);
  const [isAssetModalOpen, setIsAssetModalOpen] = useState(false);  
  const dispatch: AppDispatch = useDispatch();

  const handleBuildingRowClick = (building: buildingInterface) => {
    const filteredRooms = building.rooms.filter(room => room.totalAssets > 0);
    setSelectedBuilding({...building, rooms: filteredRooms});
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
    const filtered = activeCategoryData.filter(building =>
      building.totalAsset > 0 && 
      building.rooms.length > 0 &&
      Object.values(building).some(value =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredData(filtered);
  }, [searchTerm, activeCategoryData]);

  useEffect(() => {
    dispatch(fetchSpecifications());
  }, [dispatch]);

  const exportToCSV = () => {
    const allAssets = activeCategoryData.flatMap(building => building.rooms.flatMap(room => room.assets));

    if (allAssets.length === 0) return;

    const csvData: string[] = [];
    // Add headers to CSV data
    csvData.push(Object.keys(allAssets[0]).join(','));

    // Add each asset data to CSV data
    allAssets.forEach(asset => {
      const assetValues = Object.values(asset);
      csvData.push(assetValues.join(','));
    });

    // Create CSV file content
    const csvContent = csvData.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    // Create link for download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Campus_assets.csv`); 
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
  };

  const handleAssetUpdate = (updatedAsset: AssetInterface) => {
    // Implement the logic to update the asset in your data structure
    // This might involve updating the state and possibly making an API call
    console.log("Updated asset:", updatedAsset);
    handleCloseAssetModal();
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
          <button className="flex items-center justify-center rounded-md px-8 bg-green-600 w-1/12 ml-4 text-white text-sm" onClick={exportToCSV}>
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
              {/* <th className="py-2 px-4">Total Value</th> */}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((stock, index) => (
              <tr
                key={stock.no}
                className="min-w-full bg-white border-b border-gray-300 cursor-pointer  hover:bg-blue-white hover:text-my-blue hover:font-bold hover:rounded-lg active:bg-blue-white"
                onClick={() => handleBuildingRowClick(stock)}
              >
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{stock.buildingName}</td>
                <td className="py-2 px-4">{stock.totalRooms}</td>
                <td className="py-2 px-4">{stock.totalAsset}</td>
                {/* <td className="py-2 px-4">{stock.totalValue}</td> */}
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
            tableHeaders={['roomName', 'floor', 'totalAssets']} 
            tableData={selectedBuilding.rooms || []}
            tag={[activeCategory, selectedBuilding.buildingName]}
            onRowClick={handleRoomRowClick}
          />
        )}
        {selectedRoom && (
          <TableModal
            isOpen={isRoomModalOpen}
            onClose={handleCloseRoomModal}
            title={`${activeCategory} for Room ${selectedRoom.roomName}`} 
            tableHeaders={selectedRoom.assets.length > 0 ? Object.keys(selectedRoom.assets[0]) : []}
            tableData={selectedRoom.assets || []}
            tag={[activeCategory, selectedBuilding!!.buildingName, selectedRoom.roomName]}
            onRowDoubleClick={handleAssetDoubleClick}
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
