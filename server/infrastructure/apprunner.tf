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
      image_identifier      = "public.ecr.aws/v7l2f1v7/mathquest-docker-repo:4f91d67e7dca04f045f271339ee0e258b5a41ca9"
      image_repository_type = "ECR_PUBLIC"
    }
    auto_deployments_enabled = false

    # authentication_configuration {
    #   access_role_arn = aws_iam_role.service_role.arn
    # }
  }

  # instance_configuration {
  #   cpu    = 1024
  #   memory = 2048
  # }

  # tags = {
  #   Name = "mathquest-api"
  # }
}
