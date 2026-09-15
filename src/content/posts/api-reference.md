---
title: API Reference
date: 2024-05-01
author: priya-sharma
---

The Orbit API is organized around resources that correspond to the entities you manage in the platform: projects, deployments, services, metrics, and alerts. Every resource supports standard create, read, update, and delete operations through predictable REST endpoints. All requests and responses use JSON, and every successful call returns an appropriate HTTP status code.

Authentication is handled via bearer tokens passed in the Authorization header. You can generate personal access tokens from your account settings or create service tokens for automated workflows. Tokens expire after ninety days and can be rotated without downtime. Rate limits are applied per token and scale with your plan tier.

The API uses cursor-based pagination for list endpoints. Each paginated response includes a `next_cursor` field that you pass to subsequent requests until the result set is exhausted. This approach guarantees stable ordering even when the underlying data changes between requests.

For long-running operations, such as fleet deployments or bulk imports, the API returns a job identifier immediately. You can poll the jobs endpoint for status updates or register a webhook to receive notifications when the operation completes.

Error responses follow a consistent structure with a machine-readable code, a human-readable message, and optional field-level details for validation failures. Refer to the error catalog for specific remediation steps.
