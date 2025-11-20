🗄 Database Schema (Prisma)

Copy this into prisma/schema.prisma. This schema handles Users, Authentication, Availability, and Event Types.

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  // Direct connection needed for migrations with Supabase Transaction Pooler
  directUrl = env("DIRECT_URL") 
}

model User {
  id            String          @id @default(cuid())
  name          String?
  email         String          @unique
  emailVerified DateTime?
  image         String?
  userName      String?         @unique
  grantId       String?         // Nylas Grant ID for calendar sync
  grantEmail    String?         // Email connected to Nylas
  
  accounts      Account[]
  sessions      Session[]
  availability  Availability[]
  eventTypes    EventType[]
  
  createdAt     DateTime        @default(now())
  updatedAt     DateTime        @updatedAt
}

model Account {
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?
 
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
 
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
 
  @@id([provider, providerAccountId])
}

model Session {
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
 
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model VerificationToken {
  identifier String
  token      String
  expires    DateTime
 
  @@id([identifier, token])
}

model Availability {
  id        String   @id @default(uuid())
  day       DayOfWeek
  fromTime  String   // Format "09:00"
  tillTime  String   // Format "17:00"
  isActive  Boolean  @default(true)
  
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId    String

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum DayOfWeek {
  MONDAY
  TUESDAY
  WEDNESDAY
  THURSDAY
  FRIDAY
  SATURDAY
  SUNDAY
}

model EventType {
  id            String   @id @default(uuid())
  title         String
  duration      Int      // In minutes
  url           String   // Slug for the booking link
  description   String
  active        Boolean  @default(true)
  videoCallSoftware String @default("Google Meet") // Zoom, Google Meet, Microsoft Teams

  user          User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId        String

  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
