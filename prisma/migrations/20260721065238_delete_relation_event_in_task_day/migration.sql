/*
  Warnings:

  - You are about to drop the column `eventId` on the `TaskDay` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "TaskDay" DROP CONSTRAINT IF EXISTS "TaskDay_eventId_fkey";

-- AlterTable
ALTER TABLE "TaskDay" DROP COLUMN IF EXISTS "eventId";
