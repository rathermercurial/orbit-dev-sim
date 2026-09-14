---
title: Quick Start
date: 2024-02-01
author: bob
---

You can have your first project running on the Orbit platform in under ten minutes. This guide walks through installation, authentication, and a basic deployment so you can validate the workflow before committing to a full migration.

Start by installing the command-line interface. The binary is available for macOS, Linux, and Windows through our package registry. Run the install script, then verify the installation by typing `orbit version` in your terminal. You should see the current release number and a green checkmark indicating that dependencies are satisfied.

Next, authenticate with your account credentials. The CLI will open a browser window for single sign-on, then store a short-lived token locally. If you prefer headless environments, you can generate a service token from the dashboard and export it as an environment variable.

Create your first project by running `orbit init`. The wizard asks for a project name, selects a region, and provisions a minimal configuration file. Review the generated manifest, then run `orbit deploy` to push your first build. The deployment typically completes within ninety seconds.

Once the deployment finishes, open the provided URL to see your application running. From here you can add monitoring, connect a custom domain, and invite team members. When you are ready for production, read the API Reference for advanced configuration options.
