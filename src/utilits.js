const getCurrentTime = () => {
  const date = new Date();
  const dateNow = Date.now();
  const timeToString = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  return { dateNow, timeToString };
};


export default getCurrentTime;
