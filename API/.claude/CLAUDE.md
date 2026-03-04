# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Course Context

Udemy course: [Real World App - Angular, ASP.NET Core Web API & SQL](https://www.udemy.com/course/real-world-app-angular-aspnet-core-web-api-and-sql)

Project name: **CodePulse** — a blogging/content platform built with Angular (UI/) and ASP.NET Core Web API (API/).

## Repository Layout

```
/
├── API/          ← ASP.NET Core Web API (.NET 10, this working directory)
│   └── CodePulse.API/
│       ├── CodePulse.API.sln
│       └── CodePulse.API/   ← main project
│           ├── Program.cs
│           └── CodePulse.API.csproj
└── UI/           ← Angular frontend (not yet scaffolded)
```

## Commands

All commands run from `API/CodePulse.API/` (solution root).

```bash
# Run the API (development)
dotnet run --project CodePulse.API/

# Build
dotnet build

# Watch mode (auto-reload on file changes)
dotnet watch --project CodePulse.API/

# Restore packages
dotnet restore
```

## Tech Stack

- **Runtime**: .NET 10
- **Framework**: ASP.NET Core (minimal API style in `Program.cs`)
- **ORM**: Entity Framework Core 10 with SQLite (`Microsoft.EntityFrameworkCore.Sqlite`)
- **OpenAPI**: `Microsoft.AspNetCore.OpenApi` — endpoint at `/openapi/v1.json` in development
- **Nullable reference types**: enabled
- **Implicit usings**: enabled

## Architecture

```
CodePulse.API/
├── Data/
│   └── ApplicationDbContext.cs   ← EF Core DbContext (BlogPosts, Categories)
├── Models/
│   └── Domain/
│       ├── BlogPost.cs           ← Id, Title, ShortDescription, Content, FeaturedImageUrl,
│       │                            UrlHandle, PublishedData, Author, IsVisible
│       └── Category.cs           ← Id, Name, UrlHandle
└── Program.cs                    ← Minimal API entry point (still has scaffold WeatherForecast)
```

The course follows a layered pattern. Expect to add: controllers, repositories, services, DTOs, and authentication as lessons progress.

## EF Core Migrations

Run from `API/CodePulse.API/` (solution root):

```bash
# Add a migration
dotnet ef migrations add <MigrationName> --project CodePulse.API/

# Apply migrations / create DB
dotnet ef database update --project CodePulse.API/

# List migrations
dotnet ef migrations list --project CodePulse.API/
```
