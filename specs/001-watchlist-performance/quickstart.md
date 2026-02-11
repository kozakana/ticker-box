# Quickstart

## Prerequisites

- Node.js LTS
- AWS credentials with access to the target account
- Terraform and Lambroll installed

## Web App (Next.js)

```bash
cd apps/web
npm install
npm run dev
```

## Lambda Functions

```bash
cd lambdas/price-ingest
npm install
npm test
```

```bash
cd lambdas/backfill-1y
npm install
npm test
```

## Infrastructure (Terraform)

```bash
cd infra/terraform
terraform init
terraform plan
```

## Deploy Lambda (Lambroll)

```bash
lambroll deploy
```
