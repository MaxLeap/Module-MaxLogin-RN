'use strict';

export function addPrefix(arr = [],prefix = "") {
  //添加前缀
  let mirrored = {};

  arr.forEach(val => {
    mirrored[val] = prefix + val;
  });

  return mirrored;
}

export function keyMirror(arr) {
  return addPrefix(arr, "");
}
