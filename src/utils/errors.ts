/**
 * @description return the first error in the array as a text
 * @param error
 * @returns
 */
// export const errorToText = (error: any): string => {
//   console.log({ ...error });
//   if (JSON.parse(error?.request?.response)) {
//     let error_res = JSON.parse(error?.request?.response);
//     if (error_res.errors.length >= 1) {
//       if (error_res.errors[0].msg) {
//         return error_res.errors[0].msg;
//       } else {
//         return error_res.errors[0].message;
//       }
//     } else {
//       return "Something went wrong, please try again later";
//     }
//   } else {
//     return "Something went wrong, please try again later";
//   }
// };

interface ErrorToArrayInterface {
  message: string;
}

/**
 * @description return the error in a json error (used for multiple errors format)
 * @param error
 * @returns
 */
export const errorToArray = (error: any): ErrorToArrayInterface[] => {
  console.error({ ...error });
  let error_res = JSON.parse(error?.request?.response);
  if (error_res.errors.length >= 1) {
    return error_res.errors;
  } else {
    return [{ message: "Something went wrong, please try again later" }];
  }
};
