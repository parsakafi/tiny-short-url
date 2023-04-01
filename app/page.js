'use client';
import Image from 'next/image'
import { useReducer } from "react";
import { Inter } from 'next/font/google'
import styles from './page.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { longURL: '', isLoading: false, message: '', displayShortlink: false, shortlink: '' }
  )

  // Handles the submit event on form submit.
  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()

    if (state.isLoading)
      return;

    setState({ isLoading: true, message: '', displayShortlink: false, shortlink: '' });

    // Get data from the form.
    const data = {
      url: event.target.url.value
    }

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data)

    // API endpoint where we send form data.
    const endpoint = '/api/short'

    // Form the request for sending data to the server.
    const options = {
      cache: "no-cache",
      // The method is POST because we are sending data.
      method: 'POST',
      // Tell the server we're sending JSON.
      headers: {
        'Content-Type': 'application/json',
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    }

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options)

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json()

    const shortlinkCreated = result.message === 'Added!';
    setState({ longURL: '', isLoading: false, message: shortlinkCreated ? '' : result.message, displayShortlink: shortlinkCreated, shortlink: shortlinkCreated ? `1pt.co/${result.short}` : '' });
  }

  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <h1 className={inter.className + ' ' + styles.title}>Tiny Short URL</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input type="url" name='url' id="long-url" onChange={(e) => { setState({ longURL: e.target.value }) }} value={state.longURL} placeholder='Paste long URL here' className={inter.className} required disabled={state.isLoading} />
          <button type="submit" id="create-shortlink" className={inter.className}>{state.isLoading ? <div className={styles.loader}><span></span></div> : 'Go'}</button>
        </form>

        <div className={inter.className + ' ' + styles.message}>{state.message}</div>
        <div className={inter.className + ' ' + styles['shortlink-wrap']} hidden={!state.displayShortlink}>
          <div className={styles['shortlink-field']}>
            <input type="text" id="shortlink" value={state.shortlink} onClick={(e) => { e.target.setSelectionRange(0, e.target.value.length) }} readOnly />
            <button id="copy-shortlink" onClick={() => copyToClipboard(document.getElementById('shortlink').value)} aria-describedby="tooltip">Copy</button>
            <div id="tooltip" className={styles.tooltip} role="tooltip">Copied!</div>
          </div>
          <Image
            src={state.displayShortlink ? `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${state.shortlink}` : ''}
            alt="QR Code"
            className={styles.qrcode}
            width={150}
            height={150}
            priority
          />
        </div>
      </div>

      <div className={styles.grid}>
        <a
          href="https://nextjs.org"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            Next.js <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
            Use Next.js 13
          </p>
        </a>

        <a
          href="https://parsa.ws"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            Parsa <span>-&gt;</span>
          </h2>
          <p className={inter.className}>Developer</p>
        </a>

        <a
          href="https://1pt.co"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            1 Point <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
            Create short URL with 1pt.co
          </p>
        </a>
      </div>
    </main>
  )
}
