import Notification from "../../../models/notification/Notification.js";

export default async function seedNotification() {
  const notifications = [
    {
      title: "Thông báo quan trọng",
      content: "Đề nghị cư dân thực hiện giữ gìn vệ sinh chung cư.",
      UserId: 1,
    },
    {
      title: "Cuộc họp cộng đồng",
      content:
        "Thời gian: 20:00 ngày 15/02/2024. Đề nghị mọi người tham gia đông đủ.",
      UserId: 2,
    },
    {
      title: "Cảnh báo an ninh",
      content:
        "Cảnh báo về việc có người lạ xâm nhập vào khu vực chung cư, hãy chú ý đề phòng và báo cáo ngay khi phát hiện.",
      UserId: 4,
    },
    {
      title: "Thông báo phòng cháy chữa cháy",
      content:
        "Lịch kiểm tra hệ thống PCCC sẽ diễn ra vào ngày 25/02/2024. Mong cư dân hợp tác.",
      UserId: 1,
    },
    {
      title: "Sửa chữa thang máy",
      content:
        "Thang máy tầng 3 sẽ được sửa chữa từ 10:00 - 16:00 ngày mai. Mong cư dân thông cảm.",
      UserId: 2,
    },
    {
      title: "Tuyển dụng nhân viên vệ sinh",
      content:
        "Chúng tôi cần tuyển dụng thêm nhân viên vệ sinh cho khu vực chung cư. Liên hệ với quản lý để biết thêm chi tiết.",
      UserId: 3,
    },
    {
      title: "Chương trình thiện nguyện",
      content:
        "Cùng tham gia chương trình thiện nguyện vào cuối tuần này. Thời gian: 8:00 - 12:00, ngày 17/02/2024.",
      UserId: 4,
    },
    {
      title: "Thông báo về việc cắt điện",
      content:
        "Ngày mai từ 14:00 - 17:00, khu vực chung cư sẽ có công tác cắt điện để tiến hành bảo trì. Hãy chuẩn bị sẵn sàng.",
      UserId: 1,
    },
    {
      title: "Cuộc thi nấu ăn cộng đồng",
      content:
        "Thời gian đăng ký tham gia cuộc thi nấu ăn sẽ kết thúc vào ngày 20/02/2024. Hãy đăng ký ngay!",
      UserId: 2,
    },
    {
      title: "Thông báo về việc lắp đặt camera an ninh mới",
      content:
        "Chúng tôi đang tiến hành lắp đặt camera an ninh mới để nâng cao độ an toàn cho cả cộng đồng. Xin cảm ơn sự hợp tác.",
      UserId: 3,
    },
    {
      title: "Thông báo về việc làm đẹp môi trường",
      content:
        "Chúng ta sẽ tổ chức buổi làm đẹp môi trường vào cuối tuần này. Hãy tham gia để chung tay bảo vệ môi trường xanh sạch.",
      UserId: 4,
    },
    {
      title: "Cuộc thi vẽ tranh cho trẻ em",
      content:
        "Đến hạn nộp tranh cho cuộc thi vẽ tranh cho trẻ em là ngày 25/02/2024. Hãy khuyến khích con em tham gia!",
      UserId: 1,
    },
    {
      title: "Lịch trình bảo dưỡng hệ thống điều hòa",
      content:
        "Trong tuần này, chúng tôi sẽ tiến hành bảo dưỡng hệ thống điều hòa. Xin thông báo để mọi người có thể sắp xếp lịch trình cá nhân.",
      UserId: 2,
    },
    {
      title: "Thiết bị phòng cháy chữa cháy mới",
      content:
        "Chúng tôi vừa nhận được thiết bị phòng cháy chữa cháy mới. Đề nghị mọi người kiểm tra và báo cáo ngay nếu có vấn đề.",
      UserId: 3,
    },
    {
      title: "Thông báo về việc sửa chữa cổng chính",
      content:
        "Cổng chính sẽ được sửa chữa vào ngày 22/02/2024. Hãy sắp xếp thời gian đi ra vào trong ngày đó.",
      UserId: 4,
    },
    {
      title: "Thay đổi quy tắc sử dụng phòng gym",
      content:
        "Kể từ ngày 01/03/2024, quy tắc sử dụng phòng gym sẽ có một số thay đổi. Vui lòng đọc kỹ và tuân thủ.",
      UserId: 1,
    },
    {
      title: "Cảnh báo về việc để quên chìa khóa",
      content:
        "Lưu ý không để quên chìa khóa cửa khi ra vào chung cư để tránh tình trạng mất an ninh.",
      UserId: 2,
    },
    {
      title: "Thay đổi lịch làm việc của quản lý",
      content:
        "Quản lý sẽ nghỉ làm vào ngày 18/02/2024. Đề nghị mọi người liên hệ trực tiếp với bảo vệ nếu cần hỗ trợ trong thời gian này.",
      UserId: 3,
    },
    {
      title: "Cuộc họp bất thường",
      content:
        "Cuộc họp bất thường sẽ được tổ chức vào 19:00 ngày 21/02/2024 để thảo luận về các vấn đề quan trọng. Mọi người đều được mời tham gia.",
      UserId: 4,
    },
  ];

  for (const notification of notifications) {
    await Notification.create(notification);
  }
}
