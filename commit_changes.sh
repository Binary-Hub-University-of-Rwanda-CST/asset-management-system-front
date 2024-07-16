#!/bin/bash

# List of modified files
files=(
    "package-lock.json"
    "package.json"
    "src/actions/types.ts"
    "src/components/Fragments/DropDown.tsx"
    "src/components/modal/Modal.tsx"
    "src/containers/StockManagement/Components/UploadModal.tsx"
    "src/containers/StockManagement/UploadAssets/UploadAssets.tsx"
    "src/containers/StockManagement/UploadAssets/ValidationModal.tsx"
    "src/reducers/index.ts"
)

# Loop through each file and stage and commit
for file in "${files[@]}"
do
    # Stage the file
    git add "$file"

    # Commit the file
    git commit -m "Auto-commit: Staged $file"
done

# List of untracked files
untracked_files=(
    "src/actions/uploadpecification.action.ts"
    "src/containers/StockManagement/UploadAssets/DropDown.tsx"
    "src/reducers/specification.reducer.ts"
    "src/utils/uploadSpecification.ts"
)

# Loop through each untracked file and stage and commit
for file in "${untracked_files[@]}"
do
    # Stage the file
    git add "$file"

    # Commit the file
    git commit -m "Auto-commit: Staged untracked file $file"
done

echo "All changes committed successfully!"
