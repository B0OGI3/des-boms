/*
  Warnings:

  - You are about to drop the column `fileUrl` on the `FileAttachment` table. All the data in the column will be lost.
  - Added the required column `filePath` to the `FileAttachment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileSize` to the `FileAttachment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mimeType` to the `FileAttachment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storedFileName` to the `FileAttachment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FileAttachment" DROP COLUMN "fileUrl",
ADD COLUMN     "filePath" TEXT NOT NULL,
ADD COLUMN     "fileSize" INTEGER NOT NULL,
ADD COLUMN     "mimeType" TEXT NOT NULL,
ADD COLUMN     "storedFileName" TEXT NOT NULL;
