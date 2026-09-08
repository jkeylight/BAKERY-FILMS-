#!/usr/bin/env bash
# ============================================================
#  NOIR Cinematic Slider - ROLLBACK
#  Restores the NEWEST locked build tag (build-lock-*).
#  WARNING: This DISCARDS all uncommitted changes.
# ============================================================
set -e
echo
echo "  [NOIR ROLLBACK]"
echo "  This will restore the newest locked build and DELETE all"
echo "  changes made since it was locked."
echo
read -r -p "Type ROLLBACK to continue, or anything else to cancel: " confirm
if [ "$confirm" != "ROLLBACK" ]; then
    echo "  Cancelled. Nothing changed."
    exit 1
fi

TAG=$(git for-each-ref --sort=-creatordate --format='%(refname:short)' refs/tags | head -1)
if [ -z "$TAG" ]; then
    echo "  FAILED: no lock tag found. Is Git installed and is this a repo?"
    exit 1
fi

git reset --hard "$TAG"
echo
echo "  OK - restored to locked build $TAG."
git log -1 --oneline