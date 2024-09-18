import { getManagements } from '../service/api';

const labelsArray: any[] = [];
const dataArray: any[] = [];

getManagements().then((response: any) => { 
  response.forEach((item: any) => {
    console.log(item);
    
    labelsArray.push(item.cs_causevalue);
    dataArray.push(item.mng_value);
  });
});

export const data = {
  labels: labelsArray,
  datasets: [
    {
      backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
      data: dataArray,
    },
  ],
};

export const options = {
  responsive: true,
  maintainAspectRatio: false,
};
