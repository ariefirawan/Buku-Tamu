import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./App.css";
import logo from "./assets/logo.png";

import FormInput from "./components/FormInput";
import SignaturePad from "./components/SignaturePad";
import inputs from "./components/dataInputs";

const App = () => {

  const [sign, setSign] = useState()

  const api = 'https://script.google.com/macros/s/AKfycbyIK8MGL9qg6zBM6P7COxEHdb7IF6NrA2t5GlpbpfqUv7K35n8vZ5HaIIJh0qSmJ0veaw/exec'

  const [values, setValues] = useState({
    nama: "",
    instansi: "",
    tujuan: "Tata Usaha",
    keperluan: "",
    nohp: "",
    ttd: "",
  });

  const notify = () => toast.success("Data Berhasil Disimpan", {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(api, {
      method: 'POST',
      body: JSON.stringify({ ...values, ttd: sign.getTrimmedCanvas().toDataURL('image/png') })
    }).then((res) => res.json())
      .then((a) => {
        console.log(a); //See response
      })
      .catch((e) => console.log(e)); // Or Error in console

    notify()
    setValues({
      nama: "",
      instansi: "",
      tujuan: "Tata Usaha",
      keperluan: "",
      nohp: "",
      ttd: "",
    })
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [selectedOption, setSelectedOption] = useState("Tata Usaha");

  const handleOptionSelect = (event) => {
    const selectedValue = event.target.value;
    const selectedOption = inputs[2].items.find(option => option.value === selectedValue);
    setSelectedOption(selectedValue);
    setValues({ ...values, tujuan: selectedOption.value })

  };

  const handleClear = () => {
    sign.clear()
    setSign('')
  }

  return (
    <div className="app">
      <ToastContainer theme="colored" position="top-center" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <form onSubmit={handleSubmit}>
        <div className="header">
          <img src={logo} alt="logo" className="logo" />
          <h1>Buku Tamu</h1>
        </div>
        <FormInput
          key={inputs[0].id}
          {...inputs[0]}
          value={values[inputs[0].name]}
          onChange={onChange}
        />
        <FormInput
          key={inputs[1].id}
          {...inputs[1]}
          value={values[inputs[1].name]}
          onChange={onChange}
        />
        <div>
          <label>Tujuan</label>
          <select value={selectedOption.value} onChange={handleOptionSelect} className="formInputSelect">
            {inputs[2].items.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {/* <Dropdown options={inputs[2].items} onSelect={handleOptionSelect} setValues={setValues} /> */}
        <FormInput
          key={inputs[3].id}
          {...inputs[3]}
          value={values[inputs[3].name]}
          onChange={onChange}
        />
        <FormInput
          key={inputs[4].id}
          {...inputs[4]}
          value={values[inputs[4].name]}
          onChange={onChange}
        />
        <div>
          <SignaturePad setSign={setSign} />
          <label className="clearBtn" onClick={handleClear}>Clear</label>

        </div>
        <br />
        <button>Simpan</button>
      </form>
    </div>
  );
};

export default App;