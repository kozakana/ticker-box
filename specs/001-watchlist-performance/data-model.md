# Data Model

## Entities

### User

- **id**: unique identifier
- **default_watchlist_id**: reference to Watchlist
- **created_at**
- **updated_at**

### Watchlist

- **id**: unique identifier
- **user_id**: owner reference
- **name**: display name
- **sort_key**: current sort period (e.g., 1d, 1w, 1m, 3m, 6m, 1y, ytd)
- **created_at**
- **updated_at**

### WatchlistItem

- **watchlist_id**: reference to Watchlist
- **instrument_id**: reference to Instrument
- **display_order**: integer
- **created_at**

### Instrument

- **id**: unique identifier
- **symbol**: ticker symbol (unique)
- **name**: instrument name
- **type**: stock or index
- **status**: active, delisted
- **listed_at**: first listed date
- **created_at**
- **updated_at**

### PriceBar (OHLC)

- **instrument_id**: reference to Instrument
- **date**: trading day
- **open**: opening price
- **high**: highest price
- **low**: lowest price
- **close**: closing price
- **source**: provider identifier
- **ingested_at**

### ComparisonMetric

- **instrument_id**: reference to Instrument
- **as_of_date**: latest close date used
- **period**: 1d, 1w, 1m, 3m, 6m, 1y, ytd
- **percent_change**: numeric
- **computed_at**

### IngestionRun

- **id**: unique identifier
- **run_type**: scheduled or backfill
- **started_at**
- **completed_at**
- **status**: success, partial, failed
- **notes**

## Relationships

- User 1:1 Watchlist
- Watchlist 1:N WatchlistItem
- WatchlistItem N:1 Instrument
- Instrument 1:N PriceBar
- Instrument 1:N ComparisonMetric
- IngestionRun 1:N PriceBar (by ingestion batch)

## Validation Rules

- Symbols are unique across instruments.
- Watchlists cannot include duplicate symbols.
- Comparison metrics require at least two price points (latest close and reference close).
- When historical data is missing for a period, percent_change is not available.

## State Transitions

- Instrument status: active -> delisted
- IngestionRun status: started -> success | partial | failed
