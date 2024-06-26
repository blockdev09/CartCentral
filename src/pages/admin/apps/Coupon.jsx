import React, { useEffect, useState } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const numbers = "1234567890";
const symbols = "!@#$%^&*()_+";
const Coupon = () => {
  const [size, setSize] = useState(8);
  const [prefix, setPrefix] = useState("");
  const [includeNumbers, setInlcudeNumbers] = useState(false);
  const [includeCharacters, setIncludeCharacters] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [coupon, setCoupon] = useState("");
  const copy = (coupon) => {
    window.navigator.clipboard.writeText(coupon);
    setIsCopied(true);
  };
  const handlesubmit = (e) => {
    e.preventDefault();
    if (!includeNumbers && !includeCharacters && !includeSymbols) {
      return alert("Please Select one atleast");
    }
    let result = prefix || "";
    const looplength = size - result.length;
    for (let i = 0; i < looplength; i++) {
      let fullstring = "";
      if (includeCharacters) {
        fullstring += letters;
      }
      if (includeNumbers) {
        fullstring += numbers;
      }
      if (includeSymbols) {
        fullstring += symbols;
      }
      const randomnumber = ~~(Math.random() * fullstring.length);
      result += fullstring[randomnumber];
    }
    setCoupon(result);
  };
  useEffect(() => {
    setIsCopied(false);
  }, [coupon]);
  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main className="dashboard-app-container ">
        <h1>Coupon</h1>
        <section>
          <form className="couponform" onSubmit={handlesubmit}>
            <input
              type="text"
              placeholder="Text to include"
              onChange={(e) => setPrefix(e.target.value)}
              value={prefix}
            />
            <input
              type="number"
              placeholder="Coupon Length"
              onChange={(e) => Number(setSize(e.target.value))}
              value={size}
              min={8}
              max={25}
            />
            <fieldset>
              <legend>
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={() => setInlcudeNumbers((i) => !i)}
                />
                <span>Numbers</span>
                <input
                  type="checkbox"
                  checked={includeCharacters}
                  onChange={() => setIncludeCharacters((i) => !i)}
                />
                <span>Characters</span>
                <input
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={() => setIncludeSymbols((i) => !i)}
                />
                <span>Symbols</span>
              </legend>
            </fieldset>
            <button type="submit">Generate</button>
          </form>
          {coupon && (
            <code>
              {coupon}
              <span onClick={() => copy(coupon)}>
                {isCopied ? "Copied" : "Copy"}
              </span>
            </code>
          )}
        </section>
      </main>
    </div>
  );
};

export default Coupon;
