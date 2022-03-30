/*
  Warnings:

  - A unique constraint covering the columns `[cid]` on the table `Concert` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cid` to the `Concert` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logoURL` to the `Concert` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Concert" ADD COLUMN     "cid" TEXT NOT NULL,
ADD COLUMN     "logoURL" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Concert_cid_key" ON "Concert"("cid");
