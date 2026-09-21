-- AlterTable
ALTER TABLE "usermovieinteraction" ADD COLUMN     "likedAt" TIMESTAMP(3),
ADD COLUMN     "savedAt" TIMESTAMP(3),
ADD COLUMN     "shared" TIMESTAMP(3),
ADD COLUMN     "viewedAt" TIMESTAMP(3);
