/*
  Warnings:

  - You are about to drop the `user_category` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug]` on the table `category` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "TYPE" AS ENUM ('CLICK', 'VIEW', 'LIKE', 'DISLIKE', 'SHARE', 'SAVE');

-- DropForeignKey
ALTER TABLE "user_category" DROP CONSTRAINT "user_category_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "user_category" DROP CONSTRAINT "user_category_userId_fkey";

-- DropTable
DROP TABLE "user_category";

-- CreateTable
CREATE TABLE "usercategory" (
    "userId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "weight" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usercategory_pkey" PRIMARY KEY ("userId","categoryId")
);

-- CreateTable
CREATE TABLE "news" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sourceId" TEXT NOT NULL,

    CONSTRAINT "news_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "source" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "source_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "newscategory" (
    "newsId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "newscategory_pkey" PRIMARY KEY ("newsId","categoryId")
);

-- CreateTable
CREATE TABLE "userinteraction" (
    "id" TEXT NOT NULL,
    "type" "TYPE" NOT NULL,
    "durationSeconds" INTEGER,
    "userId" TEXT NOT NULL,
    "newsId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "userinteraction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "category_slug_key" ON "category"("slug");

-- AddForeignKey
ALTER TABLE "usercategory" ADD CONSTRAINT "usercategory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usercategory" ADD CONSTRAINT "usercategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news" ADD CONSTRAINT "news_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "newscategory" ADD CONSTRAINT "newscategory_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "news"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "newscategory" ADD CONSTRAINT "newscategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userinteraction" ADD CONSTRAINT "userinteraction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userinteraction" ADD CONSTRAINT "userinteraction_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "news"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
