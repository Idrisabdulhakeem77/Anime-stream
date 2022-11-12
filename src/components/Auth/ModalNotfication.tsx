import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

interface ModalNotificationProps {
  type: "success" | "error";
  setError?: any;
  message: string;
}

const TIMEOUT_AUTO_CLOSE_ERROR = 5;
const TIMEOUT_AUTO_CLOSE_SUCCESS = 20;

const ModalNotification: FunctionComponent<ModalNotificationProps> = ({
  type,
  message,
  setError,
}) => {
  const [timeLeft, setTimeLeft] = useState(
    type === "success" ? TIMEOUT_AUTO_CLOSE_SUCCESS : TIMEOUT_AUTO_CLOSE_ERROR
  );
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const isCloseModalAutomatically = timeLeft === 0;

  useEffect(() => {
    if (isCloseModalAutomatically) {
      navigate(searchParams.get("redirect") || "/");
    } else {
      console.log("Error");
    }
    //eslint-disable-next-line
  }, [isCloseModalAutomatically]);

  useEffect(() => {
    const timeout = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timeout);
  }, []);

  const checkSuccess = () => {
    if (type === "success") {
      navigate(`${searchParams.get("redirect") || "/"}`);
    } else {
      setError("");
    }
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `${ type === "success" ? "url(/Images/success.jpg)" : "url(/Images/fail.jpg)"}`
        }}
        className="bg-cover bg-no-repeat bg-center min-h-[450px] w-full max-w-[350px] fixed rounded-xl z-20 tw-absolute-center bg-b"
      >
        <div className="mt-[230px] font-bold text-black text-[40px] text-center">
          {type === "success" ? "Successfully Logged in! 🤓" : "oooppss 😑"}
        </div>
        <p>
          {message}
          <br />
          {type === "success" ? (
            <span>Yay lets goooo!!👊</span>
          ) : (
            <span> Stay put and try again ✊ </span>
          )}
        </p>
        <button onClick={checkSuccess}>
          <p> {type === "success" ? "CONTINUE" : "TRY AGAIN"}</p>
          <p> {timeLeft}</p>
        </button>
      </div>
      <div
        // onClick={setError("")}
        className="fixed h-full w-full top-0 left-0 z-13 bg-black"
      ></div>
    </>
  );
};

export default ModalNotification;
