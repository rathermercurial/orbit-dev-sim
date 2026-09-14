---
title: Release Notes
date: 2024-04-01
author: dave
---

Version 1.2.0 introduces three major capabilities that our community has been requesting since the public launch. We have also fixed fourteen bugs, improved cold-start latency by thirty percent, and updated seven dependencies for security patches.

The headline feature is multi-region deployments. You can now define a primary region and up to two failover regions in your project manifest. The platform handles traffic routing, data replication, and automated failback without manual intervention. Configuration is declarative: add region blocks to your manifest and deploy as usual.

We are also shipping the new Stellar content distribution network integration. Documentation and design assets are now cached at edge locations, which means international teams see dramatically faster load times. Eve and Bob led this initiative, and the early metrics from our beta cohort look promising.

Finally, the Solar monitoring dashboard now supports custom alert thresholds based on anomaly detection rather than static values. This reduces alert fatigue for teams with seasonal traffic patterns and makes on-call rotations more sustainable.

Breaking changes are limited to the deprecated v1 jobs endpoint, which will be removed in version 1.4.0. Migration takes about fifteen minutes for most integrations. See the changelog for the full list of changes.
