resource "aws_apprunner_service" "mathquest-api" {
  service_name = "mathquest-api"

  source_configuration {
    # authentication_configuration {
    #   access_role_arn = aws_iam_role.access_role.arn
    # }

    image_repository {
      image_configuration {
        port = "8000"
      }
      image_identifier      = "${aws_ecr_repository.mathquest-docker-repo.repository_url}:latest"
      image_repository_type = "ECR_PUBLIC"
    }
    auto_deployments_enabled = false
  }

  instance_configuration {
    cpu    = 1024
    memory = 2048
  }

  tags = {
    Name = "mathquest-api"
  }
}
