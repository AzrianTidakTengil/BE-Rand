-- CreateTable
CREATE TABLE "LogSchedule" (
    "id" SERIAL NOT NULL,
    "createDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "taskDayId" INTEGER,
    "eventId" INTEGER,

    CONSTRAINT "LogSchedule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LogSchedule" ADD CONSTRAINT "LogSchedule_taskDayId_fkey" FOREIGN KEY ("taskDayId") REFERENCES "TaskDay"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LogSchedule" ADD CONSTRAINT "LogSchedule_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;
