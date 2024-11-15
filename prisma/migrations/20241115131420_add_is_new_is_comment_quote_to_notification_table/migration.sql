/*
  Warnings:

  - You are about to drop the column `google_id` on the `User` table. All the data in the column will be lost.
  - Added the required column `isComment` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isNew` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quoteId` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "isComment" BOOLEAN NOT NULL,
ADD COLUMN     "isNew" BOOLEAN NOT NULL,
ADD COLUMN     "quoteId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "google_id",
ADD COLUMN     "googleId" TEXT;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "Quote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
