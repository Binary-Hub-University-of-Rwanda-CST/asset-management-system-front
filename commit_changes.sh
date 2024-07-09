#!/bin/bash

# Function to check if a command is successful
check_success() {
    if [ $? -ne 0 ]; then
        echo "Error encountered. Exiting."
        exit 1
    fi
}

# List of modified files
files=(
    # "commit_changes.sh"
    "src/actions/saveUploaded.action.ts"
    "src/containers/StockManagement/Components/UploadModal.tsx"
    "src/containers/StockManagement/UploadAssets/UploadAssets.tsx"
    "src/containers/StockManagement/UploadAssets/UploadedAssetList.tsx"
    "src/containers/StockManagement/UploadAssets/ValidationModal.tsx"
)

# Loop through each file and commit separately
for file in "${files[@]}"; do
    git add "$file"
    check_success
    git commit -m "Committing changes for $file"
    check_success
done

# Push changes to the repository
git push
check_success

echo "All changes committed and pushed successfully."
