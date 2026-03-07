# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Udemy course: "Real World App - Angular, ASP.NET Core Web API and SQL"
Course URL: https://www.udemy.com/course/real-world-app-angular-aspnet-core-web-api-and-sql

Backend API (`CodePulse.API`) is a .NET 10 ASP.NET Core Web API using SQLite via EF Core.

## Commands

All commands run from `CodePulse.API/`:

```bash
dotnet run                          # Start the API (http://localhost:5000)
dotnet build                        # Build
dotnet ef migrations add "<Name>"   # Add a new EF Core migration
dotnet ef database update           # Apply migrations to CodePulse.db
```

API explorer (dev only): `http://localhost:5000/scalar/v1`

## Architecture

The API follows a layered architecture:

```
Controllers -> Repository Interface -> Repository Implementation -> ApplicationDbContext -> SQLite
```

- **Domain Models** (`Models/Domain/`) — EF Core entities: `Category`, `BlogPost`
- **DTOs** (`Models/DTO/`) — Request/response shapes, e.g. `CreateCategoryRequestDto`, `CategoryDto`
- **DbContext** (`Data/ApplicationDbContext.cs`) — Registers `DbSets`; connection string key is `CodePulseConnectionString`
- **Repository Interface** (`Repositories/Interface/`) — e.g. `ICategoryRepository`
- **Repository Implementation** (`Repositories/Implementation/`) — Concrete EF Core implementations
- **Controllers** (`Controllers/`) — Inject repository interfaces only; no direct `DbContext` usage

New repositories must be registered as `Scoped` in `Program.cs`:
```csharp
builder.Services.AddScoped<IFooRepository, FooRepository>();
```

## Current State (in-progress)

The `CategoriesController` and `CategoryRepository` have bugs introduced during the lesson — they are deliberately being worked through as part of the course. `GET`, `PUT`, `DELETE` still reference `_dbContext` directly (not yet migrated to repository pattern). `CategoryRepository` is incorrectly marked `abstract`.
