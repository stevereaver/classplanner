# Enable Necessary APIs
resource "google_project_service" "services" {
  for_each = toset([
    "run.googleapis.com",
    "artifactregistry.googleapis.com",
    "cloudbuild.googleapis.com",
    "iam.googleapis.com"
  ])
  service            = each.key
  disable_on_destroy = false
}

# Create Artifact Registry Repository
resource "google_artifact_registry_repository" "repo" {
  depends_on    = [google_project_service.services]
  location      = var.region
  repository_id = var.repository_name
  description   = "Docker repository for Class Planner"
  format        = "DOCKER"
}

# Create Service Account for CICD
resource "google_service_account" "github_actions" {
  depends_on   = [google_project_service.services]
  account_id   = var.service_account_id
  display_name = "GitHub Actions Deployment Service Account"
}

# Assign Roles to Service Account
resource "google_project_iam_member" "roles" {
  for_each = toset([
    "roles/run.admin",
    "roles/artifactregistry.writer",
    "roles/iam.serviceAccountUser",
    "roles/storage.admin" # Required for Cloud Build/Artifact Registry pushes
  ])
  project = var.project_id
  role    = each.key
  member  = "serviceAccount:${google_service_account.github_actions.email}"
}

# Outputs
output "service_account_email" {
  value = google_service_account.github_actions.email
}

output "repository_url" {
  value = "${var.region}-docker.pkg.dev/${var.project_id}/${var.repository_name}"
}
