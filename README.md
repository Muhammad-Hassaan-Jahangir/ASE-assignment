# Book Catalog App

A full-stack book catalog application built with Next.js, TypeScript, PostgreSQL, Prisma ORM, and NextAuth.js for user authentication.

## Features

### 🔐 Authentication
- **Email/Password Authentication**: Secure user registration and login with bcrypt password hashing
- **Google OAuth**: Sign in with Google account
- **Session Management**: JWT-based sessions with NextAuth.js
- **Protected Routes**: Automatic redirection for unauthenticated users

### 📚 Book Management
- **View All Books**: Display all books in a responsive card layout
- **Add New Books**: Form with validation for title, author, and genre
- **Delete Books**: Users can delete their own books with confirmation
- **User Attribution**: Each book shows who added it

### 🎨 UI/UX
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean, professional design with Tailwind CSS
- **Loading States**: Smooth loading indicators and error handling
- **Form Validation**: Client and server-side validation

## Tech Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript
- **Backend**: Next.js API Routes
- **Authentication**: NextAuth.js (Email/Password, Google)
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Prerequisites

- Node.js 18+ 
- PostgreSQL database (Neon, Supabase, or ElephantSQL)
- Google OAuth credentials (optional)

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <your-repo-url>
cd my-next-app
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/bookcatalog"

# NextAuth.js
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 3. Database Setup

1. **Set up PostgreSQL database** (choose one):
   - [Neon](https://neon.tech) (Recommended for Vercel)
   - [Supabase](https://supabase.com)
   - [ElephantSQL](https://elephantsql.com)

2. **Run Prisma migrations**:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

### 4. Google OAuth Setup (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret to `.env.local`

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## API Routes

### Authentication
- `POST /api/auth/register` - User registration
- `GET/POST /api/auth/[...nextauth]` - NextAuth.js routes

### Books
- `GET /api/books` - Fetch all books
- `POST /api/books` - Add a new book (requires authentication)
- `DELETE /api/books/[id]` - Delete a book (requires authentication)

## Pages

- `/` - Home page with book catalog
- `/add` - Add new book (protected)
- `/auth/signin` - Sign in/Sign up page

## Database Schema

### User Model
```prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  password      String?
  accounts      Account[]
  sessions      Session[]
  books         Book[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```

### Book Model
```prisma
model Book {
  id        String   @id @default(cuid())
  title     String
  author    String
  genre     String
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Deployment

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Deploy to Vercel

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard:
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (your production URL)
   - `GOOGLE_CLIENT_ID` (if using Google OAuth)
   - `GOOGLE_CLIENT_SECRET` (if using Google OAuth)

3. Deploy and verify functionality

## Authentication Flow

### Email/Password Registration
1. User fills registration form
2. Password is hashed with bcrypt
3. User is created in database
4. Auto sign-in after successful registration

### Email/Password Login
1. User provides email/password
2. Credentials are validated against database
3. Session is created with NextAuth.js

### Google OAuth
1. User clicks "Sign in with Google"
2. Redirected to Google OAuth
3. Google returns user data
4. User is created/updated in database
5. Session is created

## Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Sessions**: Secure session management
- **CSRF Protection**: Built-in NextAuth.js protection
- **Input Validation**: Client and server-side validation
- **Authorization**: Users can only delete their own books

## Responsive Design

The app is designed to work on:
- **Desktop**: Full layout with navigation and cards
- **Tablet**: Responsive grid layout
- **Mobile**: Stacked layout with touch-friendly buttons

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify DATABASE_URL is correct
   - Ensure database is accessible
   - Run `npx prisma db push` to sync schema

2. **Authentication Issues**
   - Check NEXTAUTH_SECRET is set
   - Verify Google OAuth credentials (if using)
   - Clear browser cookies and try again

3. **Build Errors**
   - Run `npm install` to ensure all dependencies
   - Check TypeScript errors with `npm run build`
   - Verify environment variables are set

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details
