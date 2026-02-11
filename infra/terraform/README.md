# Terraform Infrastructure

This folder contains Terraform configuration for core infrastructure:

- S3 bucket + Glue catalog placeholders for Iceberg tables
- DynamoDB table for watchlist metadata
- IAM roles and policies for Lambdas
- EventBridge rules for scheduled ingestion and backfill triggers

## Next Steps

- Configure Lambda functions and targets in EventBridge rules
- Add required IAM permissions for any additional AWS services
- Run `terraform init` and `terraform plan` to validate changes
