# REAL WORLD APP ANGULAR ASPNET CORE WEB API & SQL

https://www.udemy.com/course/real-world-app-angular-aspnet-core-web-api-and-sql

## 23. Running EF Core Migrations

`Tools > NuGet Package Manager > Package Manager Console`

this doesn't exist in Rider, so we have to use the CLI instead. `dotnet ef migrations add InitialCreate` and `dotnet ef database update` to create the database and apply the migration.

`dotnet ef --help`

`dotnet tool install --global dotnet-ef`

`dotnet ef migrations add [MigrationName]`

`dotnet ef database update`

https://blog.jetbrains.com/dotnet/2017/11/14/working-rider-built-terminal/

```
kb@macFi ~/Development/_LEARNING/udemy_real_world_app_angular_aspnet_core_web_api_and_sql/CodePulse.API                                                                                                                                                     > $ dotnet ef migrations add "Initial Migration"
> $ dotnet ef database update
```

_CodePulse.db_ should now be created in the root of the project.

## 22. understanding Dependency Injection and injecting DbContext into the application (Program.cs)

DI - pattern to increase maintainability and testability of the code. allows us to inject dependencies into a class rather than hardcoding them. In Program.cs, we can add services to the DI container and then inject them into our controllers or other classes as needed.

DI container is responsible or creating and managing instances

## 21. adding ConnectionString to the database in appsettings.json

(lean on claude here due to DEVIATION) in appsettings.json, `Data Source=CodePulse.db` is all that's necessary

## 20. DbContext Class

represents a session with the database and can be used to query and save instances of your entities. DbContext is a combination of the Unit Of Work and Repository patterns. perform crud operations and is bridge between Controller and Database

## 19. nuget packages for Entity Framework Core

**DEVIATION** instead of sql server,
Microsoft.EntityFrameworkCore.Sqlite instead of sqlserver
Microsoft.EntityFrameworkCore.Tools

## 18, 17. Project & Domain Models

Category, BlogPost for the API exercise

## 16. Showing routes but we haven't done anything yet

## 15. REST overview

## 14. create core api project in rider

## 13. /Users/kb/Development/_LEARNING/udemy_real_world_app_angular_aspnet_core_web_api_and_sql
API created in Rider

## RESOURCES
