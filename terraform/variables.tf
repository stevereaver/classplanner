variable "project_id" {
  description = "The GCP Project ID"
  type        = string
}

variable "region" {
  description = "The GCP region to deploy to"
  type        = string
  default     = "australia-southeast1"
}

variable "repository_name" {
  description = "The name of the Artifact Registry repository"
  type        = string
  default     = "classplanner"
}

variable "service_account_id" {
  description = "The ID of the service account for CICD"
  type        = string
  default     = "github-actions-deployer"
}
