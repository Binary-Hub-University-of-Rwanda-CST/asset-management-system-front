#!/bin/bash

# List of modified files
modified_files=(
  "commit.sh"
  "src/App.tsx"
  "src/index.css"
)

# List of untracked directories
untracked_directories=(
  "src/assets/images/team/"
  "src/components/Card/"
  "src/components/Footer/"
  "src/components/Team/"
)

# Commit each modified file individually
for file in "${modified_files[@]}"; do
  git add "$file"
  git commit -m "Commit modified file: $file"
done

# Commit each untracked directory individually
for dir in "${untracked_directories[@]}"; do
  git add "$dir"
  git commit -m "Commit untracked directory: $dir"
done

# Push the changes
# git push origin main
