import { UserService } from "../../service/UserService.js";

export default async function seedUser() {
  const users = [
    {
      username: "staff.it@gmail.com",
      password: "1",
      roles: [
        { name: "staff", primary: true },
        { name: "resident", primary: false },
        { name: "manager", primary: false },
      ],
      info: {
        firstName: "Khánh",
        lastName: "Trần",
        email: "staff.it@gmail.com",
        gender: "Nam",
        phone: "0123456789",
        city: "Hồ Chí Minh",
        district: "Quận 1",
        subdistrict: "Phường 1",
        address: "Số 123, Ngõ 45, Ngách 67, Phường 1, Quận 1, Hồ Chí Minh",
        birthday: "1999-01-01",
        joinDate: "2021-01-01",
      },
    },
    {
      username: "lamnt@gmail.com",
      password: "1",
      roles: [
        { name: "resident", primary: true },
        { name: "police", primary: false },
      ],
      info: {
        firstName: "Lam",
        lastName: "Ngô",
        email: "lamnt@gmail.com",
        gender: "Nữ",
        phone: "0889389268",
        city: "Hà Nội",
        district: "Quận 1",
        subdistrict: "Phường 1",
        address: "Số 123, Ngõ 45, Ngách 67, Phường 1, Quận 1, Hà Nội",
        birthday: "2000-01-01",
        joinDate: "2021-01-01",
      },
    },
    {
      username: "phuoc@gmail.com",
      password: "1",
      roles: [
        { name: "manager", primary: true },
        { name: "resident", primary: false },
      ],
      info: {
        firstName: "Phước",
        lastName: "Nguyễn",
        email: "phuoc@gmail.com",
        phone: "0123456789",
        gender: "Nam",
        city: "Đà Nẵng",
        district: "Quận 1",
        subdistrict: "Phường 1",
        address: "Số 123, Ngõ 45, Ngách 67, Phường 1, Quận 1, Đà Nẵng",
        birthday: "1999-01-01",
        joinDate: "2021-01-01",
      },
    },
    {
      username: "staff1",
      password: "1",
      roles: [{ name: "staff", primary: true }],
    },
  ];

  for (const user of users) {
    await UserService.createUser(user);
  }
}
