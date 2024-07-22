const inputs = [
    {
      id: 1,
      name: "nama",
      type: "text",
      placeholder: "Nama Lengkap",
      errorMessage:
        "Nama Lengkap Harus Lebih dari 3 Karakter",
      label: "Nama Lengkap",
      pattern: "^[a-zA-Z0-9 ]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "instansi",
      type: "text",
      placeholder: "Instansi/Organisasi/Masyarakat",
      errorMessage:
        "Isi Setidaknya 3 Karakter",
      label: "Instansi/Organisasi/Masyarakat",
      pattern: "^[a-zA-Z0-9 ]{3,16}$",
      required: true,
    },
    {
      id: 3,
      name: "tujuan",
      type: "combobox",
      placeholder: "Tujuan",
      items: [
        { label: 'Tata Usaha', value: 'Tata Usaha' },
        { label: 'Pendidikan Islam', value: 'Pendidikan Islam' },
        { label: 'Bimas Islam', value: 'Bimas Islam' },
        { label: 'Penyelengara Haji dan Umrah', value: 'Penyelenggara Haji dan Umrah' },
        { label: 'Bimas Buddha', value: 'Bimas Buddha' },
        { label: 'Penyelenggara Katolik', value: 'Penyelenggara Katolik' },

      ],
      errorMessage:
        "Pilih Tujuan",
      label: "Tujuan",
      required: true,
    },
    {
      id: 4,
      name: "keperluan",
      type: "text",
      placeholder: "Keperluan - Maksud Tujuan",
      errorMessage:
        "Isi Setidaknya 3 Karakter",
      label: "Keperluan - Maksud Tujuan",
      pattern: "^[a-zA-Z0-9 ]{3,16}$",
      required: true,
    },
    {
      id: 5,
      name: "nohp",
      type: "number",
      placeholder: "No HP",
      errorMessage: "No HP tidak valid!",
      label: "No HP",
      required: true,
    },
  ];

  export default inputs
