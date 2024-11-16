/*
  Warnings:

  - You are about to drop the column `is_primary` on the `Email` table. All the data in the column will be lost.
  - Added the required column `isPrimary` to the `Email` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Email" DROP COLUMN "is_primary",
ADD COLUMN     "isPrimary" BOOLEAN NOT NULL;
