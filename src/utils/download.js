export const downloadFile = (fileURL) => {
  // return fetch(`https://cors-anywhere.herokuapp.com/${fileURL}`, {
  return fetch(`${fileURL}`, {
    method: 'GET',
  }).then((response) => response.blob());
};


