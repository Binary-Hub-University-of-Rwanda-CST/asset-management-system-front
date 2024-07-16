#!/bin/bash

# Variables
BRANCH_NAME="test-branch"  # Replace with your branch name
BASE_BRANCH="main"            # Replace with your base branch (e.g., main or master)
PR_TITLE="Add commits to form EDISON pattern"
PR_BODY="This pull request includes multiple commits to create the EDISON pattern in the commit graph."

# Check if gh is installed
if ! command -v gh &> /dev/null; then
    echo "GitHub CLI (gh) could not be found. Please install it from https://cli.github.com/ and authenticate it."
    exit 1
fi

# Check if the current branch is clean
if ! git diff-index --quiet HEAD --; then
    echo "You have uncommitted changes. Please commit or stash them before creating a pull request."
    exit 1
fi

# Push changes to the new branch
git checkout -b $BRANCH_NAME
git push origin $BRANCH_NAME

# Create a pull request
gh pr create --base $BASE_BRANCH --head $BRANCH_NAME --title "$PR_TITLE" --body "$PR_BODY"

# Check if the pull request was created successfully
if [ $? -ne 0 ]; then
    echo "Failed to create the pull request. Please check your GitHub CLI configuration and try again."
    exit 1
else
    echo "Pull request created successfully."
fi
