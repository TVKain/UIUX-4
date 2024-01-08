import { GetUserInfoResponse } from '../../../../api/user-info/getUserInfos';

interface ChartYear {
  year: number;
  leaveValue: number;
  joinValue: number;
  total: number;
}

function parseUserInfoToChartYear(userInfos: GetUserInfoResponse): ChartYear[] {
  const ret: ChartYear[] = [];

  for (let userInfo of userInfos) {
    let joinDate = userInfo.joinDate;
    let leaveDate = userInfo.leaveDate;

    let joinDateYear = new Date(joinDate).getFullYear();
    let leaveDateYear = new Date(leaveDate).getFullYear();

    let findItem = ret.find((item) => item.year === joinDateYear);

    if (findItem) {
      findItem.joinValue++;
    } else {
      ret.push({
        year: joinDateYear,
        joinValue: 1,
        leaveValue: 0,
        total: 0,
      });
    }

    if (leaveDate === null) {
      continue;
    }

    findItem = ret.find((item) => item.year === leaveDateYear);

    if (findItem) {
      findItem.leaveValue++;
    } else {
      ret.push({
        year: leaveDateYear,
        joinValue: 0,
        leaveValue: 1,
        total: 0,
      });
    }
  }

  ret.sort((a, b) => {
    return a.year - b.year;
  });

  // Calculate total
  let total = 0;
  for (let item of ret) {
    total += item.joinValue;
    total -= item.leaveValue;
    item.total = total;
  }

  return ret;
}

interface ChartMonthElement {
  month: number;
  leaveValue: number;
  joinValue: number;
  total: number;
}

interface ChartMonth {
  year: number;
  months: ChartMonthElement[];
}

function parseUserInfoToChartMonth(userInfos: GetUserInfoResponse): ChartMonth[] {
  const ret: ChartMonth[] = [];

  for (let userInfo of userInfos) {
    let joinDate = userInfo.joinDate;
    let leaveDate = userInfo.leaveDate;

    let joinDateYear = new Date(joinDate).getFullYear();
    let leaveDateYear = new Date(leaveDate).getFullYear();

    let joinDateMonth = new Date(joinDate).getMonth();
    let leaveDateMonth = new Date(leaveDate).getMonth();

    let findItem = ret.find((item) => item.year === joinDateYear);

    if (findItem) {
      let findMonth = findItem.months.find((item) => item.month === joinDateMonth);

      if (findMonth) {
        findMonth.joinValue++;
      } else {
        findItem.months.push({
          month: joinDateMonth,
          joinValue: 1,
          leaveValue: 0,
          total: 0,
        });
      }
    } else {
      ret.push({
        year: joinDateYear,
        months: [
          {
            month: joinDateMonth,
            joinValue: 1,
            leaveValue: 0,
            total: 0,
          },
        ],
      });
    }

    if (leaveDate === null) {
      continue;
    }

    findItem = ret.find((item) => item.year === leaveDateYear);

    if (findItem) {
      let findMonth = findItem.months.find((item) => item.month === leaveDateMonth);

      if (findMonth) {
        findMonth.leaveValue++;
      } else {
        findItem.months.push({
          month: leaveDateMonth,
          joinValue: 0,
          leaveValue: 1,
          total: 0,
        });
      }
    } else {
      ret.push({
        year: leaveDateYear,
        months: [
          {
            month: leaveDateMonth,
            joinValue: 0,
            leaveValue: 1,
            total: 0,
          },
        ],
      });
    }
  }

  ret.sort((a, b) => {
    return a.year - b.year;
  });

  // Padd month
  for (let item of ret) {
    for (let i = 0; i < 12; i++) {
      let findMonth = item.months.find((month) => month.month === i);

      if (!findMonth) {
        item.months.push({
          month: i,
          joinValue: 0,
          leaveValue: 0,
          total: 0,
        });
      }
    }
  }

  // Sort month
  for (let item of ret) {
    item.months.sort((a, b) => {
      return a.month - b.month;
    });
  }

  // Calculate total needs to be done after sort
  // Calculate total needs to account for previous month
  let previousTotal = 0;
  for (let item of ret) {
    for (let month of item.months) {
      month.total = previousTotal + month.joinValue - month.leaveValue;
      previousTotal = month.total;
    }
  }

  return ret;
}

export { parseUserInfoToChartYear, parseUserInfoToChartMonth };
export type { ChartYear, ChartMonth, ChartMonthElement };
