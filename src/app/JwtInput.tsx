import { v4 as uuidv4 } from "uuid";
import {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";

type Props = {
  kid: string;
  clientId: string;
  onChangeHeader: (h: string) => void;
  onChangePayload: (p: string) => void;
};

function epochNow() {
  return Math.floor(new Date().getTime() / 1000);
}

function JwtInput(props: Props) {
  const [aud, setAud] = useState(
    "https://aasuperapp-test.xglstg00.ppc.bigpayme.com",
  );
  const [jti, setJti] = useState(uuidv4());
  const [iat, setIat] = useState(epochNow());
  const exp = iat + 3600;

  const header = {
    alg: "PS256",
    kid: props.kid,
    typ: "JWT",
  };

  const payload = {
    iss: props.clientId,
    sub: props.clientId,
    aud,
    jti,
    iat,
    exp,
  };

  const headerJson = JSON.stringify(header);

  const payloadPrettyJson = JSON.stringify(payload, undefined, 4);
  const headerPrettyJson = JSON.stringify(header, undefined, 4);

  const generate = () => {
    setJti(uuidv4());
    setIat(epochNow());
  };

  useEffect(() => {
    props.onChangeHeader(headerJson);
    props.onChangePayload(payloadPrettyJson);
  }, [headerJson, payloadPrettyJson]);

  const onClickRefreshButton: MouseEventHandler<HTMLButtonElement> = (_e) => {
    generate();
  };

  const onChangeAud: ChangeEventHandler<HTMLInputElement> = (e) => {
    setAud(e.target.value);
  };

  return (
    <>
      <h2>Mode: JWT</h2>

      <div style={{ width: 200 }}>
        <button onClick={onClickRefreshButton}>Refresh</button>
      </div>

      <h3>aud:</h3>
      <input
        style={{ width: 400 }}
        type="text"
        value={aud}
        onChange={onChangeAud}
      />

      <h3>Header</h3>
      <textarea rows={10} cols={100} value={headerPrettyJson} />

      <h3>Payload</h3>
      <textarea rows={20} cols={100} value={payloadPrettyJson} />
    </>
  );
}

export default JwtInput;
