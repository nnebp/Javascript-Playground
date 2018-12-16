/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    //make sure we are less than are target number
    //first number then keep iterating
    const first = nums[i];
    //make sure we dont overshoot?
    for (let j = i + 1; j < nums.length; j++){
      let second = nums[j];
      if (first + second === target) {
        return [i, j];
      }

    }
  }
};