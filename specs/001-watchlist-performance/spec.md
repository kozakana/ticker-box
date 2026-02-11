# Feature Specification: Watchlist Performance Comparisons

**Feature Branch**: `001-watchlist-performance`  
**Created**: 2026-02-11  
**Status**: Draft  
**Input**: User description: "個人的に利用することを想定しています。登録した株やインデックスの前日比、１週間前比較、１ヶ月前比較、３ヶ月前比較、６ヶ月前比較、１年前比較、年初来比を一発で見られる様にして、株のウォッチリストを作り株のトレンドの切り替わりにいち早く気付ける様にしたいです。"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - One-Screen Performance Snapshot (Priority: P1)

As a personal investor, I want to see multiple time-frame comparisons for each stock or index in my watchlist on a single screen so I can immediately grasp recent vs longer-term performance.

**Why this priority**: This is the core value of the feature and enables quick situational awareness across all tracked instruments.

**Independent Test**: Can be fully tested by opening the watchlist with preloaded instruments and verifying all comparison columns appear with values.

**Acceptance Scenarios**:

1. **Given** a watchlist with at least one stock and one index that have historical price data, **When** I open the watchlist view, **Then** I see each instrument listed with comparison values for 1 day, 1 week, 1 month, 3 months, 6 months, 1 year, and year-to-date.
2. **Given** a watchlist with instruments that have complete data, **When** I view the watchlist, **Then** all comparison values are shown on a single screen without navigating into each instrument.

---

### User Story 2 - Manage Personal Watchlist (Priority: P2)

As a personal investor, I want to add or remove stocks and indices in my watchlist so the comparison view reflects what I actually track.

**Why this priority**: Without the ability to curate the list, the snapshot is not useful for personal tracking.

**Independent Test**: Can be fully tested by adding and removing instruments and confirming the list updates accordingly.

**Acceptance Scenarios**:

1. **Given** the watchlist is open, **When** I add a valid stock or index symbol, **Then** it appears in the list with comparison values once data is available.
2. **Given** the watchlist contains an instrument, **When** I remove it, **Then** it no longer appears in the list.

---

### User Story 3 - Spot Trend Shifts Quickly (Priority: P3)

As a personal investor, I want to sort the watchlist by any comparison period so I can quickly notice which instruments are changing trend relative to other timeframes.

**Why this priority**: Sorting is a lightweight way to surface trend shifts without requiring complex analysis tools.

**Independent Test**: Can be fully tested by sorting the list by multiple comparison columns and verifying the order updates correctly.

**Acceptance Scenarios**:

1. **Given** the watchlist has at least five instruments, **When** I sort by the 1-month comparison, **Then** the list reorders by that value.
2. **Given** the watchlist is sorted by a comparison period, **When** I switch to sorting by a different period, **Then** the list reorders by the newly selected period.

---

### Edge Cases

- What happens when an instrument has been listed for less than the comparison period (e.g., less than 1 year)?
- How does the system handle missing historical data for a specific period?
- What happens when markets are closed and the latest data is from the previous trading day?
- How does the system handle invalid or delisted symbols?
- What happens if the same symbol is added twice?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST allow a user to maintain a personal watchlist of instruments.
- **FR-002**: The system MUST allow users to add and remove stocks and indices by symbol.
- **FR-003**: The watchlist view MUST display comparison values for 1 day, 1 week, 1 month, 3 months, 6 months, 1 year, and year-to-date for each instrument.
- **FR-004**: The system MUST calculate each comparison as the percent change between the latest available closing value and the closing value of the reference date for that period.
- **FR-005**: The watchlist MUST show when data is unavailable for a specific comparison period and indicate it as not available.
- **FR-006**: Users MUST be able to sort the watchlist by any comparison period.
- **FR-007**: The system MUST prevent duplicate symbols in the same watchlist.
- **FR-008**: The system MUST persist watchlist contents and order between sessions.
- **FR-009**: The watchlist MUST support a mix of stocks and indices in the same list.

### Key Entities *(include if feature involves data)*

- **User**: A personal user with a single default watchlist and saved preferences.
- **Watchlist**: A named collection of instruments owned by a user, including display order.
- **Instrument**: A stock or index identified by a symbol, name, and type.
- **Price Snapshot**: Historical closing values for an instrument at specific dates.
- **Comparison Metric**: A computed percent change for a defined period (1d, 1w, 1m, 3m, 6m, 1y, YTD).

## Assumptions

- Comparisons are based on the latest available closing values for each instrument.
- The initial scope is a single personal watchlist per user.
- Trend shifts are identified by user inspection through multi-period comparisons and sorting, without proactive alerts.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A user can open the watchlist and see all comparison periods for a list of 20 instruments within 3 seconds.
- **SC-002**: A user can add a new instrument to the watchlist and see it listed within 30 seconds, assuming data is available.
- **SC-003**: At least 95% of instruments with sufficient historical data display complete comparison values for all requested periods.
- **SC-004**: Users can identify the top 3 performers for any chosen period in under 1 minute using the sort function.
