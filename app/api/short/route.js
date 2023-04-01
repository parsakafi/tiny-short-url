import { NextResponse } from 'next/server';

export async function POST(request) {
  const req = await request.json();
  const response = await postData(req.url)
  return NextResponse.json(response);
}

async function postData(longURL) {
  var formdata = new FormData();

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };

  return await fetch("https://csclub.uwaterloo.ca/~phthakka/1pt-express/addURL?long=" + longURL, requestOptions)
    .then(response => response.json())
    //.then(result => console.log(result))
    .catch(error => console.log('error', error));
}
