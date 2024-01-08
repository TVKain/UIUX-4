import TemporaryResidenceService from "../../../service/temporary/TemporaryResidenceService.js";

export default async function seedTemporaryResidence() {
  const temporaryResidences = [
    {
      UserInfoId: 1,
      startDate: new Date("2021-01-01"),
      permanentAddress: "Hanoi 1",
      currentAddress: "Hanoi 2",
      reason: "Study",
    },
    {
      UserInfoId: 1,
      startDate: new Date("2021-01-01"),
      permanentAddress: "Hanoi 1",
      currentAddress: "Hanoi 2",
      reason: "Study",
    },
  ];

  for (const temporaryResidence of temporaryResidences) {
    await TemporaryResidenceService.createTemporaryResidence(
      temporaryResidence
    );
  }
}
