var singleNumber = function(nums) {
  var groupByOccur = nums.reduce((acc, item) => {
    const count = acc[`${item}`] || 0;
    if (acc.hasOwnProperty(`${item}`)) {
      delete acc[`${item}`];
      return { ...acc };
    }
    return { ...acc, [item]: count + 1 };
  }, {});

  return Object.keys(groupByOccur)[0];
};

let arr = [2, 2, 1, 4, 4];
console.log(singleNumber(arr));
