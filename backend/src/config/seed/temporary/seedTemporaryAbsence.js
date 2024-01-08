import TemporaryAbscenceService from "../../../service/temporary/TemporaryAbsenceService.js";

export default async function seedTemporaryAbscence() {
  const temporaryAbscences = [
    {
      UserInfoId: 1,
      startDate: new Date("2021-01-01"),
      endDate: new Date("2021-01-11"),
      permanentAddress: "Hanoi 1",
      currentAddress: "Hanoi 2",
      destinationAddress: "Hanoi 3",
      reason: "Study",
    },
  ];

  for (const temporaryAbscence of temporaryAbscences) {
    await TemporaryAbscenceService.createTemporaryAbscence(temporaryAbscence);
  }
}
