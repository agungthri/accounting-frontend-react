const manageNewAccount = (list, select, accountName, postData) => {
    const { c1, c2, c3, c4, c5, c6 } = select;
    const newSelect = { c1, c2, c3, c4, c5, c6 };
    const filtered = Object.entries(newSelect).filter(([key, value]) => value !== 0);
    const result = Object.fromEntries(filtered);
    const index = Object.values(result).length;
  
    const penampung = list.filter((item) =>
      Object.entries(result).every(([key, value]) => item[key] === value)
    );
  
    const getMax = penampung.map((item) => item[`c${index + 1}`]);
    const max = Math.max(...getMax);
    const nextC = `c${index + 1}`;
    const updatedSelect = {
      ...select,
      [nextC]: max + 1,
      account: `${select.account} > ${accountName}`,
    };
    postData(updatedSelect);
  };
  
  export default manageNewAccount;
  