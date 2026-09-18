/*
  Warnings:

  - A unique constraint covering the columns `[tmdbId]` on the table `genre` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "genre" ADD COLUMN     "tmdbId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "genre_tmdbId_key" ON "genre"("tmdbId");
