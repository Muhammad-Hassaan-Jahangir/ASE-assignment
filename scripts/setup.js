#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

console.log('🚀 Setting up Book Catalog App...\n');

// Generate a random secret for NextAuth
const generateSecret = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Create .env.local if it doesn't exist
const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  const envContent = `# Database
DATABASE_URL="postgresql://username:password@localhost:5432/bookcatalog"

# NextAuth.js
NEXTAUTH_SECRET="${generateSecret()}"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
`;

  fs.writeFileSync(envPath, envContent);
  console.log('✅ Created .env.local file with default values');
  console.log('📝 Please update the DATABASE_URL with your PostgreSQL connection string');
} else {
  console.log('⚠️  .env.local already exists, skipping creation');
}

console.log('\n📋 Next steps:');
console.log('1. Update DATABASE_URL in .env.local with your PostgreSQL connection');
console.log('2. Run: npx prisma generate');
console.log('3. Run: npx prisma db push');
console.log('4. Run: npm run dev');
console.log('\n�� Setup complete!'); 