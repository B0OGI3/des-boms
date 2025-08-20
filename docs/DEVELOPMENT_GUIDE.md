# DES-BOMS Development Guide

Quick reference for development workflow and best practices.

## 🚀 Quick Setup

1. Clone repository and install dependencies
2. Copy `.env.example` to `.env.local` and configure
3. Start Docker: `pnpm docker:dev`
4. Run migrations: `pnpm db:migrate`
5. Start development: `pnpm dev`

## 🛠️ Key Scripts

- `pnpm dev` - Start development server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm type-check` - TypeScript checking
- `pnpm cleanup` - Clean temporary files
- `pnpm security-check` - Check Git security
- `pnpm db:studio` - Open database browser

## � Pre-Commit Checklist

- Run `pnpm lint` and fix issues
- Run `pnpm type-check` for TypeScript errors
- Format code with `pnpm format`
- Check `git status` before staging
- Use `git add -p` for selective staging
- Run `pnpm security-check`

## 🔒 Security Guidelines

- Never commit `.env` files or tokens
- Use `.env.local` for development secrets
- Run security checks before commits
- Review git status carefully

## � Common Issues

- **Database**: Check Docker containers with `docker-compose ps`
- **QuickBooks**: Verify tokens in `.env.local`
- **Build errors**: Run `pnpm cleanup` and reinstall
- **Type errors**: Check with `pnpm type-check`

For detailed information, see the main [README.md](../README.md)
