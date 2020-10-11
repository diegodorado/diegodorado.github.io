export default function obj_diff(a,b){
  return Object.keys(b).reduce((diff, key) => {
    if (a[key] === b[key]) return diff
    return {
      ...diff,
      [key]: b[key]
    }
  }, {})
}
