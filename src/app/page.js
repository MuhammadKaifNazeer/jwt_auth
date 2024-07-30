"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  router.push("/login");

  return (
    <>
      <Loader />
    </>
  );
}

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <div className="loader"></div>
    </div>
  );
};

const styles = `
  .loader {
    display: inline-block;
    border: 5px solid rgba(255, 255, 255, 0.6);
    border-top-color: rgba(255, 255, 255, 1);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

const injectStyles = () => {
  if (typeof document !== "undefined") {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
  }
};

injectStyles();
