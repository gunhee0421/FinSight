// dart API key 입니다. ex) 만약 하루 호출량을 초과한다면 테스트 시 개인 api를 발급 받으세요.
export const key = `e422e68cee69c0a6305d3bb0dbbde913c996f6ed`;
export const OpenKey = `KcLu0WO0pOzrkIGXKtwiYBnVrASNlCNZVg2IP5PaSwcruAMC5nFidKvZ%2BkmbsB5hIYdfN3XrOnYbFoWlt39lRQ%3D%3D`;

// dart api의 경우 header의 불일치로 cors 오류가 발생합니다. 이 부분을 우회하기 위한 proxy url 입니다.
export const proxy = `https://proxy.cors.sh/`;

// 년도를 받는 데이터 입니다.
const today = new Date();

export const day = today.getFullYear()-1;
export const month = today.getMonth();
export const cur = today.getDay();

const pad = (number) => {
  return number.toString().padStart(2, '0');
};

export const sixDay = `${today.getFullYear()}${pad(today.getMonth() + 1)}${pad(today.getDate())}`;
