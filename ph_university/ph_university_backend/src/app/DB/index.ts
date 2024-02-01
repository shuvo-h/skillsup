import { env } from "../config/config";
import { USER_ROLE, UserStatus } from "../module/user/user.constant";
import { UserModel } from "../module/user/user.model";

const superUser = {
    id: "0001", 
    email: "super_admin@mail.com", 
    password: env.super_admin_password, 
    role: USER_ROLE["super-admin"], 
    status: UserStatus["in-progress"], 
    needsPassword: false,
    isDeleted: false,
  };

  
const seedSuperAdmin = async() =>{
    const isSuperAdminExist = await UserModel.findOne({role:USER_ROLE["super-admin"]});
    if (!isSuperAdminExist) {
        await UserModel.create(superUser);
    }
}

export const superAdminFeatures = {
    seedSuperAdmin,
}