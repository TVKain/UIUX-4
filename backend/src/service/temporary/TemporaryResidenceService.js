import TemporaryResidence from "../../models/temporary/TemporaryResidence.js";
import UserInfo from "../../models/user/UserInfo.js";

const TemporaryResidenceService = {
  async getAll() {
    return await TemporaryResidence.findAll({
      include: [UserInfo],
    });
  },

  async createTemporaryResidence(temporaryResidence) {
    console.log(temporaryResidence);
    return TemporaryResidence.create(temporaryResidence);
  },
};

export default TemporaryResidenceService;
