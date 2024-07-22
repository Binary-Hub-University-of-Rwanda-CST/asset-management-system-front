#!/bin/sh

# Function to add, commit, and push a file
commit_file() {
  git add "$1"
  git commit -m "Modify $1"
  git push origin2 main
}

# List of modified files
modified_files=(
  "src/App.tsx"
  "src/actions/saveUploaded.action.ts"
  "src/actions/types.ts"
  "src/containers/changePassword/ChangePassword.tsx"
  "src/reducers/index.ts"
  "src/utils/AxiosToken.ts"
)

# List of untracked files
untracked_files=(
  "src/actions/changePassword.action.ts"
  "src/containers/profile/"
  "src/reducers/changePassword.reducer.ts"
  "src/utils/axiosInstance.ts"
)

# Commit modified files
for file in "${modified_files[@]}"
do
  commit_file "$file"
done

# Commit untracked files
for file in "${untracked_files[@]}"
do
  commit_file "$file"
done
