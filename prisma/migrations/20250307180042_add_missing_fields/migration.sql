/*
  Warnings:

  - Added the required column `primaryEmail` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `primaryMobile` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "primaryEmail" TEXT NOT NULL,
ADD COLUMN     "primaryMobile" TEXT NOT NULL;
