import { ChangeEventHandler, MouseEventHandler, useState } from 'react'

import { signJWS } from './lib/sign'

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [privateKey, setPrivateKey] = useState('')
  const [header, setHeader] = useState('')
  const [payload, setPayload] = useState('')

  const [signature, setSignature] = useState('')

  const sign = async () => {
    const jws = signJWS(privateKey, header, payload)
    console.log(jws)
    setSignature(jws)
  }

  const onChangePrivateKey: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setPrivateKey(e.target.value)
  }

  const onChangeHeader: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setHeader(e.target.value)
  }

  const onChangePayload: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setPayload(e.target.value)
  }

  const onClickSignButton: MouseEventHandler<HTMLButtonElement> = (_e) => {
    void sign()
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>JWS Signing</h1>

      <h3>Private Key</h3>
      <textarea rows={30} cols={100} value={privateKey} onChange={onChangePrivateKey} />

      <h3>Header</h3>
      <textarea rows={10} cols={100} value={header} onChange={onChangeHeader} />

      <h3>Payload</h3>
      <textarea rows={20} cols={100} value={payload} onChange={onChangePayload} />

      <div style={{ width: 200 }}>
        <button onClick={onClickSignButton}>
          Sign
        </button>
      </div>

      <h3>Signature</h3>
      <textarea rows={20} cols={100} value={signature} disabled />
    </>
  )
}

export default App
