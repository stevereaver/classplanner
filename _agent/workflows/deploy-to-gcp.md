---
description: How to deploy the Class Planner application to Google Cloud Run
---

This workflow describes the steps to set up Google Cloud Platform (GCP) and GitHub Secrets for automated deployment.

### 1. GCP Project Setup
1. Create a project in the [Google Cloud Console](https://console.cloud.google.com/).
2. Enable the following APIs:
   - Cloud Run API
   - Artifact Registry API
   - Cloud Build API
3. Create an **Artifact Registry** repository:
   - Name: `classplanner`
   - Format: Docker
   - Region: `australia-southeast1`

### 2. Service Account Setup
1. Create a Service Account (e.g., `github-actions-deployer`).
2. Grant the following roles:
   - `Cloud Run Admin`
   - `Storage Admin` (to push images to Artifact Registry)
   - `Service Account User`
3. Create a **JSON Key** for this Service Account and download it.

### 3. GitHub Secrets Configuration
In your GitHub repository, go to **Settings > Secrets and variables > Actions** and add the following secrets:
- `GCP_PROJECT_ID`: Your GCP Project ID.
- `GCP_SA_KEY`: The entire content of the Service Account JSON key.
- `OPENROUTER_API_KEY`: Your OpenRouter API key (this will be injected into Cloud Run).

### 4. Trigger Deployment
1. Push your changes to the `master` branch.
2. Monitor the progress in the **Actions** tab of your GitHub repository.

// turbo
3. Run the following command locally to verify your Docker configuration before pushing to GitHub:
```powershell
docker-compose build
```