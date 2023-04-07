const accountSelectFormat = (accountList) => {
  return accountList?.map(i => ({
    value: i,
    account: i.id,
    label: `${i.c1}-${i.c2}${i.c3}${i.c4}${i.c5}${i.c6} - ${i.account.toUpperCase()}`
  })) || [];
};

export default accountSelectFormat;
