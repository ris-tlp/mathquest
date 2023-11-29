output "repository_url" {
  description = "The URI of the repository."
  value       = aws_ecrpublic_repository.mathquest-docker-repo.repository_uri
}
