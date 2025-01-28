import { useLocalStorage } from "@uidotdev/usehooks";
import { ChangeEventHandler, MouseEventHandler, useState } from 'react'

import { signJWS } from '../lib/sign'

import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import JwsInput from "./JwsInput";
import JwtInput from "./JwtInput";
import JwsSignHeaderInput from "./JwsSignHeaderInput";

function App() {
  const [privateKey, setPrivateKey] = useLocalStorage('privateKey', '')
  const [kid, setKid] = useLocalStorage('kid', '')
  const [clientId, setClientId] = useLocalStorage('kid', '')

  const [mode, setMode] = useLocalStorage<'jws' | 'jwt' | 'jws_sign_header'>('mode', 'jws')

  // JWS
  const [header, setHeader] = useState('')
  const [payload, setPayload] = useState('')

  const [signature, setSignature] = useState('')

  const sign = async () => {
    const jws = signJWS(privateKey, header, payload)
    setSignature(jws)
  }

  const onChangeKid: ChangeEventHandler<HTMLInputElement> = (e) => {
    setKid(e.target.value)
  }

  const onChangePrivateKey: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setPrivateKey(e.target.value)
  }

  const onChangeMode: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const { value } = e.target
    if (value === 'jws' || value === 'jwt' || value == 'jws_sign_header') {
      setMode(value)
    }
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

      <h2>Key Setup</h2>
      <h3>Key ID:</h3>
      <input style={{ width: 400 }} type="text" value={kid} onChange={onChangeKid} />

      <h3>Private Key</h3>
      <textarea rows={30} cols={100} value={privateKey} onChange={onChangePrivateKey} />

      <h3>Mode</h3>
      <div>
        <select onChange={onChangeMode}>
          <option value="jws">JWS</option>
          <option value="jwt">JWT</option>
          <option value="jws_sign_header">JWS Signature Header</option>
        </select>
      </div>
      {mode === 'jws' && <JwsInput header={header} payload={payload} onChangeHeader={setHeader} onChangePayload={setPayload} />}

      {mode === 'jwt' && <JwtInput kid={kid} clientId={clientId} onChangeHeader={setHeader} onChangePayload={setPayload} />}

      {mode === 'jws_sign_header' && <JwsSignHeaderInput kid={kid} clientId={clientId} payload={payload} onChangeHeader={setHeader} onChangePayload={setPayload} />}

      {/* <h2>Key Setup</h2>
      <h3>Header</h3>
      <textarea rows={10} cols={100} value={header} onChange={onChangeHeader} />

      <h3>Payload</h3>
      <textarea rows={20} cols={100} value={payload} onChange={onChangePayload} /> */}

      <div style={{ width: 200 }}>
        <button onClick={onClickSignButton}>
          Sign
        </button>
      </div>

      <h3>Signature</h3>
      <textarea rows={20} cols={100} value={signature} />
    </>
  )
}

export default App
