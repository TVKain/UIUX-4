import TemporaryAbscene from "../../models/temporary/TemporaryAbscene.js";
import UserInfo from "../../models/user/UserInfo.js";

const TemporaryAbscenceService = {
  async getAll() {
    return await TemporaryAbscene.findAll({
      include: [UserInfo],
    });
  },

  async createTemporaryAbscence(temporaryAbscence) {
    console.log(temporaryAbscence);
    return TemporaryAbscene.create(temporaryAbscence);
  },
};

export default TemporaryAbscenceService;
