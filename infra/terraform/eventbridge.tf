resource "aws_cloudwatch_event_rule" "daily_ingest" {
  name                = "price-ingest-daily"
  description         = "Daily OHLC ingestion"
  schedule_expression = "cron(0 0 * * ? *)"
}

resource "aws_cloudwatch_event_rule" "backfill_on_register" {
  name        = "price-backfill-on-register"
  description = "Trigger backfill for new instruments"
  event_pattern = jsonencode({
    source = ["watchlist"],
    detail-type = ["instrument.registered"],
  })
}
