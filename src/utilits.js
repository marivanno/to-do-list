const getCurrentTime = () => {
  const date = new Date();
  return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
};

const something = () => console.log('bober');

export { getCurrentTime, something };
