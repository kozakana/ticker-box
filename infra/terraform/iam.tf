data "aws_iam_policy_document" "lambda_assume" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "price_ingest" {
  name               = "price-ingest-role"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume.json
}

resource "aws_iam_role" "backfill" {
  name               = "backfill-1y-role"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume.json
}

resource "aws_iam_policy" "price_data_access" {
  name = "price-data-access"
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect   = "Allow",
        Action   = ["s3:PutObject", "s3:GetObject", "s3:ListBucket"],
        Resource = [aws_s3_bucket.price_history.arn, "${aws_s3_bucket.price_history.arn}/*"],
      },
      {
        Effect   = "Allow",
        Action   = ["glue:GetDatabase", "glue:CreateTable", "glue:GetTable"],
        Resource = "*",
      },
      {
        Effect   = "Allow",
        Action   = ["logs:CreateLogGroup", "logs:CreateLogStream", "logs:PutLogEvents"],
        Resource = "*",
      },
    ],
  })
}

resource "aws_iam_role_policy_attachment" "price_ingest_access" {
  role       = aws_iam_role.price_ingest.name
  policy_arn = aws_iam_policy.price_data_access.arn
}

resource "aws_iam_role_policy_attachment" "backfill_access" {
  role       = aws_iam_role.backfill.name
  policy_arn = aws_iam_policy.price_data_access.arn
}
