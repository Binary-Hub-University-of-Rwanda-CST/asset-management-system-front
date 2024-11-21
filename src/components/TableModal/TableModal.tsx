import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaSearch, FaFileExcel } from "react-icons/fa";
import { RoomInterface, AssetInterface } from "../../containers/StockManagement/Components/DataTable";
import { formatHeaderName } from "../../utils/functions";
import Papa from "papaparse";

interface RoomWithAssets extends RoomInterface {
  assets: AssetInterface[];
  [key: string]: any;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  tableHeaders: string[];
  tableData: (Record<string, any> | RoomWithAssets)[];
  tag?: string[];
  onRowClick?: (room: RoomInterface) => void;
  onRowDoubleClick?: (asset: AssetInterface) => void;
  modalType?: 'building' | 'room' | 'asset';
}

const TableModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  tableHeaders,
  tableData,
  tag,
  onRowClick,
  onRowDoubleClick,
  modalType = 'asset'
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<(Record<string, any> | RoomWithAssets)[]>([]);

  useEffect(() => {
    if (isOpen) {
      setFilteredData(tableData);
    }
  }, [isOpen, tableData]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    const filtered = tableData.filter((row) =>
      tableHeaders.some((header) => {
        const value = (row as Record<string, any>)[header];
        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
    setFilteredData(filtered);
  }, [searchTerm, tableData, tableHeaders]);

  const exportToCSV = () => {
    let csvData: Record<string, any>[];
    let fileName: string;

    try {
      // Define the fields we want in our CSV (excluding duplicates)
      const fieldsToExport = [
        // 'id',
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
        // 'current_value'
      ];

      switch (modalType) {
        case 'building':
          // Export all assets from all rooms in the building
          csvData = (filteredData as RoomWithAssets[]).flatMap((room) => 
            room.assets.map(asset => {
              const formattedAsset: Record<string, any> = {};
              fieldsToExport.forEach(field => {
                formattedAsset[field] = asset[field];
              });
              return formattedAsset;
            })
          );
          fileName = `${tag?.[0]}_${tag?.[1]}_all_assets.csv`;
          break;

        case 'room':
          // Export assets with building and room context
          csvData = filteredData.map(row => {
            const asset = row as Record<string, any>;
            const formattedAsset: Record<string, any> = {};
            fieldsToExport.forEach(field => {
              formattedAsset[field] = asset[field];
            });
            return formattedAsset;
          });
          fileName = `${tag?.[0]}_${tag?.[1]}_${tag?.[2]}_assets.csv`;
          break;

        default:
          csvData = filteredData as Record<string, any>[];
          fileName = `${title}.csv`;
      }

      if (csvData.length === 0) {
        console.log('No data to export');
        return;
      }

      // Create headers with proper formatting
      const headers = fieldsToExport.map(field => 
        field.split('_')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      );
      
      // Create CSV content
      const csvContent = [
        headers,
        ...csvData.map(row => 
          fieldsToExport.map(field => {
            const value = row[field];
            return typeof value === 'string' && value.includes(',') 
              ? `"${value}"`
              : value;
          })
        )
      ];

      // Use Papa.unparse to convert to CSV
      const csv = Papa.unparse(csvContent);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting CSV:', error);
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-screen h-full flex items-center justify-center bg-black bg-opacity-50 pt-20 px-4 z-50"
          onClick={handleOverlayClick}
        >
          <div className="bg-white w-full h-full py-4 rounded-t-xl animate__animated animate__fadeInUp animate__faster">
            <div className="flex flex-row gap-3 items-center bold border-blue-white border-b-2 pb-2 mx-0 px-5">
              <button
                className="flex gap-1 items-center text-my-blue bg-blue-white rounded-lg py-1 px-2 top-2 left-2 hover:text-gray-800"
                onClick={onClose}
              >
                <FaArrowLeft /> Back to list
              </button>
              <h4 className="font-bold text-md pr-5">{title}</h4>
              {tag &&
                tag.map((tag) => (
                  <span
                    key={tag}
                    className="bg-blue-white text-my-blue font-bold text-sm rounded-md px-2 py-1"
                  >
                    {tag}
                  </span>
                ))}
            </div>

            <div className="flex flex-col px-6 py-2">
              <div className="flex flex-row w-full relative">
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

              <div className="overflow-x-auto mt-4">
                <div style={{ maxHeight: "600px" }}>
                  {filteredData.length > 0 ? (
                    <table className="min-w-full">
                      <thead>
                        <tr>
                          <th className="px-4 py-2 text-left text-sm font-md text-black uppercase">
                            #
                          </th>
                          {tableHeaders.map((header) => (
                            <th
                              key={header}
                              className="px-4 py-3 text-left text-sm font-md text-black uppercase"
                            >
                              {formatHeaderName(header)}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredData.map((row, rowIndex) => (
                          <tr
                            key={rowIndex}
                            className="border-t py-1 cursor-pointer hover:bg-blue-white"
                            onClick={() => onRowClick?.(row as RoomInterface)}
                            onDoubleClick={() => onRowDoubleClick?.(row as AssetInterface)}
                          >
                            <td className="px-4 py-1 text-sm">
                              {rowIndex + 1}
                            </td>
                            {tableHeaders.map((header, cellIndex) => (
                              <td key={cellIndex} className="px-4 text-sm py-1">
                                {(row as Record<string, any>)[header]}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <h1 className="text-center">No data found</h1>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TableModal;