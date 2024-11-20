/*
  Warnings:

  - You are about to drop the column `verificationToken` on the `Email` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Email" DROP COLUMN "verificationToken";
