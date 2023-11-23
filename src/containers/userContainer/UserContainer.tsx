//  Containers are components that are connected to the Redux store or manage state in some way, while presentation components focus on rendering the UI based on the provided props.
// src/containers/AssetContainer/AssetContainer.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchAssetData } from '../../services/assetService';
import { RootState } from '../../app/store';
// import { Asset } from '../../models/Asset'
import AssetList from '../../components/AssetList/AssetList';

const AssetContainer: React.FC = () => {
  const dispatch = useDispatch();
  const assets = useSelector((state: RootState) => state.asset.assets);

  useEffect(() => {
    // Fetch asset data when the component mounts
    // dispatch(fetchAssetData());
  }, [dispatch]);

  return (
    <div>
      <h2>Asset Container</h2>
      {/* <AssetList assets={assets} /> */}
    </div>
  );
};

export default AssetContainer;
