-- CreateEnum
CREATE TYPE "IntendedUse" AS ENUM ('BUSINESS_EFFICIENCY', 'CLIENTS_SERVICE_PROVIDER', 'ENHANCE_AI_AGENTS', 'OTHER');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "currentRole" TEXT NOT NULL,
    "preferredCommunicationLanguage" TEXT NOT NULL,
    "intendedUse" "IntendedUse" NOT NULL,
    "comments" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "trialStartDate" TIMESTAMP(3) NOT NULL,
    "trialEndDate" TIMESTAMP(3) NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");
