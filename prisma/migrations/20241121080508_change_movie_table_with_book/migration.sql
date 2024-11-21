/*
  Warnings:

  - You are about to drop the column `movieId` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the `Movie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MovieTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MovieToTag` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bookId` to the `Quote` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Movie" DROP CONSTRAINT "Movie_userId_fkey";

-- DropForeignKey
ALTER TABLE "MovieTag" DROP CONSTRAINT "MovieTag_movieId_fkey";

-- DropForeignKey
ALTER TABLE "MovieTag" DROP CONSTRAINT "MovieTag_tagId_fkey";

-- DropForeignKey
ALTER TABLE "Quote" DROP CONSTRAINT "Quote_movieId_fkey";

-- DropForeignKey
ALTER TABLE "_MovieToTag" DROP CONSTRAINT "_MovieToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_MovieToTag" DROP CONSTRAINT "_MovieToTag_B_fkey";

-- AlterTable
ALTER TABLE "Quote" DROP COLUMN "movieId",
ADD COLUMN     "bookId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Movie";

-- DropTable
DROP TABLE "MovieTag";

-- DropTable
DROP TABLE "_MovieToTag";

-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "name" JSONB NOT NULL,
    "director" JSONB NOT NULL,
    "description" JSONB NOT NULL,
    "image" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "budget" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookTag" (
    "bookId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "BookTag_pkey" PRIMARY KEY ("bookId","tagId")
);

-- CreateTable
CREATE TABLE "_BookToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BookToTag_AB_unique" ON "_BookToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_BookToTag_B_index" ON "_BookToTag"("B");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookTag" ADD CONSTRAINT "BookTag_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookTag" ADD CONSTRAINT "BookTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToTag" ADD CONSTRAINT "_BookToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToTag" ADD CONSTRAINT "_BookToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
