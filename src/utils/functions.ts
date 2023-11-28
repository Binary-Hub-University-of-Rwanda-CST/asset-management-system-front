export const errorToText = (error: any): string => {
  console.error({ ...error });
  console.log("Error handled: ", error.response);
  // if (navigator.onLine === false) {
  //   return "Network error! You are not connected to the internet, Please check your network adapter!";
  // }
  if (error.response?.data?.message) {
    return error.response?.data?.message;
  }
  if (error.response === undefined) {
    return "Failed to connect to the server! Please try again";
  }
  let error_res = JSON.parse(error?.request?.response);
  if (error_res.errors.length >= 1) {
    if (error_res.errors[0].message.message) {
      return error_res.errors[0].message.message;
    }
    return error_res.errors[0].message;
  } else {
    return "Something went wrong, please try again later";
  }
};

export const search = (objList: any, text: string, keys: any = null) => {
  if (undefined === text || text === "") return objList;
  return objList.filter((product: any) => {
    let flag;
    let dataKeys = keys === null ? product : keys;
    for (let prop in dataKeys) {
      flag = false;
      if (product[prop] === null || product[prop] === undefined) continue;
      flag =
        product[prop].toString().toLowerCase().indexOf(text.toLowerCase()) > -1;
      if (flag) break;
    }
    return flag;
  });
};

export const DATE = (
  data: string,
  format: "DD/MM/YYYY" | "YYYY/MM/DD" | "MM/DD/YYYY" = "DD/MM/YYYY"
): string => {
  const date = new Date(data);
  if (format === "YYYY/MM/DD") {
    return (
      date.getFullYear() +
      "-" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      (date.getDate() < 10 ? "0" : "") +
      date.getDate()
    );
  } else if (format === "MM/DD/YYYY") {
    return (
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "/" +
      (date.getDate() < 10 ? "0" : "") +
      date.getDate() +
      "/" +
      date.getFullYear()
    );
  } else {
    return (
      (date.getDate() < 10 ? "0" : "") +
      date.getDate() +
      "/" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "/" +
      date.getFullYear()
    );
  }
};

export const DATE_DATA = (
  data: string,
  format: "DD-MM-YYYY" | "YYYY-MM-DD" | "MM-DD-YYYY" = "DD-MM-YYYY"
): string => {
  const date = new Date(data);
  let tempDateFormat = `${date.getDate() < 10 ? "0" : ""}${date.getDate()}`;
  if (format === "YYYY-MM-DD") {
    return (
      date.getFullYear() +
      "-" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      tempDateFormat
    );
  } else if (format === "MM-DD-YYYY") {
    return (
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      tempDateFormat +
      "-" +
      date.getFullYear()
    );
  } else {
    return (
      tempDateFormat +
      "-" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      date.getFullYear()
    );
  }
};

export const DATE_DATA_NEW_DATE = (
  data: Date,
  format: "DD-MM-YYYY" | "YYYY-MM-DD" | "MM-DD-YYYY" = "DD-MM-YYYY"
): string => {
  const date = data;
  let tempDateFormat = `${date.getDate() < 10 ? "0" : ""}${date.getDate()}`;
  if (format === "YYYY-MM-DD") {
    return (
      date.getFullYear() +
      "-" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      tempDateFormat
    );
  } else if (format === "MM-DD-YYYY") {
    return (
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      tempDateFormat +
      "-" +
      date.getFullYear()
    );
  } else {
    return (
      tempDateFormat +
      "-" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      date.getFullYear()
    );
  }
};

export const checkIfImageExists = (url: string, callback: Function) => {
  const img = new Image();

  img.src = url;

  if (img.complete) {
    callback(true);
  } else {
    img.onload = () => {
      callback(true);
    };
    img.onerror = () => {
      callback(false);
    };
  }
};

export const calculate_age = (dob: string) => {
  const date = new Date(dob);
  var diff_ms = Date.now() - date.getTime();
  var age_dt = new Date(diff_ms);

  return Math.abs(age_dt.getUTCFullYear() - 1970);
};

// export const Shuffle = (array: any[]) => {
//   let currentIndex: number = array.length,  randomIndex: number;
//   while (currentIndex !== 0) {
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex--;
//     [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
//   }
//   return array;
// }

// export const Shuffle = (array: any[]) => {
//   let ranNums = array.sort(() => Math.random() - array.length/100)
//   return ranNums;
// }

export const randomIntFromInterval = (min: number, max: number) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const Shuffle = (arr: any[]) => {
  let temp = arr;
  let res: any[] = [];
  for (let i = temp.length - 1; i >= 0; i--) {
    let j = randomIntFromInterval(0, i);
    res = [...res, temp[j]];
    let testing = temp;
    let newTemp = temp.filter((itm) => testing.indexOf(itm) !== j);
    temp = newTemp;
  }
  return res;
};

export const zoomInOut = (imageId: string, zoomType: "IN" | "OUT" = "IN") => {
  let thisImage = document.getElementById(imageId);
  if (!thisImage) return alert(`Element with ID of ${imageId} not found!`);
  let currWidth: number = thisImage.clientWidth;
  if (zoomType === "IN") {
    if (currWidth === 500) alert("Maximum Zoom in level reached");
    thisImage.style.width = currWidth + 40 + "px";
  }
  if (zoomType === "OUT") {
    if (currWidth === 40) alert("Maximum Zoom out level reached");
    thisImage.style.width = currWidth - 40 + "px";
  }
};

export const fullScreen = (
  imageId: string,
  action: "OPEN" | "CLOSE" = "OPEN"
) => {
  let thisImage = document.getElementById(imageId) as HTMLElement & {
    mozRequestFullScreen(): Promise<void>;
    webkitRequestFullscreen(): Promise<void>;
    msRequestFullscreen(): Promise<void>;
  };
  if (!thisImage) return alert(`Element with ID of ${imageId} not found!`);
  if (thisImage.requestFullscreen) {
    thisImage.requestFullscreen();
  } else if (thisImage.webkitRequestFullscreen) {
    thisImage.webkitRequestFullscreen();
  } else if (thisImage.mozRequestFullScreen) {
    thisImage.mozRequestFullScreen();
  }
};

const sortCompare = (property: string, sortOrder: 1 | -1) => {
  return function (a: any, b: any) {
    let result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
};

export const sortThisArray = (
  TYPE: boolean,
  data: any[],
  property: string,
  sortOrder: "ASC" | "DESC" = "ASC"
): any[] => {
  if (TYPE && property.length > 0) {
    let _sortOrder: 1 | -1 = sortOrder === "ASC" ? 1 : -1;
    return data.sort(sortCompare(property, _sortOrder));
  }
  return data;
};

export const timestampToDate = (
  thisTimestamp: string | number | Date
): { fullDATE: string; date: string; timeFR: string; timeAMPM: string } => {
  let date = new Date(thisTimestamp);
  let hours: number = date.getHours();
  let minutes = "0" + date.getMinutes();

  let ampm: "pm" | "am" = hours >= 12 ? "pm" : "am";
  let _hours: number = hours % 12;
  _hours = _hours ? _hours : 12; // the hour '0' should be '12'

  // Will display time in 10:30:23 format
  return {
    fullDATE: date.toString(),
    date: DATE(date.toString()),
    timeFR: hours + ":" + minutes.substr(-2),
    timeAMPM: _hours + ":" + minutes.substr(-2) + " " + ampm,
  };
};

export const isFileImage = (file: string): boolean => {
  const imageExtensions: string[] = [
    "jpg",
    "jpeg",
    "png",
    "webp",
    "tiff",
    "bmp",
    "gif",
    "jfif",
    "tif",
  ];
  return imageExtensions.includes(file.toLowerCase());
};

export const getFileType = (fileName: string): string => {
  return fileName.substr(fileName.lastIndexOf(".") + 1);
};

export const showDate = (thisDate: string): string => {
  let result: string = "";
  const today = new Date(),
    currentDate = new Date(thisDate);
  if (
    currentDate.getDate() === today.getDate() &&
    currentDate.getMonth() === today.getMonth() &&
    currentDate.getFullYear() === today.getFullYear()
  ) {
    result = "Today";
  } else if (
    currentDate.getDate() === today.getDate() - 1 &&
    currentDate.getMonth() === today.getMonth() &&
    currentDate.getFullYear() === today.getFullYear()
  ) {
    result = "Yesterday";
  } else {
    result = DATE(thisDate);
  }
  return result;
};

export const isToday = (someDate: string) => {
  const today = new Date();
  const someDateFormated = new Date(someDate);
  return (
    someDateFormated.getDate() === today.getDate() &&
    someDateFormated.getMonth() === today.getMonth() &&
    someDateFormated.getFullYear() === today.getFullYear()
  );
};

export const validateTwoTime = (start_time: string, end_time: string) => {
  let res: boolean = false;
  let startTime: string[] = start_time.split(":");
  let endTime: string[] = end_time.split(":");
  if (startTime.length === 2 && endTime.length === 2) {
    if (parseInt(startTime[0]) < parseInt(endTime[0])) {
      res = true;
    } else if (parseInt(startTime[0]) === parseInt(endTime[0])) {
      if (parseInt(startTime[1]) < parseInt(endTime[1])) {
        res = true;
      }
    }
  }
  return res;
};

export const getMinutesFromTwoDates = (
  startDateTime: Date,
  endDateTime: Date
) => {
  var diff = (endDateTime.getTime() - startDateTime.getTime()) / 1000;
  diff /= 60;
  return endDateTime.getTime() < startDateTime.getTime()
    ? -Math.abs(Math.round(diff))
    : Math.abs(Math.round(diff));
};

// Remove tags in the text
export const removeTags = (str: string): string => {
  if (str === null || str === "") {
    return str;
  } else {
    str = str.toString();
    let newString: string = str.replace(/(<([^>]+)>)/gi, "");
    return newString;
  }
};

export function shortString(text: string, length: number = 20) {
  if (text.length > length) {
    return text.substring(0, length - 2) + "...";
  } else {
    return text;
  }
}

export const FC_IsJson = (str: string): boolean => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const displayNumbers = (value: number): string => {
  if (value < 1000) return value + "";

  if (value < 1000000) return value / 1000 + "K";
  if (value >= 1000000) return value / 1000000 + "M";

  return "";
};

export const FC_GetBase64Img = (default_value: string): string => {
  return `data:image/png;base64,${default_value}`;
};

// export const FC_EncodeFile = (file_name: string) => {
//   const path = "file:///test/@#$%/0.png";
//   const encodedPath = file_name
//     .replace("@", "")
//     .split("/")
//     .map((p) => encodeURIComponent(p))
//     .join("/");
//   console.log(encodedPath);
//   // Output: file:///test/%40%23%24%25/0.png
// };

export const commaFy = (num: number) => {
  var str = num.toString().split(".");
  if (str[0].length >= 4) {
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
  }
  if (str[1] && str[1].length >= 4) {
    str[1] = str[1].replace(/(\d{3})/g, "$1 ");
  }
  return str.join(".");
};

export const GetDaysFromTwoDates = (
  first_date: string,
  second_date: string
): number => {
  //mm/dd/yyyy
  var date1 = new Date(first_date);
  var date2 = new Date(second_date);

  // To calculate the time difference of two dates
  var Difference_In_Time = date2.getTime() - date1.getTime();

  // To calculate the no. of days between two dates
  var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  return Math.round(Difference_In_Days);
};

export function getDateFromToday(days: number) {
  const now = new Date();

  return new Date(now.getFullYear(), now.getMonth(), now.getDate() - days);
}

export const calculateTimingFromDays = (d: number): string => {
  if (d <= 0) {
    return "Invalid dates";
  }
  let months = 0,
    years = 0,
    days = 0,
    weeks = 0;
  while (d > 0) {
    if (d >= 365) {
      years++;
      d -= 365;
    } else if (d >= 30) {
      months++;
      d -= 30;
    } else if (d >= 7) {
      weeks++;
      d -= 7;
    } else {
      days++;
      d--;
    }
  }
  var response = "";
  if (years > 0) {
    response = `${years} year${years > 1 ? "s" : ""} `;
  }
  if (months > 0) {
    response = response + `${months} month${months > 1 ? "s" : ""} `;
  }
  if (weeks > 0) {
    response = response + `${weeks} week${weeks > 1 ? "s" : ""} `;
  }
  if (days > 0) {
    response = response + `${days} day${days > 1 ? "s" : ""} `;
  }
  return response;
};

export const GetArrayTotals = (numbers: number[]): number => {
  var total = 0;
  for (const itm of numbers) {
    total += itm;
  }
  return total;
};

export enum FileTypes {
  PDF = "application/pdf",
  JPEG = "image/jpeg",
  GIF = "image/gif",
  PNG = "image/png",
  SVG = "image/svg+xml",
  PPT = "application/vnd.ms-powerpoint",
  PPTX = "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  TIFF = "image/tiff",
  IMAGES = "image/*",
  EXCEL = ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
}

export enum LanguageEnum {
  ENG = "ENG",
  FR = "FR",
  KINY = "KINY",
}

export const LanguagesList: { title: string; value: LanguageEnum }[] = [
  {
    title: "English",
    value: LanguageEnum.ENG,
  },
  {
    title: "French",
    value: LanguageEnum.FR,
  },
  {
    title: "Kinyarwanda",
    value: LanguageEnum.KINY,
  },
];

export const languageValue = (
  data: { kiny: string; eng: string; fr: string },
  selectedLanguage: LanguageEnum
): string => {
  if (selectedLanguage === LanguageEnum.ENG) {
    return data.eng;
  }
  if (selectedLanguage === LanguageEnum.FR) {
    return data.fr;
  }
  return data.kiny;
};
