# Stockio — Warehouse Frontend (Phase 1)

**Stockio** یک پروژه مدیریت انبار و کالا است.  
این ریپازیتوری مربوط به **فرانت‌اند فاز اول** است که با **Vue 3 + Vite** و **Tailwind CSS v4** ساخته شده و برای فارسی/RTL بهینه شده است.

---

## Table of Contents
- [Overview](#overview)
- [Features (Phase 1)](#features-phase-1)
- [Tech Stack](#tech-stack)
- [Requirements](#requirements)
- [Setup & Run](#setup--run)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Routing](#routing)
- [Styling & Theme](#styling--theme)
    - [Tailwind v4](#tailwind-v4)
    - [Brand Colors (CSS Variables)](#brand-colors-css-variables)
    - [Font (Vazirmatn)](#font-vazirmatn)
    - [RTL Notes](#rtl-notes)
- [Build & Deployment](#build--deployment)
- [Notes & Conventions](#notes--conventions)
- [Roadmap](#roadmap)
- [License](#license)

---

## Overview

هدف این فاز، آماده‌سازی یک UI استاندارد، سریع و قابل توسعه برای مدیریت اولیه صفحات عمومی، احراز هویت (در حد UI) و صفحه کالاهاست.  
اتصال به بک‌اند Laravel و APIها در فازهای بعدی انجام می‌شود.

---

## Features (Phase 1)

- صفحات عمومی:
    - Home
    - About
    - Contact
- صفحات احراز هویت (UI Only):
    - Login
    - Register
- صفحه کالاها (Products):
    - نمایش لیست
    - افزودن/حذف (روی داده‌های mock / state داخلی)
- طراحی RTL و فونت فارسی
- پالت رنگی قابل تغییر با CSS Variables
- ساختار پروژه مرتب و قابل تحویل

---

## Tech Stack

- **Vue**: 3.x
- **Vite**: 8.x
- **Tailwind CSS**: v4 (via `@tailwindcss/vite`)
- **Router**: `vue-router` v4
- **Font**: `@fontsource/vazirmatn`

---

## Requirements

- Node.js >= 18 (پیشنهادی: 20+)
- npm (یا pnpm / yarn)

---

## Setup & Run

### 1) Install dependencies
```bash
npm install 
```
### 2) Run development server

```bash
npm run dev
```

ساخت نسخه production:
```bash
npm run preview
```


