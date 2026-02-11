resource "aws_s3_bucket" "price_history" {
  bucket_prefix = "watchlist-price-history-"
  force_destroy = true
}

resource "aws_s3_bucket_versioning" "price_history" {
  bucket = aws_s3_bucket.price_history.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "price_history" {
  bucket = aws_s3_bucket.price_history.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "price_history" {
  bucket                  = aws_s3_bucket.price_history.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# Placeholder for Iceberg catalog integration (to be expanded in Phase 2+)
resource "aws_glue_catalog_database" "iceberg" {
  name = "watchlist_iceberg"
}
