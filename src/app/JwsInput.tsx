import { ChangeEventHandler } from "react"

type Props = {
  header: string,
  payload: string,
  onChangeHeader: (h: string) => void,
  onChangePayload: (p: string) => void,
}

function JwsInput(props: Props) {
  const { header, payload } = props

  const onChangeHeader: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    props.onChangeHeader(e.target.value)
  }

  const onChangePayload: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    props.onChangePayload(e.target.value)
  }

  return (
    <>
      <h2>JWS Mode</h2>

      <h3>Header</h3>
      <textarea rows={10} cols={100} value={header} onChange={onChangeHeader} />

      <h3>Payload</h3>
      <textarea rows={20} cols={100} value={payload} onChange={onChangePayload} />
    </>
  )
}

export default JwsInput
