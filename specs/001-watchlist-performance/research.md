# Phase 0 Research

## Decision: Host Next.js app on AWS Amplify

**Rationale**: Amplify provides managed hosting for Next.js applications with support for modern rendering modes and simplified deployment, which aligns with a personal-use web app.

**Alternatives considered**:
- Self-host Next.js on EC2 or container platform
- Use a different web framework or static-only hosting

## Decision: Use scheduled AWS Lambda for historical price ingestion

**Rationale**: A serverless scheduled function is a low-ops way to run periodic data ingestion and aligns with a personal-use workload.

**Alternatives considered**:
- Cron jobs on a VM
- Step Functions orchestration
- Managed ETL services

## Decision: Store OHLC history in Apache Iceberg tables on S3

**Rationale**: Iceberg is an open table format for large analytic datasets stored in data lakes, which fits historical price time series and enables future analytics growth.

**Alternatives considered**:
- Raw Parquet files without table format
- Delta Lake or Hudi table formats

## Decision: Use Lambroll for Lambda deployments

**Rationale**: Lambroll is purpose-built for deploying and managing AWS Lambda functions and their aliases/versions, which matches the chosen operational approach.

**Alternatives considered**:
- AWS SAM or Serverless Framework
- Direct AWS CLI deployments

## Decision: Manage infrastructure with Terraform

**Rationale**: Terraform provides reproducible infrastructure as code and integrates well with AWS resources used in this project.

**Alternatives considered**:
- AWS CloudFormation
- Manual console setup
