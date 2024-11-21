/*
  Warnings:

  - You are about to drop the column `director` on the `Book` table. All the data in the column will be lost.
  - Added the required column `author` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "director",
ADD COLUMN     "author" JSONB NOT NULL;
