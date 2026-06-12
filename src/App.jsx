import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import logo from "./assets/logo.png";

import FormInput from "./components/FormInput";
import SignaturePad from "./components/SignaturePad";
import inputs from "./components/dataInputs";

const keperluanOptions = {
  "Tata Usaha": [
    "Layanan Rekomendasi Ketenagaan Asing (KITAS, KITAB, RPTKA, IMTA)",
    "Layanan Rohaniawan Pengukun Sumpah",
    "Layanan Rekomendasi Izin Penelitian",
    "Layanan Rekomendasi Rumah Ibadat",
  ],
  "Bimas Kristen": [
    "Pelayanan Pembinaan Sekolah Minggu (JK dan SO)",
    "Pelayanan Pembinaan Dewasa Muda (Kuliah dan Bekerja)",
    "Pelayanan Bimbingan Pranikah",
    "Pelayanan Pembinaan Keluarga",
    "Pelayanan Pembinaan Kaum Ibu",
    "Pelayanan Konseling",
  ],
  "Penyelenggara Katolik": [
    "Pelayanan Pembinaan Sekolah Minggu (JK dan SO)",
    "Pelayanan Pembinaan Dewasa Muda (Kuliah dan Bekerja)",
    "Pelayanan Bimbingan Pranikah",
    "Pelayanan Pembinaan Keluarga",
    "Pelayanan Pembinaan Kaum Ibu",
    "Pelayanan Konseling",
  ],
  "Bimas Buddha": [
    "Pelayanan Pembinaan Sekolah Minggu (JK dan SO)",
    "Pelayanan Pembinaan Dewasa Muda (Kuliah dan Bekerja)",
    "Pelayanan Bimbingan Pranikah",
    "Pelayanan Pembinaan Keluarga",
    "Pelayanan Pembinaan Kaum Ibu",
    "Pelayanan Konseling",
  ],
  "Pendidikan Islam": [
    "Pelayanan Pendidikan Diniyah non formal",
    "Pelayanan Bantuan Pengembangan Kelembagaan Diniyah Non Formal (TPQ, PONPES, MDT)",
    "Pelayanan EMIS, SIMBA, SIKAP, IZOP",
    "Layanan BOP RA/BOS Madrasah",
    "Layanan Izin Pendirian Madrasah",
    "Layanan Emis Madrasah",
    "Layanan SIM SARPRAS",
    "Layanan SIPMA",
    "Layanan EDM dan ERKAM",
    "Layanan Pindah Rayon",
    "Layanan SIMPATIKA",
    "Layanan SIAGA",
  ],
  "Bimas Islam": [
    "Layanan Pembuatan ID Masjid",
    "Layanan Permohonan Blanko",
    "Layanan Kalibrasi Arah Kiblat",
    "Layanan Konsultasi Bimbingan Pra Nikah",
    "Layanan Permintaan Rohaniawan",
    "Layanan Konsultasi Zakat",
    "Layanan Sertifikat Tanah Wakaf",
    "Layanan Rekap data Hewan Qurban",
    "Layanan Jadwal Imsakiyah",
  ],
};

const App = () => {
  const [sign, setSign] = useState();

  const api = import.meta.env.VITE_API;

  const [values, setValues] = useState({
    nama: "",
    instansi: "",
    tujuan: "Tata Usaha",
    keperluan: "",
    nohp: "",
    ttd: "",
  });

  const [useCustomKeperluan, setUseCustomKeperluan] = useState(false);

  const notify = () =>
    toast.success("Data Berhasil Disimpan", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(api, {
      method: "POST",
      body: JSON.stringify({ ...values, ttd: sign.getTrimmedCanvas().toDataURL("image/png") }),
    })
      .then((res) => res.json())
      .then((a) => {
        console.log(a); //See response
      })
      .catch((e) => console.log(e)); // Or Error in console

    notify();
    setValues({
      nama: "",
      instansi: "",
      tujuan: "Tata Usaha",
      keperluan: "",
      nohp: "",
      ttd: "",
    });
    setUseCustomKeperluan(false);
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [selectedOption, setSelectedOption] = useState("Tata Usaha");

  const handleOptionSelect = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    setValues({ ...values, tujuan: selectedValue, keperluan: "" });
    setUseCustomKeperluan(false);
  };

  const handleKeperluanChange = (e) => {
    if (e.target.value === "custom") {
      setUseCustomKeperluan(true);
      setValues({ ...values, keperluan: "" });
    } else {
      setUseCustomKeperluan(false);
      setValues({ ...values, keperluan: e.target.value });
    }
  };

  const handleCustomKeperluanChange = (e) => {
    setValues({ ...values, keperluan: e.target.value });
  };

  const handleClear = () => {
    sign.clear();
    setSign("");
  };

  return (
    <div className="app">
      <ToastContainer
        theme="colored"
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
          <select
            value={selectedOption}
            onChange={handleOptionSelect}
            className="formInputSelect"
          >
            {inputs[2].items.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Keperluan - Maksud Tujuan</label>
          {!useCustomKeperluan ? (
            <select
              value={values.keperluan}
              onChange={handleKeperluanChange}
              className="formInputSelect"
            >
              <option value="">Pilih Keperluan</option>
              {keperluanOptions[selectedOption]?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
              <option value="custom">Lainnya (Isi Sendiri)</option>
            </select>
          ) : (
            <div className="formInput">
              <input
                type="text"
                name="keperluan"
                placeholder="Isi keperluan Anda..."
                value={values.keperluan}
                onChange={handleCustomKeperluanChange}
              />
            </div>
          )}
        </div>
        <FormInput
          key={inputs[4].id}
          {...inputs[4]}
          value={values[inputs[4].name]}
          onChange={onChange}
        />
        <div>
          <SignaturePad setSign={setSign} />
          <label className="clearBtn" onClick={handleClear}>
            Clear
          </label>
        </div>
        <br />
        <button>Simpan</button>
      </form>
    </div>
  );
};

export default App;
