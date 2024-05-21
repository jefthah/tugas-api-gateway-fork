/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[notelp]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Made the column `name` on table `Student` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "email" TEXT,
ADD COLUMN     "notelp" TEXT,
ALTER COLUMN "name" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_notelp_key" ON "Student"("notelp");
