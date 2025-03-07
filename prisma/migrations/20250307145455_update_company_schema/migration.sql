/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "companyAddress" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "email" TEXT NOT NULL,
    "website" TEXT,
    "primaryContactTitle" TEXT NOT NULL,
    "primaryContactOther" TEXT,
    "primaryFirstName" TEXT NOT NULL,
    "primaryLastName" TEXT NOT NULL,
    "primaryPosition" TEXT NOT NULL,
    "secondaryFirstName" TEXT,
    "secondaryLastName" TEXT,
    "secondaryPosition" TEXT,
    "secondaryEmail" TEXT,
    "secondaryMobile" TEXT,
    "typeOfOperation" TEXT NOT NULL,
    "existingMarkets" TEXT[],
    "companyType" TEXT NOT NULL,
    "companyTypeOther" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_email_key" ON "Company"("email");
