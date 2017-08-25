export function saveToLocal(id, key, val) {
  let seller = window.localStorage.__seller__; // 字符串
  if (!seller) {
    seller = {};
    seller[id] = {};
  } else {
    seller = JSON.parse(window.localStorage.__seller__);
    if (!seller[id]) {
      seller[id] = {};
    }
  }
  seller[id][key] = val;
  window.localStorage.__seller__ = JSON.stringify(seller);
};

export function loadFromLocal (id, key, def) {
  let seller = window.localStorage.__seller__;
  if (!seller) {
    return def;
  }
  seller = JSON.parse(seller)[id];
  if (!seller) {
    return def;
  }
  let ret = seller[key];
  return ret || def;
}
