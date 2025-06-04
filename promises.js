function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let success = false;
      if (success) {
        resolve("Data fetched Successfully");
      } else {
        reject("Error while fetching data");
      }
    }, 1000);
  });
}

fetchData()
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
