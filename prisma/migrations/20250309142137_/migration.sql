/*
  Warnings:

  - You are about to drop the column `trialEndDate` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `trialStartDate` on the `Account` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "TrialStatus" AS ENUM ('ACTIVE', 'EXPIRED', 'CANCELLED');

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "trialEndDate",
DROP COLUMN "trialStartDate";

-- CreateTable
CREATE TABLE "Trial" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accountId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" "TrialStatus" NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Trial_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Trial" ADD CONSTRAINT "Trial_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
