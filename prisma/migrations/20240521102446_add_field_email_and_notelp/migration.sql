/*
  Warnings:

  - Made the column `email` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `notelp` on table `Student` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "notelp" SET NOT NULL;
