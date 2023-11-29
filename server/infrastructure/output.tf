output "repository_url" {
  description = "The URL of the repository."
  value       = aws_ecr_repository.mathquest-docker-repo.repository_url
}
