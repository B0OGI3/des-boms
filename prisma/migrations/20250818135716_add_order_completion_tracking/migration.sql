-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('ACTIVE', 'COMPLETED', 'SHIPPED', 'CANCELLED', 'ON_HOLD');

-- AlterTable
ALTER TABLE "PurchaseOrder" ADD COLUMN     "completedAt" TIMESTAMP(3),
ADD COLUMN     "completedBy" TEXT,
ADD COLUMN     "completionNotes" TEXT,
ADD COLUMN     "orderStatus" "OrderStatus" NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "shippedAt" TIMESTAMP(3),
ADD COLUMN     "shippedBy" TEXT,
ADD COLUMN     "shippingNotes" TEXT;
