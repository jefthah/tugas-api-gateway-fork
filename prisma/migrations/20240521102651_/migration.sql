/*
  Warnings:

  - You are about to drop the column `notelp` on the `Student` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[telp]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `telp` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Student_notelp_key";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "notelp",
ADD COLUMN     "telp" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Student_telp_key" ON "Student"("telp");
