# Implementation Plan: Watchlist Performance Comparisons

**Branch**: `001-watchlist-performance` | **Date**: 2026-02-11 | **Spec**: [spec](./spec.md)
**Input**: Feature specification from `/specs/001-watchlist-performance/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Deliver a personal stock and index watchlist that shows multi-period performance comparisons at a glance, backed by a scheduled data ingestion pipeline that stores OHLC history and supports rapid comparison queries.

## Technical Context

**Language/Version**: TypeScript (Next.js app + Lambda functions)  
**Primary Dependencies**: Next.js (web UI), AWS Amplify (hosting), AWS Lambda (scheduled ingestion), Amazon S3 (data lake storage), Apache Iceberg (table format)  
**Storage**: S3 Iceberg tables for historical OHLC data; watchlist and instrument metadata in a managed data store (TBD by implementation)  
**Testing**: Web UI and ingestion logic unit tests; end-to-end smoke test for watchlist rendering and data ingestion  
**Target Platform**: Web app hosted on Amplify; serverless ingestion on AWS Lambda  
**Project Type**: web + serverless backend  
**Performance Goals**: Render watchlist with 20 instruments and all comparison periods within 3 seconds; add new instrument visible within 30 seconds of data availability  
**Constraints**: Scheduled ingestion runs on UTC schedule; data must be stored in Iceberg-compatible layout on S3; infrastructure managed with Terraform and Lambda deployments with Lambroll  
**Scale/Scope**: Single personal user, single watchlist, tens of instruments, daily ingestion cadence

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

No enforceable constitution rules detected (constitution file contains placeholders). Gate passes.

**Post-Design Re-check**: Still no enforceable rules detected. Gate passes.

## Project Structure

### Documentation (this feature)

```text
specs/001-watchlist-performance/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
apps/
└── web/
    ├── src/
    │   ├── app/
    │   ├── components/
    │   ├── services/
    │   └── styles/
    └── tests/

lambdas/
├── price-ingest/
│   ├── src/
│   └── tests/
└── backfill-1y/
    ├── src/
    └── tests/

infra/
└── terraform/

specs/
└── 001-watchlist-performance/
```

**Structure Decision**: Use a single Next.js web app under `apps/web`, separate Lambda functions under `lambdas/`, and Terraform under `infra/terraform` to align with Amplify hosting plus Lambroll-based Lambda deployments.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations to track.
