output "repository_url" {
  description = "The URL of the repository."
  value       = aws_ecrpublic_repository.mathquest-docker-repo.repository_uri
}
