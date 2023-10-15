
const getData = async () => {
  const response = await fetch('https://bgaa.by/test');

  if(response.ok){
    return await response.json();
  } else {
    console.error(response.status)
  }
}

const setDataServer = async (dataToServer: unknown) => {
  const response = await fetch('https://bgaa.by/test_result', {
    method: "POST",
    headers: {
      Authorization: `Bearer token которого нет!!!`,
      accept:"application/json",
    },
    body: JSON.stringify(dataToServer)
  });

  if(response.ok){
    console.log(response.json())
  } else {
    console.error(response.status)
  }
}

export { getData, setDataServer}