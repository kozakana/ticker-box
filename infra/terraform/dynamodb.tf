resource "aws_dynamodb_table" "watchlist" {
  name         = "watchlist"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "user_id"
  range_key    = "sort_key"

  attribute {
    name = "user_id"
    type = "S"
  }

  attribute {
    name = "sort_key"
    type = "S"
  }
}
