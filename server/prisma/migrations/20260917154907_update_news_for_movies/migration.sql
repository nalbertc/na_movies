/*
  Warnings:

  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `news` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `newscategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `source` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usercategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userinteraction` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "INTERACTION_TYPE" AS ENUM ('CLICK', 'VIEW', 'LIKE', 'DISLIKE', 'SHARE', 'SAVE');

-- DropForeignKey
ALTER TABLE "news" DROP CONSTRAINT "news_sourceId_fkey";

-- DropForeignKey
ALTER TABLE "newscategory" DROP CONSTRAINT "newscategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "newscategory" DROP CONSTRAINT "newscategory_newsId_fkey";

-- DropForeignKey
ALTER TABLE "usercategory" DROP CONSTRAINT "usercategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "usercategory" DROP CONSTRAINT "usercategory_userId_fkey";

-- DropForeignKey
ALTER TABLE "userinteraction" DROP CONSTRAINT "userinteraction_newsId_fkey";

-- DropForeignKey
ALTER TABLE "userinteraction" DROP CONSTRAINT "userinteraction_userId_fkey";

-- DropTable
DROP TABLE "category";

-- DropTable
DROP TABLE "news";

-- DropTable
DROP TABLE "newscategory";

-- DropTable
DROP TABLE "source";

-- DropTable
DROP TABLE "usercategory";

-- DropTable
DROP TABLE "userinteraction";

-- DropEnum
DROP TYPE "TYPE";

-- CreateTable
CREATE TABLE "genre" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usergenre" (
    "userId" TEXT NOT NULL,
    "genreId" TEXT NOT NULL,
    "weight" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usergenre_pkey" PRIMARY KEY ("userId","genreId")
);

-- CreateTable
CREATE TABLE "movie" (
    "id" TEXT NOT NULL,
    "tmdbId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "url" TEXT,
    "posterPath" TEXT,
    "backdropPath" TEXT,
    "releaseDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "moviegenre" (
    "movieId" TEXT NOT NULL,
    "genreId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "moviegenre_pkey" PRIMARY KEY ("movieId","genreId")
);

-- CreateTable
CREATE TABLE "usermovieinteraction" (
    "id" TEXT NOT NULL,
    "type" "INTERACTION_TYPE" NOT NULL,
    "durationSeconds" INTEGER,
    "userId" TEXT NOT NULL,
    "movieId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usermovieinteraction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "genre_slug_key" ON "genre"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "movie_tmdbId_key" ON "movie"("tmdbId");

-- AddForeignKey
ALTER TABLE "usergenre" ADD CONSTRAINT "usergenre_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usergenre" ADD CONSTRAINT "usergenre_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "moviegenre" ADD CONSTRAINT "moviegenre_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "moviegenre" ADD CONSTRAINT "moviegenre_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usermovieinteraction" ADD CONSTRAINT "usermovieinteraction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usermovieinteraction" ADD CONSTRAINT "usermovieinteraction_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
