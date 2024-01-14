import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";

interface ShowModalProps {
  isOpen: boolean;
  closeModal: () => void;
  idBarang: number;
}

interface Barang {
  id: number;
  attributes: {
    NamaBarang: string;
    JenisBarang: string;
    StokBarang: number;
    HargaBarang: number;
    Supplayer: string;
  };
}

const customModal = {
  content: {
    width: "50%",
    height: "60%",
    margin: "5% auto auto",
    borderRadius: "2rem",
  },
};

const EditBarangModal: React.FC<ShowModalProps> = ({
  isOpen,
  closeModal,
  idBarang,
}) => {
  const [formData, setFormData] = useState({
    NamaBarang: "",
    JenisBarang: "",
    StokBarang: 0,
    HargaBarang: 0,
    Supplayer: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1337/api/barangs/${idBarang}`
        );
        const dataBarang = response.data.data as Barang;
        setFormData({
          NamaBarang: dataBarang.attributes.NamaBarang,
          JenisBarang: dataBarang.attributes.JenisBarang,
          StokBarang: dataBarang.attributes.StokBarang,
          HargaBarang: dataBarang.attributes.HargaBarang,
          Supplayer: dataBarang.attributes.Supplayer,
        });
      } catch (error) {
        console.error("Error fetching Barang:", error);
      }
    };

    if (isOpen) {
      fetchData();
    }
  }, [isOpen, idBarang]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:1337/api/barangs/${idBarang}`, {
        data: formData,
      });
      closeModal();
    } catch (error) {
      console.error("Error updating Barang:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Edit Barang"
      style={customModal}
    >
      <div>
        <h2 className="text-3xl text-teal-500 py-2">Edit Mahasiswa</h2>
        <form onSubmit={handleSubmit}>
          <label className="text-xl text-teal-500 py-2">
            Nama Barang:
            <input
              type="text"
              name="NamaBarang"
              value={formData.NamaBarang}
              onChange={handleChange}
              className="border-2 border-teal-500"
            />
          </label>
          <br />
          <label className="text-xl text-teal-500 py-2">
            Jenis Barang:
            <input
              type="text"
              name="JenisBarang"
              value={formData.JenisBarang}
              onChange={handleChange}
              className="border-2 border-teal-500"
            />
          </label>
          <br />
          <label className="text-xl text-teal-500 py-2">
            Stok Barang:
            <input
              type="number"
              name="StokBarang"
              value={formData.StokBarang}
              onChange={handleChange}
              className="border-2 border-teal-500"
            />
          </label>
          <br />
          <label className="text-xl text-teal-500 py-2">
            Harga Barang:
            <input
              type="number"
              name="HargaBarang"
              value={formData.HargaBarang}
              onChange={handleChange}
              className="border-2 border-teal-500"
            />
          </label>
          <br />
          <label className="text-xl text-teal-500 py-2">
            Supplayer:
            <input
              type="text"
              name="Supplayer"
              value={formData.Supplayer}
              onChange={handleChange}
              className="border-2 border-teal-500"
            />
          </label>
          <br />
          <button
            onClick={closeModal}
            className="btn btn-red text-xl text-teal-500 py-2"
          >
            Tutup
          </button>
          <button
            type="submit"
            className="btn btn-blue text-xl text-teal-500 py-2"
          >
            Simpan
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default EditBarangModal;
