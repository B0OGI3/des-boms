-- CreateEnum
CREATE TYPE "SyncStatus" AS ENUM ('PENDING', 'SYNCED', 'FAILED', 'UPDATING');

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "lastSyncedAt" TIMESTAMP(3),
ADD COLUMN     "quickbooksId" TEXT,
ADD COLUMN     "syncError" TEXT,
ADD COLUMN     "syncStatus" "SyncStatus" NOT NULL DEFAULT 'PENDING';
