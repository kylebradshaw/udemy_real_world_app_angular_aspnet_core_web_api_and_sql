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
- **OpenAPI**: `Microsoft.AspNetCore.OpenApi` — OpenAPI endpoint available at `/openapi/v1.json` in development
- **Nullable reference types**: enabled
- **Implicit usings**: enabled

## Architecture Notes

The API is in its initial scaffolded state. As the course progresses, expect to add:
- Entity Framework Core with SQL Server
- Controllers or additional minimal API endpoints
- Authentication/authorization
- Domain models, repositories, and services
