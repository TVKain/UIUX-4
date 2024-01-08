export default function getDateDifference(date: string) {
  const now = new Date();
  const createdAt = new Date(date);
  const diff = now.getTime() - createdAt.getTime();
  const diffInDays = Math.floor(diff / (1000 * 3600 * 24));
  const diffInHours = Math.floor(diff / (1000 * 3600));
  const diffInMinutes = Math.floor(diff / (1000 * 60));
  const diffInSeconds = Math.floor(diff / 1000);

  if (diffInDays > 0) {
    return `${diffInDays} ngày`;
  } else if (diffInHours > 0) {
    return `${diffInHours} giờ`;
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes} phút`;
  } else {
    return `${diffInSeconds} giây`;
  }
}
