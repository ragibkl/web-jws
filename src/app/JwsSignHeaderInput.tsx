import { ChangeEventHandler, MouseEventHandler, useEffect, useState } from "react"

type Props = {
  kid: string,
  clientId: string,
  payload: string,
  onChangeHeader: (h: string) => void,
  onChangePayload: (p: string) => void,
}

function epochNow() {
  return Math.floor(new Date().getTime() / 1000)
}

function JwsSignHeaderInput(props: Props) {
  const [iat, setIat] = useState(epochNow())

  const [payload, setPayload] = useState('')

  const header = {
    alg: "PS256",
    typ: "JOSE",
    kid: props.kid,
    "bp.iss": props.clientId,
    "bp.iat": iat,
  }

  const headerJson = JSON.stringify(header)
  const headerPrettyJson = JSON.stringify(header, undefined, 4)

  const generate = () => {
    setIat(epochNow())
  }

  useEffect(() => {
    props.onChangeHeader(headerJson)
    props.onChangePayload(payload)
  }, [headerJson, payload])

  const onClickRefreshButton: MouseEventHandler<HTMLButtonElement> = (_e) => {
    generate()
  }

  const onChangePayload: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setPayload(e.target.value)
  }

  return (
    <>
      <h2>Mode: JWS Sign Header</h2>

      <div style={{ width: 200 }}>
        <button onClick={onClickRefreshButton}>
          Refresh
        </button>
      </div>

      <h3>Header</h3>
      <textarea rows={10} cols={100} value={headerPrettyJson}/>

      <h3>Payload</h3>
      <textarea rows={20} cols={100} value={props.payload} onChange={onChangePayload} />
    </>
  )
}

export default JwsSignHeaderInput
