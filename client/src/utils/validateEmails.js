const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default emailAddress => {
  const invalidEmails = emailAddress
    .split(",")
    .map(emailAddress => emailAddress.trim())
    .filter(email => re.test(email)===false)

    if(invalidEmails.length){
      return `These are invalid emails : ${invalidEmails}`;
    }
    return;
};
