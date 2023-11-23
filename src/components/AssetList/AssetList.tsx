// sample Asset Action file 
import React from 'react';
import { useDispatch } from 'react-redux';
import { setUser, clearUser } from '../../actions/userAction';
import { addAsset, removeAsset } from '../../actions/assetAction';

const AssetList: React.FC = () => {
  const dispatch = useDispatch();

  const handleSetUser = () => {
    dispatch(setUser('John Doe'));
  };

  const handleClearUser = () => {
    dispatch(clearUser());
  };

  const handleAddAsset = () => {
    dispatch(addAsset('New Asset'));
  };

  const handleRemoveAsset = () => {
    dispatch(removeAsset('Asset to Remove'));
  };

  return (
    <div>
      <h1>Asset List</h1>
      <button onClick={handleSetUser}>Set User</button>
      <button onClick={handleClearUser}>Clear User</button>
      <button onClick={handleAddAsset}>Add Asset</button>
      <button onClick={handleRemoveAsset}>Remove Asset</button>
    </div>
  );
};

export default AssetList;
