async function retryUntilValid(method) {
  try {
    return await method.call();
  } catch (error) {
    console.log(error.message);
    return retryUntilValid(method);
    //재귀적으로 호출하여 성공할때 까지 반복
  }
}

export default retryUntilValid;
