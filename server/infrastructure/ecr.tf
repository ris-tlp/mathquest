resource "aws_ecrpublic_repository" "mathquest-docker-repo" {
  #   provider = aws.us_east_1

  repository_name = "mathquest-docker-repo"

  catalog_data {
    about_text = "All docker images involved with the mathquest api."
  }
}
