resource "aws_ecrpublic_repository" "mathquest-docker-repo" {
  #   provider = aws.us_east_1
  repository_name = "mathquest-docker-repo"
}
