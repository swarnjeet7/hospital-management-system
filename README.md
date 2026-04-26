# 🏥 Hospital Management System

A full-stack hospital management system built with modern web technologies. Manages patients, doctors, appointments, billing, and administrative tasks.

## 📋 Project Status

🚧 **Under active development** — Initial setup phase.

## 🏗️ Tech Stack

### Backend
- **Runtime:** Node.js 24 LTS
- **Language:** TypeScript 6
- **Framework:** Express.js
- **Database:** MySQL
- **ORM:** Prisma
- **Architecture:** Modular Monolith
- **Authentication:** JWT + bcrypt
- **Validation:** Zod

### Frontend
- **TBD** — Frontend stack to be decided by frontend team

## 📁 Project Structure

```
hospital-management-system/
├── backend/              # Node.js + TypeScript API
│   ├── src/              # Source code
│   ├── package.json
│   └── tsconfig.json
├── frontend/             # Frontend application (in development)
└── README.md
```

## 🎯 Features (Planned)

- 🔐 **Authentication** — Login, Registration, Password Recovery
- 📊 **Dashboard** — Overview, Stats, Notifications
- 👥 **Patient Module** — Add, View, Update patients
- 👨‍⚕️ **Doctor Module** — Doctor profiles & schedules
- 📅 **Appointment Module** — Book, Cancel appointments
- 💰 **Billing** — Generate bills, Track payments
- ⚙️ **Admin Tools** — Reports, User Management, Settings

## 🚀 Getting Started

### Prerequisites

- **Node.js** v24 LTS or higher → [Install via NVM](https://github.com/nvm-sh/nvm)
- **pnpm** v10+ → `npm install -g pnpm`
- **MySQL** v8+ → [Download](https://dev.mysql.com/downloads/)
- **Git** → [Download](https://git-scm.com/)

### Clone the Repository

```bash
git clone git@github.com:swarnjeetsingh/hospital-management-system.git
cd hospital-management-system
```

---

## 🔧 Backend Setup

### Installation

```bash
cd backend
pnpm install
```

### Environment Variables

Create a `.env` file in the `backend/` directory:

```bash
cp .env.example .env
```

Update the values in `.env` with your local configuration (database credentials, JWT secrets, etc.).

### Run the Backend

```bash
# Development mode (auto-reload)
pnpm dev

# Build for production
pnpm build

# Run production build
pnpm start
```

The backend server will start on `http://localhost:4000` (configurable in `.env`).

### API Documentation

📖 API documentation will be available at `http://localhost:4000/api/docs` once Swagger is integrated.

---

## 🎨 Frontend Setup

> ⚠️ **Frontend is not yet set up.** Once the frontend team initializes the project, this section will be updated with setup instructions.

### Expected Structure (TBD)

```bash
cd frontend
pnpm install
pnpm dev
```

---

## 🌿 Branching Strategy

We follow a **simplified Git Flow** for clean collaboration:

- **`main`** — Production-ready code (protected)
- **`develop`** — Integration branch for features
- **`feature/<name>`** — New features (e.g., `feature/patient-crud`)
- **`fix/<name>`** — Bug fixes (e.g., `fix/login-validation`)

### Workflow

```bash
# Create a feature branch from develop
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name

# Work, commit, push
git add .
git commit -m "feat: your descriptive message"
git push origin feature/your-feature-name

# Open a Pull Request to develop branch
```

### Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` — New feature
- `fix:` — Bug fix
- `docs:` — Documentation changes
- `refactor:` — Code refactoring
- `test:` — Adding tests
- `chore:` — Build, config, dependencies

**Examples:**
```
feat: add patient registration endpoint
fix: resolve JWT token expiration issue
docs: update API documentation
```

---

## 🤝 Contributing

### For Frontend Developers

1. **Clone** the repo and `cd frontend/`
2. Initialize your frontend project (React/Vue/Angular — your choice)
3. Read the **API contract** in `backend/docs/` (coming soon)
4. Use the backend running on `http://localhost:4000`
5. Open a PR to `develop` branch

### For Backend Developers

1. Pick an issue from [GitHub Issues](../../issues)
2. Create a feature branch
3. Write code with proper TypeScript types
4. Add tests where applicable
5. Open a PR to `develop`

---

## 📚 Documentation

- 📖 [Backend Architecture](./backend/docs/ARCHITECTURE.md) — *(coming soon)*
- 🔌 [API Reference](./backend/docs/API.md) — *(coming soon)*
- 🗄️ [Database Schema](./backend/docs/SCHEMA.md) — *(coming soon)*

---

## 🐛 Reporting Issues

Found a bug? Have a feature request?

👉 [Open an Issue](../../issues/new)

---

## 👥 Team

| Role | Name | GitHub |
|------|------|--------|
| Backend Developer | Swarnjeet Singh | [@swarnjeetsingh](https://github.com/swarnjeetsingh) |
| Frontend Developer | TBD | TBD |

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

Built as a learning project to master full-stack development with Node.js, TypeScript, and modern web practices.

---

⭐ **If you find this project useful, give it a star!**