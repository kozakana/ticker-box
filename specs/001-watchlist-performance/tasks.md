---

description: "Task list for Watchlist Performance Comparisons implementation"
---

# Tasks: Watchlist Performance Comparisons

**Input**: Design documents from `/specs/001-watchlist-performance/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Not explicitly requested in the feature specification. No test tasks included.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- All tasks include exact file paths

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create base app and lambda directory structure in `apps/web/`, `lambdas/price-ingest/`, `lambdas/backfill-1y/`
- [x] T002 Initialize Next.js + TypeScript app scaffold in `apps/web/package.json` and `apps/web/tsconfig.json`
- [x] T003 [P] Create Lambda package scaffolds in `lambdas/price-ingest/package.json` and `lambdas/backfill-1y/package.json`
- [x] T004 [P] Add Lambroll config stubs in `lambdas/price-ingest/lambroll.json` and `lambdas/backfill-1y/lambroll.json`
- [x] T005 [P] Create Terraform root files in `infra/terraform/main.tf`, `infra/terraform/variables.tf`, `infra/terraform/outputs.tf`
- [x] T006 [P] Add shared types file in `apps/web/src/services/types.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [x] T007 Provision S3 bucket and Iceberg catalog resources in `infra/terraform/s3-iceberg.tf`
- [x] T008 Provision DynamoDB (watchlist metadata) in `infra/terraform/dynamodb.tf`
- [x] T009 Provision IAM roles/policies for Lambdas and app access in `infra/terraform/iam.tf`
- [x] T010 Configure scheduled ingestion trigger (daily UTC) in `infra/terraform/eventbridge.tf`
- [x] T011 Configure backfill trigger for new instrument registration in `infra/terraform/eventbridge.tf`
- [x] T012 Implement environment config loader for web in `apps/web/src/config/env.ts`
- [x] T013 Implement environment config loader for Lambdas in `lambdas/price-ingest/src/config.ts`
- [x] T014 [P] Create watchlist metadata data-access layer in `apps/web/src/services/watchlistStore.ts`
- [x] T015 [P] Create instrument registry data-access layer in `apps/web/src/services/instrumentStore.ts`
- [x] T016 [P] Create price history reader interface in `apps/web/src/services/priceHistoryStore.ts`
- [x] T017 Implement comparison calculation utility in `apps/web/src/services/compare.ts`
- [x] T018 Implement scheduled ingestion handler skeleton in `lambdas/price-ingest/src/handler.ts`
- [x] T019 Implement backfill-1y handler skeleton in `lambdas/backfill-1y/src/handler.ts`
- [x] T020 Implement OHLC fetch adapter interface in `lambdas/price-ingest/src/provider.ts`
- [x] T021 Implement Iceberg write adapter in `lambdas/price-ingest/src/icebergWriter.ts`
- [x] T022 Implement backfill workflow to fetch 1-year OHLC in `lambdas/backfill-1y/src/backfill.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - One-Screen Performance Snapshot (Priority: P1) 🎯 MVP

**Goal**: Show multi-period performance comparisons for each watchlist instrument on a single screen

**Independent Test**: Open the watchlist page and verify each instrument shows 1d/1w/1m/3m/6m/1y/YTD comparisons

### Implementation for User Story 1

- [x] T023 [US1] Implement GET watchlist API in `apps/web/src/app/api/watchlist/route.ts`
- [x] T024 [US1] Compute comparison metrics in `apps/web/src/services/watchlistComparisons.ts`
- [x] T025 [P] [US1] Create watchlist page shell in `apps/web/src/app/page.tsx`
- [x] T026 [P] [US1] Create watchlist table component in `apps/web/src/components/WatchlistTable.tsx`
- [x] T027 [P] [US1] Create comparison value cell component in `apps/web/src/components/ComparisonCell.tsx`
- [x] T028 [US1] Wire API data to UI in `apps/web/src/services/watchlistApi.ts`
- [x] T029 [US1] Add empty-state and missing-data handling in `apps/web/src/components/WatchlistEmptyState.tsx`

**Checkpoint**: User Story 1 is fully functional and testable independently

---

## Phase 4: User Story 2 - Manage Personal Watchlist (Priority: P2)

**Goal**: Add and remove stocks/indices from the watchlist

**Independent Test**: Add a symbol and remove it; watchlist updates immediately and persists on refresh

### Implementation for User Story 2

- [x] T030 [US2] Implement add-item API in `apps/web/src/app/api/watchlist/items/route.ts`
- [x] T031 [US2] Implement remove-item API in `apps/web/src/app/api/watchlist/items/[symbol]/route.ts`
- [x] T032 [P] [US2] Build add-item form in `apps/web/src/components/WatchlistAddForm.tsx`
- [x] T033 [P] [US2] Add remove action UI in `apps/web/src/components/WatchlistRowActions.tsx`
- [x] T034 [US2] Prevent duplicate symbols in `apps/web/src/services/watchlistStore.ts`
- [x] T035 [US2] Trigger backfill on new instrument registration in `apps/web/src/services/instrumentStore.ts`

**Checkpoint**: User Story 2 works independently and does not break US1

---

## Phase 5: User Story 3 - Spot Trend Shifts Quickly (Priority: P3)

**Goal**: Sort the watchlist by any comparison period

**Independent Test**: Change sort period and confirm watchlist order updates correctly

### Implementation for User Story 3

- [x] T036 [US3] Add sort controls UI in `apps/web/src/components/WatchlistSort.tsx`
- [x] T037 [US3] Apply sorting in UI state in `apps/web/src/services/watchlistState.ts`
- [x] T038 [US3] Persist sort preference in `apps/web/src/services/watchlistStore.ts`

**Checkpoint**: All user stories are independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T039 [P] Add loading and error states in `apps/web/src/components/WatchlistStatus.tsx`
- [ ] T040 Update documentation with runbook notes in `specs/001-watchlist-performance/quickstart.md`
- [ ] T041 [P] Add lightweight performance logging in `apps/web/src/services/telemetry.ts`
- [ ] T042 Validate infra plan for required resources in `infra/terraform/README.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup completion
- **User Stories (Phase 3+)**: Depend on Foundational completion
- **Polish (Phase 6)**: Depends on desired user stories being complete

### User Story Dependencies

- **US1 (P1)**: Can start after Phase 2, no dependency on other stories
- **US2 (P2)**: Can start after Phase 2, integrates with US1 data
- **US3 (P3)**: Can start after Phase 2, depends on US1 data display

---

## Parallel Execution Examples

### User Story 1

- T025 and T026 can be done in parallel (page shell vs table component)
- T027 can be built in parallel with T026 (separate component)

### User Story 2

- T032 and T033 can be done in parallel (add form vs row actions)

### User Story 3

- T036 and T037 can be done in parallel (UI controls vs state logic)

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. Validate independently (watchlist shows all comparison periods)

### Incremental Delivery

1. Setup + Foundational
2. US1 → Validate
3. US2 → Validate
4. US3 → Validate
5. Polish phase
