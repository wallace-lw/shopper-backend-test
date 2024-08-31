-- CreateTable
CREATE TABLE "Document" (
    "measure_uuid" TEXT NOT NULL,
    "customer_code" TEXT NOT NULL,
    "image_url" TEXT,
    "measure_type" TEXT NOT NULL,
    "measure_value" INTEGER,
    "measure_datetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "has_confirmed" BOOLEAN NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("measure_uuid")
);
