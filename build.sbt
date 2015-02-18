name := "listr"

version := "1.0-SNAPSHOT"


libraryDependencies ++= Seq(
  javaJdbc,
  cache,
  javaJpa,
  "org.hibernate" % "hibernate-core" % "4.2.3.Final",
  "org.hibernate" % "hibernate-entitymanager" % "4.2.3.Final"
)     

val appDependencies = Seq(
  javaJdbc
)

play.Project.playJavaSettings
