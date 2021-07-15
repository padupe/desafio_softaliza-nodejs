/*
  Warnings:

  - You are about to drop the `BlogSpot` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BlogSpot" DROP CONSTRAINT "BlogSpot_created_by_fkey";

-- DropTable
DROP TABLE "BlogSpot";

-- CreateTable
CREATE TABLE "BlogPost" (
    "id" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "title" VARCHAR(60) NOT NULL,
    "content" TEXT NOT NULL,
    "slug" VARCHAR(60) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BlogPost.slug_unique" ON "BlogPost"("slug");

-- AddForeignKey
ALTER TABLE "BlogPost" ADD FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
