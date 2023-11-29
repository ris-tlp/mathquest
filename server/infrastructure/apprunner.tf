# resource "aws_apprunner_service" "mathquest-api" {
#   service_name = "mathquest-api"

#   source_configuration {

#     image_repository {
#       image_configuration {
#         port = "8000"
#       }
#       image_identifier      = aws_ecrpublic_repository.mathquest-docker-repo.repository_uri
#       image_repository_type = "ECR_PUBLIC"
#     }
#     auto_deployments_enabled = false
#   }

#   instance_configuration {
#     cpu    = 1024
#     memory = 2048
#   }

#   tags = {
#     Name = "mathquest-api"
#   }
# }
