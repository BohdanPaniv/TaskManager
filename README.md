# TaskManager

A Trello-style kanban board application built with Angular 21 and ASP.NET Core 9.

![TaskManager](https://img.shields.io/badge/Angular-21-red?style=flat-square&logo=angular)
![ASP.NET Core](https://img.shields.io/badge/ASP.NET_Core-9-blue?style=flat-square&logo=dotnet)
![SQL Server](https://img.shields.io/badge/SQL_Server-2022-orange?style=flat-square&logo=microsoftsqlserver)

---

## Features

- **Authentication** — register and login with JWT
- **Boards** — create, update and delete boards
- **BoardLists** — create and delete lists inside boards
- **Tasks** — full CRUD on tasks inside lists
- **Drag & Drop** — move tasks between lists using Angular CDK
- **Real-time UI** — Angular signals for reactive state management

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| Angular 21 | UI framework |
| TypeScript | Language |
| Angular CDK | Drag & drop |
| Angular Signals | State management |
| Reactive Forms | Form handling |
| SCSS (BEM) | Styling |
| RxJS | HTTP & async |

### Backend
| Technology | Purpose |
|---|---|
| ASP.NET Core 9 | Web API framework |
| C# | Language |
| Entity Framework Core | ORM |
| SQL Server | Database |
| JWT | Authentication |
| AutoMapper | Object mapping |
| Serilog | Logging |

---

## Architecture

### Backend — Multi-project clean architecture

```
Server/
├── WebApi/          # Controllers, middleware, extensions
├── BusinessLogic/   # Services, interfaces, exceptions
├── DataAccess/      # DbContext, repositories, migrations
├── AppModels/       # EF Core entities
└── Common/          # DTOs, request/response models
```

### Frontend — Feature-based structure

```
Client/src/app/
├── core/            # Auth service, guard, interceptors, models
├── shared/          # Reusable UI components
├── layout/          # Header, main layout
└── features/
    ├── home/        # Landing page
    ├── auth/        # Login & register
    ├── boards/      # Boards list page
    └── board/       # Single board with lists and tasks
```

### Data model

```
User
└── Board
    └── BoardList (column)
        └── Task (card)
```

---

## Getting Started

### Prerequisites

- [.NET 9 SDK](https://dotnet.microsoft.com/download)
- [Node.js 18+](https://nodejs.org)
- [SQL Server](https://www.microsoft.com/sql-server)
- [Angular CLI](https://angular.io/cli)

```bash
npm install -g @angular/cli
```

### 1 — Clone the repository

```bash
git clone https://github.com/BohdanPaniv/TaskManager.git
cd TaskManager
```

### 2 — Setup the backend

**Step 1 — Create `appsettings.Development.json`**:

```bash
cd Server/WebApi
New-Item appsettings.Development.json
```

Fill in your local values:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Initial Catalog=TaskManager;Trusted_Connection=True;TrustServerCertificate=True"
  },
  "Jwt": {
    "Secret": "YOUR_SECRET_KEY_MIN_32_CHARS"
  },
  "AllowedOrigins": "http://localhost:4200"
}
```
 
**Step 2 — Create `launchSettings.json`**:
 
```bash
New-Item -ItemType Directory -Path Properties
New-Item -Path Properties/launchSettings.json
```

 Fill in your local values:
```json
{
  "profiles": {
    "http": {
      "commandName": "Project",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      },
      "dotnetRunMessages": true,
      "applicationUrl": "http://localhost:5000"
    },
    "IIS Express": {
      "commandName": "IISExpress",
      "launchBrowser": true,
      "launchUrl": "swagger",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    }
  },
  "$schema": "https://json.schemastore.org/launchsettings.json",
  "iisSettings": {
    "windowsAuthentication": false,
    "anonymousAuthentication": true,
    "iisExpress": {
      "applicationUrl": "http://localhost:64629/",
      "sslPort": 44382
    }
  }
}
```
 
**Step 3 — Start the server:**
 
```bash
dotnet run
```
 
Server runs at `http://localhost:5000`
Swagger UI at `http://localhost:5000/swagger`

### 3 — Setup the frontend

```bash
cd Client
npm install
npm start
```

Client runs at `http://localhost:4200`

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/Auth/register` | Register new user |
| POST | `/api/Auth/login` | Login and get JWT token |

### Board
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/boards` | Get all user boards |
| POST | `/api/boards` | Create board |
| GET | `/api/boards/{id}` | Get board by ID |
| PUT | `/api/boards/{id}` | Update board title |
| DELETE | `/api/boards/{id}` | Delete board |
| GET | `/api/boards/{identNumber}` | Get board by ident number |

### BoardList
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/boardlist/{id}` | Get list by ID |
| DELETE | `/api/boardlist/{id}` | Delete list |
| GET | `/api/boardlist/{identNumber}` | Get list by ident number |
| POST | `/api/boardlist` | Create list |

### Task
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/task` | Get all tasks |
| POST | `/api/task` | Create task |
| GET | `/api/task/{id}` | Get task by ID |
| PUT | `/api/task/{id}` | Update task |
| DELETE | `/api/task/{id}` | Delete task |
| PATCH | `/api/task/{id}/move` | Move task to another list |

---

## Key Patterns Used

- **Repository pattern** — data access abstracted behind interfaces
- **Service layer** — business logic separated from controllers
- **DTO pattern** — API never exposes database entities directly
- **Global exception middleware** — centralized error handling
- **JWT interceptor** — token automatically attached to all requests
- **Auth guard** — protected routes redirect unauthenticated users
- **Angular signals** — reactive state without NgRx complexity

---

## Screenshots
<img width="2560" height="1272" alt="image" src="https://github.com/user-attachments/assets/10272d86-afc5-41e4-9d45-5b232caf5f65" />

<img width="2560" height="1272" alt="image" src="https://github.com/user-attachments/assets/217ecd00-9360-46f9-b34a-c405a41bc0d7" />

<img width="2560" height="1272" alt="image" src="https://github.com/user-attachments/assets/af8b5d37-d5b3-4699-91d9-736477658fce" />


