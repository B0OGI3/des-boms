-- CreateTable
CREATE TABLE "PartNumberSequence" (
    "id" TEXT NOT NULL,
    "partType" "PartType" NOT NULL,
    "year" INTEGER NOT NULL,
    "lastNumber" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PartNumberSequence_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PartNumberSequence_partType_year_key" ON "PartNumberSequence"("partType", "year");
