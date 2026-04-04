#!/usr/bin/env bash
set -e

pnpm run format && \
    pnpm run lint && \
    pnpm run typecheck && \
    pnpm run build && \
    pnpm run test
