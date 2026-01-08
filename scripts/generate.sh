#!/bin/bash
set -e

echo "Starting dev server for static generation..."
npm run dev > /tmp/nuxt-dev.log 2>&1 &
DEV_PID=$!

echo "Waiting for dev server to start (PID: $DEV_PID)..."
sleep 15

echo "Running nuxt generate..."
npx nuxt generate

EXIT_CODE=$?

echo "Stopping dev server..."
kill $DEV_PID 2>/dev/null || true

exit $EXIT_CODE
