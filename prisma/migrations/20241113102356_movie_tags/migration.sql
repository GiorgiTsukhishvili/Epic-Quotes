-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "tag" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovieTag" (
    "movieId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "MovieTag_pkey" PRIMARY KEY ("movieId","tagId")
);

-- CreateTable
CREATE TABLE "_MovieToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MovieToTag_AB_unique" ON "_MovieToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_MovieToTag_B_index" ON "_MovieToTag"("B");

-- AddForeignKey
ALTER TABLE "MovieTag" ADD CONSTRAINT "MovieTag_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieTag" ADD CONSTRAINT "MovieTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieToTag" ADD CONSTRAINT "_MovieToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieToTag" ADD CONSTRAINT "_MovieToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
