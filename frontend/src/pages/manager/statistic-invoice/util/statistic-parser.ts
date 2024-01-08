import { InvoiceApartmentPayment } from '../../../../api/invoice-apartment-payment/types';

import {
  getInvoiceApartmentPayments,
  GetInvoiceApartmentPaymentsResponse,
} from '../../../../api/invoice-apartment-payment/getInvoiceApartmentPayments';

import { getInvoices } from '../../../../api/invoice/getInvoices';
import { Invoice } from '../../../../api/invoice/types';
import { ConnectingAirportsOutlined } from '@mui/icons-material';

interface InvoiceChartYear {
  year: number;
  total: number;
  invoiceType: [
    {
      name: string;
      total: number;
    },
  ];
}

async function parseInvoiceApartmentPaymentsToChartYear(
  invoiceApartmentPayments: GetInvoiceApartmentPaymentsResponse,
): Promise<InvoiceChartYear[]> {
  const ret: InvoiceChartYear[] = [];

  const invoiceTypes = await getInvoices();

  const invoiceTemplates = invoiceTypes.map((invoiceType) => {
    return {
      type: invoiceType.name,
      total: 0,
    };
  });

  for (let invoiceApartmentPayment of invoiceApartmentPayments) {
    let paidDate = invoiceApartmentPayment.paidDate;

    if (paidDate === null) {
      continue;
    }
    let paidDateYear = new Date(paidDate).getFullYear();

    let findItem = ret.find((item) => item.year === paidDateYear);

    if (findItem) {
      findItem.total += invoiceApartmentPayment.amount;
      let findType = findItem.invoiceType.find(
        (item) => item.name === invoiceApartmentPayment.InvoiceApartment.Invoice.name,
      );

      if (findType) {
        findType.total += invoiceApartmentPayment.amount;
      } else {
        findItem.invoiceType.push({
          name: invoiceApartmentPayment.InvoiceApartment.Invoice.name,
          total: invoiceApartmentPayment.amount,
        });
      }
    } else {
      ret.push({
        year: paidDateYear,
        total: invoiceApartmentPayment.amount,
        invoiceType: [
          {
            name: invoiceApartmentPayment.InvoiceApartment.Invoice.name,
            total: invoiceApartmentPayment.amount,
          },
        ],
      });
    }
  }

  // Pad the invoice type
  for (let item of ret) {
    for (let invoiceType of invoiceTemplates) {
      let findType = item.invoiceType.find((item) => item.name === invoiceType.type);

      if (!findType) {
        item.invoiceType.push({
          name: invoiceType.type,
          total: 0,
        });
      }
    }
  }

  ret.sort((a, b) => {
    return a.year - b.year;
  });

  return ret;
}

interface InvoiceChartMonth {
  year: number;
  months: [
    {
      month: number;
      total: number;
      invoiceType: [
        {
          type: string;
          total: number;
        },
      ];
    },
  ];
}

async function parseInvoiceApartmentPaymentsToChartMonth(
  invoiceApartmentPayments: GetInvoiceApartmentPaymentsResponse,
) {
  const ret: InvoiceChartMonth[] = [];
  const invoiceTypes = await getInvoices();

  console.log(invoiceTypes);

  const invoiceTemplates = invoiceTypes.map((invoiceType) => {
    return {
      type: invoiceType.name,
      total: 0,
    };
  });

  for (let invoiceApartmentPayment of invoiceApartmentPayments) {
    let paidDate = invoiceApartmentPayment.paidDate;

    if (paidDate === null) {
      continue;
    }
    let paidDateYear = new Date(paidDate).getFullYear();
    let paidDateMonth = new Date(paidDate).getMonth();

    let findItem = ret.find((item) => item.year === paidDateYear);

    if (findItem) {
      let findMonth = findItem.months.find((item) => item.month === paidDateMonth);

      if (findMonth) {
        findMonth.total += invoiceApartmentPayment.amount;
        let findType = findMonth.invoiceType.find(
          (item) => item.type === invoiceApartmentPayment.InvoiceApartment.Invoice.name,
        );

        if (findType) {
          findType.total += invoiceApartmentPayment.amount;
        } else {
          findMonth.invoiceType.push({
            type: invoiceApartmentPayment.InvoiceApartment.Invoice.name,
            total: invoiceApartmentPayment.amount,
          });
        }
      } else {
        findItem.months.push({
          month: paidDateMonth,
          total: invoiceApartmentPayment.amount,
          invoiceType: [
            {
              type: invoiceApartmentPayment.InvoiceApartment.Invoice.name,
              total: invoiceApartmentPayment.amount,
            },
          ],
        });
      }
    } else {
      ret.push({
        year: paidDateYear,
        months: [
          {
            month: paidDateMonth,
            total: invoiceApartmentPayment.amount,
            invoiceType: [
              {
                type: invoiceApartmentPayment.InvoiceApartment.Invoice.name,
                total: invoiceApartmentPayment.amount,
              },
            ],
          },
        ],
      });
    }
  }

  // Pad the invoice type
  for (let item of ret) {
    for (let month of item.months) {
      for (let invoiceType of invoiceTemplates) {
        let findType = month.invoiceType.find((item) => item.type === invoiceType.type);

        if (!findType) {
          month.invoiceType.push({
            type: invoiceType.type,
            total: 0,
          });
        }
      }
    }
  }

  ret.sort((a, b) => {
    return a.year - b.year;
  });

  return ret;
}

export type { InvoiceChartYear, InvoiceChartMonth };
export { parseInvoiceApartmentPaymentsToChartYear, parseInvoiceApartmentPaymentsToChartMonth };
