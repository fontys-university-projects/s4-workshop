/*
  Warnings:

  - Made the column `description` on table `Concert` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
ALTER TYPE "UserRole" ADD VALUE 'CHECKUP';

-- AlterTable
ALTER TABLE "Concert" ALTER COLUMN "description" SET NOT NULL;

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "purchased" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
