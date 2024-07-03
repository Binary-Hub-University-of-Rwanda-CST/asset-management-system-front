import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { StoreState } from "../../reducers";
import { Auth, FC_SetError, FC_SetSuccess, fetchAssets, Assets, Building } from "../../actions";
import { MdOutlineDashboard } from "react-icons/md";
import { TbDatabase, TbDatabaseDollar } from "react-icons/tb";
import DonutChart from "./DonutChart";
import BuildingAssetsBarGraph from "./BuildingAssetsBarGraph";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface AppProps {
  auth: Auth;
  assetsData: Assets[];
  FC_SetSuccess: (msg: string) => void;
  FC_SetError: (msg: string) => void;
  fetchAssets: () => void;
}

interface AppState {
  loading: boolean;
  success: string;
  error: string;
}

const Dashboard: React.FC<AppProps> = ({ auth, assetsData, FC_SetSuccess, FC_SetError, fetchAssets }) => {
  const [state, setState] = useState<AppState>({
    loading: true, // Initial loading state
    success: "",
    error: "",
  });

  useEffect(() => {
    const loadData = async () => {
      if (assetsData.length === 0) {
        await fetchAssets();
      }
      setState((prevState) => ({ ...prevState, loading: false }));
    };

    loadData();
  }, [fetchAssets, assetsData.length]);

  /// Calculate total assets and total asset value dynamically
  const totalAssets = assetsData.reduce((total, category) =>
    total + category.buildings.reduce((catTotal, building) =>
      catTotal + building.rooms.reduce((roomTotal, room) =>
        roomTotal + room.assets.length, 0
      ), 0
    ), 0
  );

  const totalAssetsValue = assetsData.reduce((total, category) =>
    total + category.buildings.reduce((catTotal, building) =>
      catTotal + building.rooms.reduce((roomTotal, room) =>
        roomTotal + room.assets.reduce((assetTotal, asset) => assetTotal + asset.current_value, 0),
        0
      ),
      0
    ),
    0
  );

  // Extract buildings data for BuildingAssetsBarGraph
  const buildings: Building[] = assetsData.reduce((allBuildings, category) =>
    allBuildings.concat(category.buildings), [] as Building[]
  );

  if (state.loading) {
    return (
      <div className="mr-4 animate__animated animate__faster">
        <div className="flex flex-col bg-white rounded-lg p-2">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col gap-2 mb-2">
              <div className="flex flex-row items-center gap-1">
                <Skeleton width={40} height={30} />   
                <Skeleton width={180} height={30} /> 
              </div>
            </div>
            <div className="flex flex-row gap-4 items-center">
              <div className="flex flex-row bg-blue-white px-4 py-2 rounded-lg h-fit items-center gap-2">
                <Skeleton width={30} height={30} />
                <Skeleton width={100} height={30} />
              </div>
              <div className="flex flex-row bg-[#dcf1e6] px-4 py-2 rounded-lg h-fit items-center gap-2">
                <Skeleton width={30} height={30} />
                <Skeleton width={100} height={30} /> 
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg py-4 flex flex-row gap-6">
          <div className="flex flex-col gap-4 w-2/5">
            <div className="rounded-lg p-0 w-full bg-white flex justify-center items-center flex-col h-full">
              <Skeleton width={300}  />
              <Skeleton height={200} width={200} circle /> 
            </div>
          </div>
          <div className="flex bg-white w-3/5 justify-center items-center rounded-lg">
            <Skeleton  width="100"  /> 
            <Skeleton  width="200" />
            <Skeleton height={400} width="300" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mr-4 animate__animated animate__faster">
      <div className="flex flex-col bg-white rounded-lg p-2">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col gap-2 mb-2">
            <div className="flex flex-row items-center gap-1">
              <MdOutlineDashboard className="text-2xl text-my-blue" />
              <div className="flex item-center flex-col">
                <div className="flex text-black text-xl font-bold px-2">Dashboard</div>
                <div className="px-2 rounded-md bg-primary-700 text-black w-max text-sm">
                  Get Overview of All Assets
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-4 items-center">
            <div className="flex flex-row bg-blue-white px-4 py-2 rounded-lg h-fit items-center gap-2">
              <TbDatabase className="text-3xl font-bold text-my-blue" />
              <div className="flex flex-col gap-0">
                <h5>Total Assets</h5>
                <h3 className="text-sm font-bold">{totalAssets}</h3>
              </div>
            </div>
            <div className="flex flex-row bg-[#dcf1e6] px-4 py-2 rounded-lg h-fit items-center gap-2">
              <TbDatabaseDollar className="text-3xl font-bold text-confirm" />
              <div className="flex flex-col gap-0">
                <h5>Total Assets Value</h5>
                <h3 className="text-md font-bold">{totalAssetsValue.toLocaleString()} FRW</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg py-4 flex flex-row gap-6"> 
        <div className="flex flex-col gap-4 w-2/5">
          <div className="rounded-lg p-0 w-full bg-white flex justify-center items-center flex-col h-full">
            <h3 className="text-md font-semibold m-2">Assets Value Summary by category</h3>
            <DonutChart assetsData={assetsData} />
          </div>
        </div>
        <div className="flex bg-white w-3/5 justify-center items-center rounded-lg">
          <BuildingAssetsBarGraph buildings={buildings}  />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: StoreState) => ({
  auth: state.auth,
  assetsData: state.asset.assets,
});

export default connect(mapStateToProps, {
  FC_SetSuccess,
  FC_SetError,
  fetchAssets,
})(Dashboard);
 